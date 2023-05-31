workspace(
    name = "bazel_test_2",
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")


##############
# BuildBuddy

http_archive(
    name = "io_buildbuddy_buildbuddy_toolchain",
    sha256 = "a2a5cccec251211e2221b1587af2ce43c36d32a42f5d881737db3b546a536510",
    strip_prefix = "buildbuddy-toolchain-829c8a574f706de5c96c54ca310f139f4acda7dd",
    urls = ["https://github.com/buildbuddy-io/buildbuddy-toolchain/archive/829c8a574f706de5c96c54ca310f139f4acda7dd.tar.gz"],
)

load("@io_buildbuddy_buildbuddy_toolchain//:deps.bzl", "buildbuddy_deps")

buildbuddy_deps()

load("@io_buildbuddy_buildbuddy_toolchain//:rules.bzl", "buildbuddy")

buildbuddy(name = "buildbuddy_toolchain")

##############



# Bazel Toolchains to enable remote building
# To get the hash and latest version: 
#     curl https://storage.googleapis.com/rbe-toolchain/bazel-configs/rbe-ubuntu1604/latest/manifest.json
http_archive(
    name = "rbe_default",
    # Change the sha256 digest to the value of the `configs_tarball_digest` in the manifest you
    # got when you ran the curl command above.
    sha256 = "bd55bd8b2ffa850b5683367e7ab0756d6f51088866b2a81e4c07b6e87d04d8c5",
    urls = ["https://storage.googleapis.com/rbe-toolchain/bazel-configs/bazel_5.2.0/rbe-ubuntu1604/latest/rbe_default.tar"],
    # urls = ["https://storage.googleapis.com/rbe-toolchain/bazel-configs/rbe-ubuntu1604/latest/rbe_default.tar"],
)

http_archive(
    name = "aspect_rules_ts",
    sha256 = "8eb25d1fdafc0836f5778d33fb8eaac37c64176481d67872b54b0a05de5be5c0",
    strip_prefix = "rules_ts-1.3.3",
    url = "https://github.com/aspect-build/rules_ts/releases/download/v1.3.3/rules_ts-v1.3.3.tar.gz",
)

load("@aspect_rules_ts//ts:repositories.bzl", "rules_ts_dependencies")
rules_ts_dependencies(
    # This keeps the TypeScript version in-sync with the editor, which is typically best.
    ts_version_from = "//:package.json",
)

load("@rules_nodejs//nodejs:repositories.bzl", "DEFAULT_NODE_VERSION", "nodejs_register_toolchains")
nodejs_register_toolchains(
    name = "node",
    node_version = DEFAULT_NODE_VERSION,
)

# Register aspect_bazel_lib toolchains;
# If you use npm_translate_lock or npm_import from aspect_rules_js you can omit this block.
load("@aspect_bazel_lib//lib:repositories.bzl", "register_copy_directory_toolchains", "register_copy_to_directory_toolchains")
register_copy_directory_toolchains()
register_copy_to_directory_toolchains()