import dedent from 'dedent';
import fse from 'fs-extra';

// Generate 10 packages that run sequentially (each relies on the previous)
for (let i = 1; i <= 10; i++) {
    const packageName = `package-with-dep-${i}`;
    const packageFolder = `packages/${packageName}`;

    // BUILD, package.json, tsconfig.json
    const extraDeps = (i === 1) ? '' : `deps = ['//packages/package-with-dep-${i - 1}:library']`
    generateSupportFiles(packageName, extraDeps);

    // Output a source file with a change
    fse.outputFileSync(`${packageFolder}/src/index.ts`, dedent`
        import { doThing0 } from './functions';
        ${i === 1 
            ? '' 
            : `export * from 'package-with-dep-${i - 1}';`
        }

        console.log('update #${Date.now()}');
        console.log(doThing0);

        export function myFn${i}() {
            console.log('myFn${i}');
        }
    `);

    // Output a source file with long file contents
    fse.outputFileSync(`${packageFolder}/src/functions.ts`, generateLongSourceFile(i));
}


// Generate 100 packages that run in parallel
for (let i = 1; i <= 100; i++) {
    const packageName = `package-${i}`;
    const packageFolder = `packages/${packageName}`;
    // fse.removeSync(packageFolder);

    // BUILD, package.json, tsconfig.json
    generateSupportFiles(packageName);

    // Output a source file with a change
    fse.outputFileSync(
        `${packageFolder}/src/index.ts`,
        dedent`
            import { doThing0 } from './functions';

            console.log('update #${Date.now()}');
            console.log(doThing0);

            export function myFn${i}() {
                console.log('myFn${i}');
            }
        `
    );

    // Output a source file with long file contents
    fse.outputFileSync(`${packageFolder}/src/functions.ts`, generateLongSourceFile(i));
}


function generateSupportFiles(packageName: string, tsProjectDeps: string = '') {
    const packageFolder = `packages/${packageName}`;

    // package.json
    fse.outputFileSync(
        `${packageFolder}/package.json`,
        dedent`
            {
                "name": "${packageName}",
                "main": "dist/index.js",
                "typings": "dist/index.d.ts"
            }
        `
    );

    // BUILD file
    fse.outputFileSync(
        `${packageFolder}/BUILD`,
        dedent`
            load("@npm//@bazel/typescript:index.bzl", "ts_config", "ts_project")

            ts_project(
                name = "library",
                visibility = ['//visibility:public'],
                tsconfig = ":tsconfig",
                srcs = glob(["src/**/*.ts"]),
                source_map = True,
                declaration = True,
                root_dir = "src",
                # out_dir = "dist",
                # supports_workers = True
                validate = False,
                ${tsProjectDeps}
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

function generateLongSourceFile(packageNum: number) {
    let fileContents = '';
    for (let j = 0; j < 100000; j++) {
        fileContents += `\
export function doThing${j}() {
    console.log('Hi ${packageNum} ${j}');
}
`;
    }
    return fileContents;
}