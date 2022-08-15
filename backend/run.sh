#!/bin/bash

function generateKey() {
  touch ./backend/key.secret;
  head -n 13 /dev/urandom | shasum | awk 'BEGIN {ORS=""} {print $1}' > ./key.secret;
}

# TODO: Maybe have this call npm install if necessary
if [ ! -d './bin' ]
then
  mkdir bin
fi

if [ ! -f './key.secret' ]
then
  generateKey
  STATUS=$?
  if [ $STATUS != 0 ]
  then
    echo "Failed to generate key. Make sure this is running on OSX."
    exit $STATUS
  else
    echo "Generated key successfully."
  fi
fi

npx tsc
node --experimental-specifier-resolution=node ./bin/main.js 2> /dev/null
