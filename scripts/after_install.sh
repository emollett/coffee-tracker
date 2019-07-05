# scripts/after_install/
#!/bin/bash
cd coffee-tracker-backend;
npm install; # install in case any new back end deps have been included since last install
sudo pm2 restart server;
