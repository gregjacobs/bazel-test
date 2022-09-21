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
    deps = ['//packages/package-with-dep-3:library']
)

ts_config(
    name = "tsconfig",
    src = "tsconfig.json",
    deps = [
        "//:tsconfig"
    ]
)