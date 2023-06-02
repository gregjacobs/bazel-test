load("@aspect_rules_js//js:defs.bzl", "js_library")
load("@aspect_rules_js//npm:defs.bzl", "npm_package")
load("@aspect_rules_ts//ts:defs.bzl", "ts_config", "ts_project")
load("@npm//:defs.bzl", "npm_link_all_packages")

npm_link_all_packages()

npm_package(
    name = "package-88",
    srcs = [":lib"],
    out = "pkg",
    include_runfiles = False,
    package = "package-88",
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
    deps = [
        ':node_modules/package-70',
        ':node_modules/package-71',
        ':node_modules/package-72',
        ':node_modules/package-73',
        ':node_modules/package-74',
        ':node_modules/package-75',
        ':node_modules/package-76',
        ':node_modules/package-77',
        ':node_modules/package-78',
        ':node_modules/package-79',
    ]
)

ts_config(
    name = "tsconfig",
    src = "tsconfig.json",
    deps = [
        "//:tsconfig"
    ]
)