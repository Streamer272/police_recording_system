#!/bin/bash

yarn start

if [ "$?" != "0" ]; then
    if [ "$1" != "--norepeat" ]; then
        read -r -p "Error occurred, do you have yarn? [y/n] " HAS_YARN

        if [ "$HAS_YARN" == "n" ]; then
            bash setup-yarn.sh
            bash run.sh --norepeat

        else
            bash setup-dependencies.sh
        fi
    fi
fi
