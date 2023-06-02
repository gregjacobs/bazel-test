load("@aspect_rules_js//js:defs.bzl", "js_library")
load("@aspect_rules_js//npm:defs.bzl", "npm_package")
load("@aspect_rules_ts//ts:defs.bzl", "ts_config", "ts_project")
load("@npm//:defs.bzl", "npm_link_all_packages")

npm_link_all_packages()

npm_package(
    name = "package-97",
    srcs = [":lib"],
    out = "pkg",
    include_runfiles = False,
    package = "package-97",
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
        ':node_modules/package-80',
        ':node_modules/package-81',
        ':node_modules/package-82',
        ':node_modules/package-83',
        ':node_modules/package-84',
        ':node_modules/package-85',
        ':node_modules/package-86',
        ':node_modules/package-87',
        ':node_modules/package-88',
        ':node_modules/package-89',
    ]
)

ts_config(
    name = "tsconfig",
    src = "tsconfig.json",
    deps = [
        "//:tsconfig"
    ]
)