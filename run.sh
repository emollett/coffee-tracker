#!/bin/bash

# git pull origin master - could use this to always pull latest version
rm -rf coffee-tracker-backend/build;
cd coffee-tracker-frontend;
npm install; # install in case any new front end deps have been included since last install
npm run build; 
cd ..;
cp -R coffee-tracker-frontend/build/ coffee-tracker-backend;
cd coffee-tracker-backend;
npm install; # install in case any new back end deps have been included since last install
node server;