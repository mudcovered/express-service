#!/bin/sh -e

# Pull package name and version
VERSION=$(awk '/"version": "[0-9.]*"/ { version=$2 ;gsub(/[",\n]/,"",version); printf version }' package.json)

NAME=$(awk '/"name": "[^"]*"/ { name=$2 ;gsub(/[",\n]/,"",name); printf name }' package.json)


#if yarn info $NAME versions | grep -q $VERSION ; then
#    echo "Already published"
#    exit 1;
#fi

git tag v$VERSION

yarn publish --non-interactive --new-version=$VERSION --no-git-tag-version --verbose

git push --tags
