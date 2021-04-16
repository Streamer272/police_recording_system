#!/bin/bash

read -r -p "Do you have npm installed? [y/n] " HAS_NPM

if [ "$HAS_NPM" == "n" ]; then
    echo "You need to have npm installed, install npm on https://nodejs.org/en/"
    exit 1

else
    echo "Installing yarn..."
    npm install --global yarn
   echo "If installation finished, rerun this program..."
fi
