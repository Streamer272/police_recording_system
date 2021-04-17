#!/bin/bash

sudo pip3 install -U flask-cors

if [ "$?" != "0" ]; then
    sudo pip install -U flask-cors
fi
