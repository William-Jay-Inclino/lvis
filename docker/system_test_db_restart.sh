#!/bin/bash

# Remove and stop the existing system-db container
docker-compose rm system-test-db -s -f -v

# Start the system-db container in detached mode
docker-compose up -d system-test-db
