# scripts/before_install
#!/bin/bash
cd /coffee-tracker;
git pull origin master;
rm -rf coffee-tracker-backend/build;
