#!/bin/bash

# TODO: Maybe have this call npm install if necessary
npx tsc
if [ ! -d './bin' ]
then
  mkdir bin
fi
node --experimental-specifier-resolution=node ./bin/main.js