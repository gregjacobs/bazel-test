load("@aspect_rules_js//js:defs.bzl", "js_library")
load("@aspect_rules_js//npm:defs.bzl", "npm_package")
load("@aspect_rules_ts//ts:defs.bzl", "ts_config", "ts_project")
load("@npm//:defs.bzl", "npm_link_all_packages")

npm_link_all_packages()

npm_package(
    name = "package-16",
    srcs = [":lib"],
    out = "pkg",
    include_runfiles = False,
    package = "package-16",
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
        ':node_modules/package-0',
        ':node_modules/package-1',
        ':node_modules/package-2',
        ':node_modules/package-3',
        ':node_modules/package-4',
        ':node_modules/package-5',
        ':node_modules/package-6',
        ':node_modules/package-7',
        ':node_modules/package-8',
        ':node_modules/package-9',
    ]
)

ts_config(
    name = "tsconfig",
    src = "tsconfig.json",
    deps = [
        "//:tsconfig"
    ]
)