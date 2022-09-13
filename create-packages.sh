for i in 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20; do
    rm -rf package-${i}
    mkdir package-${i}

    cat > package-${i}/BUILD <<EOL
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
)

ts_config(
    name = "tsconfig",
    src = "tsconfig.json",
    deps = [
        "//:tsconfig"
    ]
)
EOL

    cat > package-${i}/package.json <<EOL
{
    "name": "package-${i}"
}
EOL

    cat > package-${i}/tsconfig.json <<EOL
{
    "extends": "../tsconfig.json",
    "include": ["src/**/*.ts"]
}
EOL

    mkdir package-${i}/src

    cat > package-${i}/src/package-${i}-function.ts <<EOL
export function package${i}Function() {
    console.log('package-${i}');
}
EOL

done
printf "\nDone\n"