#!/bin/bash

rm -rf coffee-tracker-backend/build;
cd coffee-tracker-frontend;
npm install; # install in case any new front end deps have been included since last install
npm run build; 
cd ..;
cp -R coffee-tracker-frontend/build/ coffee-tracker-backend;
cd coffee-tracker-backend;
npm install; # install in case any new back end deps have been included since last install
sudo service mongod start;
sudo pm2 start all;