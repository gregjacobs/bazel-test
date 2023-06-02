import dedent from 'dedent';
import fse from 'fs-extra';

// First clear packages dir
fse.removeSync('packages');

const packagesDirsCreated: string[] = [];

// Generate 10 "root" packages
for (let packageNum = 1; packageNum <= 10; packageNum++) {
    const packageName = `package-${packageNum}`;
    const packageFolder = `packages/${packageName}`;

    // BUILD, package.json, tsconfig.json
    // const extraDeps = (packageNum === 1) ? '' : `deps = ['//packages/package-with-dep-${packageNum - 1}:library']`
    generateSupportFiles({ packageName });

    // Output a source file with a change
    fse.outputFileSync(`${packageFolder}/src/index.ts`, dedent`
        import { doThing0 } from './functions';

        console.log('update #${Date.now()}');
        console.log(doThing0);

        export function myFn${packageNum}() {
            console.log('myFn${packageNum}');
        }
    `);

    // Output a source file with long file contents
    fse.outputFileSync(`${packageFolder}/src/functions.ts`, generateLongSourceFile(packageNum));

    packagesDirsCreated.push(packageFolder);
}

// Create 90 packages, every 10 relies on 2 packages from the previous 10
for (let packageLevel = 1; packageLevel < 10; packageLevel++) {
    for (let packageInLevel = 1; packageInLevel <= 10; packageInLevel++) {
        const packageNum = packageLevel * 10 + packageInLevel;
        const packageName = `package-${packageNum}`;
        const packageFolder = `packages/${packageName}`;

        const previousLevelStartPackage = (packageLevel - 1) * 10;
        const firstPartyDeps = [
            `package-${previousLevelStartPackage + 1}`,
            `package-${previousLevelStartPackage + 2}`,
        ];
        generateSupportFiles({ packageName, firstPartyDeps });

        // Output a source file with a change
        fse.outputFileSync(`${packageFolder}/src/index.ts`, dedent`
            import { doThing0 } from './functions';

            console.log('update #${Date.now()}');
            console.log(doThing0);

            export function myFn${packageNum}() {
                console.log('myFn${packageNum}');
            }
        `);

        // Output a source file with long file contents
        fse.outputFileSync(`${packageFolder}/src/functions.ts`, generateLongSourceFile(packageNum));

        packagesDirsCreated.push(packageFolder);
    }
}

// Write .bazelignore
fse.outputFileSync('.bazelignore', `
.git
.vscode
node_modules
${packagesDirsCreated.join(`/node_modules\n`)}/node_modules
`);

// Write pnpm-workspace.yaml
fse.outputFileSync('pnpm-workspace.yaml', `
packages:
  - ${packagesDirsCreated.join(`\n  - `)}
`, 'utf8');



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
//     fse.outputFileSync(`${packageFolder}/src/functions.ts`, generateLongSourceFile(i));
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
//     fse.outputFileSync(`${packageFolder}/src/functions.ts`, generateLongSourceFile(i));
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

/**
 * Generates package.json, BUILD, and tsconfig.json files
 */
function generateSupportFiles({ 
    packageName, 
    firstPartyDeps = [],
}: {
    packageName: string, 
    firstPartyDeps?: string[],  // ex: 'package-1', 'package-2', etc.
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
                "typings": "dist/index.d.ts"${firstPartyDeps.length > 0 ? `,` : ''}
                ${firstPartyDeps.length > 0 ? `
                "dependencies": {
                    ${firstPartyDeps.map((dep, i) => `"${dep}": "workspace:*"${i < firstPartyDeps.length - 1 ? ',' : ''}`).join('\n                    ')}
                }` : ''}
            }
        `
    );

    // BUILD file
    fse.outputFileSync(
        `${packageFolder}/BUILD`,
        dedent`
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
                # supports_workers = True
                validate = False,
                ${firstPartyDeps.length > 0 ? `deps = ['${firstPartyDeps.map(dep => `:node_modules/${dep}`).join(`', '`)}'],` : ''}
            )
            
            ts_config(
                name = "tsconfig",
                src = "tsconfig.json",
                deps = [
                    "//:tsconfig"
                ]
            )
        `
    );

    // tsconfig.json
    fse.outputFileSync(
        `${packageFolder}/tsconfig.json`,
        dedent`
            {
                "extends": "../../tsconfig.json",
                "include": ["src/**/*.ts"]
            }
        `
    );
}

/**
 * Generates the contents of a long TypeScript source file
 */
function generateLongSourceFile(packageNum: number) {
    let fileContents = '';
    for (let j = 0; j < 20000; j++) {
        fileContents += `\
export function doThing${j}() {
    console.log('Hi ${packageNum} ${j}');
}
`;
    }
    return fileContents;
}