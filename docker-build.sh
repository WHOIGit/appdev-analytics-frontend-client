#!/bin/sh
docker buildx build -f compose/Dockerfile -t ghcr.io/whoigit/appdev-analytics-frontend-client:stable --platform linux/amd64 --push .
