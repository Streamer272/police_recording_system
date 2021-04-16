#!/bin/bash

yarn add node-modules

if [ "$?" != "0" ]; then
    if [ "$1" != "--norepeat" ]; then
        read -r -p "Error occurred, do you have yarn? [y/n] " HAS_YARN

        if [ "$HAS_YARN" == "n" ]; then
            bash setup-yarn.sh
            bash setup-dependencies.sh

        else
            echo "Couldn't run application."
            exit 1
        fi
    fi
fi
