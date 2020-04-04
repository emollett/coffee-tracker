# scripts/after_install/
#!/bin/bash
sudo aws s3 cp --recursive s3://coffee-tracker/coffee-tracker-frontend/ /ubuntu/coffee-tracker/coffee-tracker-backend;
cd /ubuntu/coffee-tracker/coffee-tracker-backend;
sudo yarn add; # install in case any new back end deps have been included since last install
sudo pm2 restart API;
