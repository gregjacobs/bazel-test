workspace(
    name = "bazel_test_2",
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

# Bazel Toolchains to enable remote building
# To get the hash and latest version: 
#     curl https://storage.googleapis.com/rbe-toolchain/bazel-configs/rbe-ubuntu1604/latest/manifest.json
http_archive(
    name = "rbe_default",
    # Change the sha256 digest to the value of the `configs_tarball_digest` in the manifest you
    # got when you ran the curl command above.
    sha256 = "6ac1093b2c8c1199c038697ca726f48390a17bbe0d3108b8b508611ce1e6c1b5",
    urls = ["https://storage.googleapis.com/rbe-toolchain/bazel-configs/bazel_5.2.0/rbe-ubuntu1604/latest/rbe_default.tar"],
    # urls = ["https://storage.googleapis.com/rbe-toolchain/bazel-configs/rbe-ubuntu1604/latest/rbe_default.tar"],
)

# Rules NodeJS
http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "ee3280a7f58aa5c1caa45cb9e08cbb8f4d74300848c508374daf37314d5390d6",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/5.5.1/rules_nodejs-5.5.1.tar.gz"],
)

load("@build_bazel_rules_nodejs//:repositories.bzl", "build_bazel_rules_nodejs_dependencies")
build_bazel_rules_nodejs_dependencies()

# fetches nodejs, npm, and yarn
load("@build_bazel_rules_nodejs//:index.bzl", "node_repositories")
node_repositories()

load("@build_bazel_rules_nodejs//:index.bzl", "yarn_install")
yarn_install(
    name = "npm",
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
)
