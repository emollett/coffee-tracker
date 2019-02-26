#!/bin/bash

rm -rf coffee-tracker-backend/build;
cd coffee-tracker-frontend;
cd ..;
cp -R coffee-tracker-frontend/build/ coffee-tracker-backend;
cd coffee-tracker-backend;
sudo service mongod start;
sudo pm2 start server.js;
