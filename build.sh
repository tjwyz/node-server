 #!/usr/bin/env bash

set -e

echo 'start building'

echo 'download npm modules'
npm install

echo 'start compiling'
npm run build

echo 'clean build node_modules'
rm -rf node_modules

echo 'download npm modules for production'
npm install --production

echo 'finish building!'

