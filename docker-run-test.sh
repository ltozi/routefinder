#!/usr/bin/env bash

docker run -it --rm --name a-maze-ingly -v "$PWD":$1 -w $1 node:4 npm install -g && cd tests && mocha route-finder-test.js