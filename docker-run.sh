#!/usr/bin/env bash

docker run -it --rm --name a-maze-ingly -v "$PWD":$1 -w $1 node:4 npm install -g && node index.js -m ./another-room-map.json -i "Knife, Potted Plant" -f 2