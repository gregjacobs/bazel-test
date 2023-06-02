import dedent from 'dedent';
import fse from 'fs-extra';
import { range } from 'lodash';

// First clear packages dir
fse.removeSync('packages');

const packagesDirsCreated: string[] = [];

// Generate 10 "root" packages
for (let packageNum = 0; packageNum < 10; packageNum++) {
    const packageName = `package-${packageNum}`;
    const packageFolder = `packages/${packageName}`;

    // BUILD, package.json, tsconfig.json
    // const extraDeps = (packageNum === 1) ? '' : `deps = ['//packages/package-with-dep-${packageNum - 1}:library']`
    generateSupportFiles({ packageName });

    // Output source and spec files
    generateSourceFiles({ packageFolder, packageNum });
    
    packagesDirsCreated.push(packageFolder);
}

// Create 90 packages, every 10 relies on 2 packages from the previous 10
for (let packageLevel = 1; packageLevel < 10; packageLevel++) {
    for (let packageInLevel = 0; packageInLevel < 10; packageInLevel++) {
        const packageNum = packageLevel * 10 + packageInLevel;
        const packageName = `package-${packageNum}`;
        const packageFolder = `packages/${packageName}`;

        // Make the package rely on the 10 packages in the previous "level" of
        // 10 packages.
        // Ex: package 32 relies on packages 20-29, as does package 39
        const deps: string[] = [];
        const previousLevelStartPackage = (packageLevel - 1) * 10;
        for (let innerPackageNum = 0; innerPackageNum < 10; innerPackageNum++) {
            deps.push(`package-${previousLevelStartPackage + innerPackageNum}`);
        }
        generateSupportFiles({ packageName, deps });

        // Output source and spec files
        generateSourceFiles({ packageFolder, packageNum, deps });

        packagesDirsCreated.push(packageFolder);
    }
}

// Write .bazelignore
fse.outputFileSync('.bazelignore', dedent`
    .git
    .vscode
    node_modules
    ${packagesDirsCreated.map(dir => `${dir}/node_modules`).join('\n    ')}
`);

// Write pnpm-workspace.yaml
fse.outputFileSync('pnpm-workspace.yaml', dedent`
    packages:
      ${packagesDirsCreated.map(dir => `- ${dir}`).join(`\n      `)}
`, 'utf8');

// ----------------------------------------

function generateSourceFiles({ 
    packageFolder,
    packageNum,
    deps = [],
}: {
    packageFolder: string;
    packageNum: number;
    deps?: string[];
}) {
    const numSourceFiles = 100;
    for (let i = 0; i < numSourceFiles; i++) {
        fse.outputFileSync(`${packageFolder}/src/function${i}.ts`, generateFunctionSourceFileContents(packageNum, i));
    }

    fse.outputFileSync(`${packageFolder}/src/index.ts`, generateIndexSourceFileContents({ packageNum, numSourceFiles, deps }));
    fse.outputFileSync(`${packageFolder}/src/index.spec.ts`, generateSpecFileContents({ packageNum }));
}

/**
 * Generates the contents of a TypeScript source file
 */
function generateFunctionSourceFileContents(packageNum: number, fileNum: number) {
    return dedent`
        export function doThing${fileNum}() {
            console.log('Hi ${packageNum} ${fileNum}');
        }
    `;
}

function generateIndexSourceFileContents({
    packageNum,
    numSourceFiles,
    deps = [],
}: {
    packageNum: number;
    numSourceFiles: number;
    deps: string[];
}): string {
    return dedent`
        // Imports
        ${range(numSourceFiles).map((_, i) => `import { doThing${i} } from './function${i}';`).join('\n        ')}

        // Exports
        ${deps.map(dep => `export * from '${dep}';`).join('\n        ')}

        console.log(doThing0);

        export function myFn${packageNum}() {
            return 'myFn${packageNum}';
        }
    `;
}

function generateSpecFileContents({
    packageNum,
}: {
    packageNum: number;
}): string {
    return dedent`
        import { myFn${packageNum} } from './index';

        describe('test', () => {
            it('should return the correct value', () => {
                expect(myFn${packageNum}()).toBe('myFn${packageNum}');
            });
        });
    `
}

/**
 * Generates package.json, BUILD, and tsconfig.json files
 */
function generateSupportFiles({ 
    packageName, 
    deps = [],
}: {
    packageName: string, 
    deps?: string[],  // ex: 'package-1', 'package-2', etc.
}) {
    const packageFolder = `packages/${packageName}`;

    // package.json
    fse.outputFileSync(
        `${packageFolder}/package.json`,
        dedent`
            {
                "name": "${packageName}",
                "version": "0.0.0",
                "main": "dist/index.js",
                "typings": "dist/index.d.ts"${deps.length > 0 ? `,` : ''}
                ${deps.length > 0 ? `
                "dependencies": {
                    ${deps.map((dep, i) => `"${dep}": "workspace:*"${i < deps.length - 1 ? ',' : ''}`).join('\n                    ')}
                }` : ''}
            }
        `
    );

    // BUILD file
    fse.outputFileSync(
        `${packageFolder}/BUILD`,
        dedent`
            load("@aspect_rules_jasmine//jasmine:defs.bzl", "jasmine_test")
            load("@aspect_rules_js//js:defs.bzl", "js_library")
            load("@aspect_rules_js//npm:defs.bzl", "npm_package")
            load("@aspect_rules_ts//ts:defs.bzl", "ts_config", "ts_project")
            load("@npm//:defs.bzl", "npm_link_all_packages")
            
            npm_link_all_packages()
            
            npm_package(
                name = "${packageName}",
                srcs = [":lib"],
                out = "pkg",
                include_runfiles = False,
                package = "${packageName}",
                visibility = ["//visibility:public"],
            )
            
            js_library(
                name = "lib",
                srcs = [
                    "package.json",
                    ":library"
                ],
            )
            
            ts_project(
                name = "library",
                visibility = ['//visibility:public'],
                tsconfig = ":tsconfig",
                srcs = glob(["src/**/*.ts"]),
                source_map = True,
                declaration = True,
                root_dir = "src",
                out_dir = "dist",
                supports_workers = False,
                validate = False,
                deps = [
                    "//:node_modules/@types/jasmine",
                    "//:node_modules/@types/node",
                    ${deps.map(dep => `':node_modules/${dep}',`).join(`\n                    `)}
                ],
            )
            
            ts_config(
                name = "tsconfig",
                src = "tsconfig.json",
                deps = [
                    "//:tsconfig"
                ]
            )

            jasmine_test(
                name = "test",
                node_modules = "//:node_modules",
                data = [
                    ":library",
                ],
                args = ["./**/*.spec.js"],
            )
        `
    );

    // tsconfig.json
    fse.outputFileSync(
        `${packageFolder}/tsconfig.json`,
        dedent`
            {
                "extends": "../../tsconfig.json",
                "compilerOptions": {
                    "types": ["node", "jasmine"]
                },
                "include": ["src/**/*.ts"]
            }
        `
    );
}

// // Generate 10 packages that run sequentially (each relies on the previous)
// for (let i = 1; i <= 10; i++) {
//     const packageName = `package-with-dep-${i}`;
//     const packageFolder = `packages/${packageName}`;

//     // BUILD, package.json, tsconfig.json
//     generateSupportFiles(packageName);

//     // Output a source file with a change
//     fse.outputFileSync(`${packageFolder}/src/index.ts`, dedent`
//         import { doThing0 } from './functions';
//         ${i === 1 
//             ? '' 
//             : `export * from 'package-with-dep-${i - 1}';`
//         }

//         console.log('update #${Date.now()}');
//         console.log(doThing0);

//         export function myFn${i}() {
//             console.log('myFn${i}');
//         }
//     `);

//     // Output a source file with long file contents
//     fse.outputFileSync(`${packageFolder}/src/functions.ts`, generateFunctionSourceFileContents(i));
// }


// // Generate 100 packages that run in parallel
// for (let i = 1; i <= 100; i++) {
//     const packageName = `package-${i}`;
//     const packageFolder = `packages/${packageName}`;
//     // fse.removeSync(packageFolder);

//     // BUILD, package.json, tsconfig.json
//     generateSupportFiles(packageName);

//     // Output a source file with a change
//     fse.outputFileSync(
//         `${packageFolder}/src/index.ts`,
//         dedent`
//             import { doThing0 } from './functions';

//             console.log('update #${Date.now()}');
//             console.log(doThing0);

//             export function myFn${i}() {
//                 console.log('myFn${i}');
//             }
//         `
//     );

//     // Output a source file with long file contents
//     fse.outputFileSync(`${packageFolder}/src/functions.ts`, generateFunctionSourceFileContents(i));
// }

// // Generate a package that consumes all 100 parallel packages
// {
//     const packageName = `package-that-consumes-100`;
//     const packageFolder = `packages/${packageName}`;

//     // BUILD, package.json, tsconfig.json
//     const deps: string[] = [];
//     for (let i = 1; i <= 100; i++) {
//         deps.push(`//packages/package-${i}:library`);
//     }
//     const extraDeps = `deps = ['${deps.join(`', '`)}']`;
//     generateSupportFiles(packageName, extraDeps);

//     // Output a source file with a change
//     fse.outputFileSync(`${packageFolder}/src/index.ts`, dedent`
//         import { myFn100 } from 'package-100';

//         console.log('update #${Date.now()}');
//         console.log(myFn100);
//     `);
// }