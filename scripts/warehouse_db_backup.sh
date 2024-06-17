#!/bin/bash

# Load .env file from the root directory
source $(dirname $(dirname $0))/.env

# Define backup file name with current date and time
BACKUP_FILE="$BACKUP_WAREHOUSE_DIR/warehouse_db_backup_$(date +'%Y-%m-%d_%H-%M-%S').dump"

# Log start of execution
echo "$(date +'%Y-%m-%d %H:%M:%S') - Initializing warehouse database backup..." >> $BACKUP_WAREHOUSE_LOG

# Check if the backup directory exists
if [ ! -d "$BACKUP_WAREHOUSE_DIR" ]; then
  echo "$(date +'%Y-%m-%d %H:%M:%S') - Warehouse backup directory does not exist. Creating directory..." >> $BACKUP_WAREHOUSE_LOG
  mkdir -p $BACKUP_WAREHOUSE_DIR
fi

# Remove the oldest backup files if the number of backups exceeds the limit
while [ $(ls -1 $BACKUP_WAREHOUSE_DIR | wc -l) -ge $MAX_BACKUPS ]; do
  OLDEST_BACKUP=$(ls -t $BACKUP_WAREHOUSE_DIR | tail -1)
  rm $BACKUP_WAREHOUSE_DIR/$OLDEST_BACKUP
  echo "$(date +'%Y-%m-%d %H:%M:%S') - Removed old warehouse backup file: $OLDEST_BACKUP" >> $BACKUP_WAREHOUSE_LOG
done

# Backup the database using pg_dump
echo "$(date +'%Y-%m-%d %H:%M:%S') - Starting warehouse database backup..." >> $BACKUP_WAREHOUSE_LOG
(docker exec docker-warehouse-db-1 pg_dump -U $DB_USER -d $DB_WAREHOUSE_NAME -Fc -E utf-8 > $BACKUP_FILE) &

# Wait for backup to complete
wait

# Check if the backup was successful
if [ $? -eq 0 ]; then
  if [ -s $BACKUP_FILE ]; then
    echo "$(date +'%Y-%m-%d %H:%M:%S') - Warehouse database backup successful. File: $BACKUP_FILE" >> $BACKUP_WAREHOUSE_LOG
  else
    echo "$(date +'%Y-%m-%d %H:%M:%S') - Warehouse database backup failed. The backup file is empty." >> $BACKUP_WAREHOUSE_LOG
    rm $BACKUP_FILE
  fi
else
  echo "$(date +'%Y-%m-%d %H:%M:%S') - Warehouse database backup failed." >> $BACKUP_WAREHOUSE_LOG
fi
