#!/bin/bash
echo "[INFO] Changing working directory";
cd "$(dirname "$0")"

echo "[INFO] Pulling updates from origin/master";
git fetch --quiet origin master
git reset --quiet --hard origin/master
git clean -d -f

echo "[INFO] Installing npm dependencies";
npm install --silent --omit=dev &>/dev/null

echo "[INFO] Adding exeution permissions to deploy scxript"
chmod +x ./local-deploy.sh

echo "[INFO] Deploying complete";