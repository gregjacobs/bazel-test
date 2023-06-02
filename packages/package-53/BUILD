load("@aspect_rules_js//js:defs.bzl", "js_library")
load("@aspect_rules_js//npm:defs.bzl", "npm_package")
load("@aspect_rules_ts//ts:defs.bzl", "ts_config", "ts_project")
load("@npm//:defs.bzl", "npm_link_all_packages")

npm_link_all_packages()

npm_package(
    name = "package-53",
    srcs = [":lib"],
    out = "pkg",
    include_runfiles = False,
    package = "package-53",
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
        ':node_modules/package-40',
        ':node_modules/package-41',
        ':node_modules/package-42',
        ':node_modules/package-43',
        ':node_modules/package-44',
        ':node_modules/package-45',
        ':node_modules/package-46',
        ':node_modules/package-47',
        ':node_modules/package-48',
        ':node_modules/package-49',
    ]
)

ts_config(
    name = "tsconfig",
    src = "tsconfig.json",
    deps = [
        "//:tsconfig"
    ]
)