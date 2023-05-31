load("@npm//@bazel/typescript:index.bzl", "ts_config")
load("@npm//:defs.bzl", "npm_link_all_packages")

npm_link_all_packages()

exports_files(["tsconfig.json"])

ts_config(
    name = "tsconfig",
    src = "tsconfig.json",
    visibility = ["//visibility:public"],
)
