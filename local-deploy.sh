#!/bin/bash
echo "[INFO] Pulling updates from origin/master";
git fetch --quiet origin master
git reset --quiet --hard origin/master
git clean -d -f --exclude local-deploy.sh

echo "[INFO] Installing npm dependencies";
npm install --silent --omit=dev &>/dev/null

echo "[INFO] Deploying complete";