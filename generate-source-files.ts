import dedent from 'dedent';
import fse from 'fs-extra';

for (let i = 1; i <= 100; i++) {
    const packageFolder = `packages/package-${i}`;
    // fse.removeSync(packageFolder);

    // package.json
    fse.outputFileSync(
        `${packageFolder}/package.json`,
        dedent`
            {
                "name": "package-${i}"
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
                tsconfig = ":tsconfig",
                srcs = glob(["src/**/*.ts"]),
                source_map = True,
                declaration = True,
                root_dir = "src",
                out_dir = "dist",
                # supports_workers = True
                validate = False
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

    // Output a source file with a change
    fse.outputFileSync(
        `${packageFolder}/src/index.ts`,
        dedent`
            import { doThing0 } from './functions';
            //${i === 1 ? '' : `export * from '@nx-test/lib-with-dep-${i - 1}';`}

            console.log('update #${Date.now()}');
            console.log(doThing0);

            export function myFn${i}() {
                console.log('myFn${i}');
            }
        `
    );

    // Output a source file with long file contents
//     let fileContents = '';
//     for (let j = 0; j < 100000; j++) {
//         fileContents += `\
// export function doThing${j}() {
//     console.log('Hi ${i} ${j}');
// }
// `;
//     }
//     fse.outputFileSync(`${packageFolder}/src/functions.ts`, fileContents);
}
