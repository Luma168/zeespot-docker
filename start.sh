#!/bin/bash

docker compose down
docker rmi --force composer:latest mysql:5.7 backend:latest frontend:latest reverse-proxy:latest

docker compose -f compose.yml up

#docker ps -a