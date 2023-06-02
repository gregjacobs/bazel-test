# bazel-test

Testing Bazel with MS Defender performance issue

## Steps to Build

1. Install Bazel: 
    * Easiest method is probably `brew install bazelisk` on MacOS (https://github.com/bazelbuild/bazelisk) which installs the `bazel` executable
    * Full instructions if not using bazelisk: https://bazel.build/install/os-x (install Bazel 6.2.1 or higher)
2. Execute: 
   ```
   bazel test //...
   ```
