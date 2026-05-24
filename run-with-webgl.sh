#!/bin/bash
# Kill existing Chrome and relaunch with WebGL enabled
pkill -f "google-chrome" 2>/dev/null
sleep 1
google-chrome \
  --enable-webgl \
  --ignore-gpu-blocklist \
  --use-gl=angle \
  --enable-gpu-rasterization \
  --no-sandbox \
  http://localhost:5173/ &
echo "Chrome launched with WebGL enabled"
