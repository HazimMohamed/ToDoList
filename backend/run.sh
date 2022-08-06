#!/bin/bash

# TODO: Maybe have this call npm install if necessary
npx tsc
if [ ! -d './bin' ]
then
  mkdir bin
fi
node ./bin/test-server.js