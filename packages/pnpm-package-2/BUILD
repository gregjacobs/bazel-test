load("@aspect_rules_js//js:defs.bzl", "js_binary", "js_library")
load("@aspect_rules_ts//ts:defs.bzl", "ts_config", "ts_project")
load("@aspect_rules_js//npm:defs.bzl", "npm_package")
load("@npm//:defs.bzl", "npm_link_all_packages")

npm_link_all_packages()

npm_package(
    name = "pnpm-package-2",
    srcs = [":lib"],
    out = "pkg",
    include_runfiles = False,
    package = "pnpm-package-2",
    visibility = ["//visibility:public"],
)

js_binary(
    name = "bin",
    entry_point = "dist/index.js",
    data = [
        ":lib"
    ],
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
    deps = [
        ":node_modules/pnpm-package-1"
    ]
)

ts_config(
    name = "tsconfig",
    src = "tsconfig.json",
    deps = [
        "//:tsconfig"
    ]
)