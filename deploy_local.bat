echo [1/2] Pulling latest images from Docker Hub...
docker-compose pull

echo.
echo [2/2] Restarting services with the new images...
docker-compose up -d

echo.
echo --- Update complete! ---
