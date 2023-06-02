load("@aspect_rules_jasmine//jasmine:defs.bzl", "jasmine_test")
load("@aspect_rules_js//js:defs.bzl", "js_library")
load("@aspect_rules_js//npm:defs.bzl", "npm_package")
load("@aspect_rules_ts//ts:defs.bzl", "ts_config", "ts_project")
load("@npm//:defs.bzl", "npm_link_all_packages")

npm_link_all_packages()

npm_package(
    name = "package-45",
    srcs = [":lib"],
    out = "pkg",
    include_runfiles = False,
    package = "package-45",
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
    supports_workers = False,
    validate = False,
    deps = [
        "//:node_modules/@types/jasmine",
        "//:node_modules/@types/node",
        ':node_modules/package-30',
        ':node_modules/package-31',
        ':node_modules/package-32',
        ':node_modules/package-33',
        ':node_modules/package-34',
        ':node_modules/package-35',
        ':node_modules/package-36',
        ':node_modules/package-37',
        ':node_modules/package-38',
        ':node_modules/package-39',
    ],
)

ts_config(
    name = "tsconfig",
    src = "tsconfig.json",
    deps = [
        "//:tsconfig"
    ]
)

jasmine_test(
    name = "test",
    node_modules = "//:node_modules",
    data = [
        ":library",
    ],
    args = ["./**/*.spec.js"],
)