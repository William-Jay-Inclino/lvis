#!/bin/bash

# Remove and stop the existing warehouse-db container
docker-compose rm warehouse-db -s -f -v

# Start the warehouse-db container in detached mode
docker-compose up -d warehouse-db
