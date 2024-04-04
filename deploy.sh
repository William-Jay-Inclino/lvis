#!/bin/bash

# Install dependencies
# pnpm install

# Build the application
npm run build

# Start the database containers in detached mode
cd docker
docker-compose up system-db warehouse-db -d

# Wait for the databases to start
sleep 10

# Run database migrations
cd ../apps/system
npm run migrate:dev

# Wait for system migration
sleep 5

cd ../warehouse
npm run migrate:dev

# Wait for warehouse migration
sleep 5

# Start the NestJS applications in the background
cd ../..
node dist/apps/system/main &
SYSTEM_PID=$!
sleep 5
node dist/apps/warehouse/main &
WAREHOUSE_PID=$!
sleep 5

# Start the api-gateway after system and warehouse are ready
node dist/apps/api-gateway/main &
