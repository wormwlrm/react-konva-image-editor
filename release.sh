#!/usr/bin/env sh

# abort on errors
set -e

git co release

git merge capstone

npm publish