load("@build_bazel_rules_nodejs//:index.bzl", "js_library")
load("@npm//@bazel/typescript:index.bzl", "ts_config", "ts_project")

js_library(
    name = "library",
    visibility = ["//visibility:public"],
    package_name = "package-1",
    srcs = ["package.json"],
    deps = [
        ":tsconfig", 
        ":tsc"
    ],
)

ts_project(
    name = "tsc",
    visibility = ["//visibility:public"],
    tsconfig = ":tsconfig",
    srcs = glob(["src/**/*.ts"]),
    source_map = True,
    declaration = True,
    #supports_workers = True
)

ts_config(
    name = "tsconfig",
    src = "tsconfig.json",
    deps = [
        "//:tsconfig"
    ]
)