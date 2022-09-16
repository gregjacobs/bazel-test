#!/bin/sh
set -eu
i=1;
packagesStr="";
while [ "$i" -lt 21 ]; do
    packagesStr="${packagesStr} //package-${i}:library";
    i=$(($i+1));
done

bazel build ${packagesStr} $@