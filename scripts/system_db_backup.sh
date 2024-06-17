#!/bin/bash

# Load .env file from the root directory
source $(dirname $(dirname $0))/.env

# Define backup file name with current date and time
BACKUP_FILE="$BACKUP_SYSTEM_DIR/system_db_backup_$(date +'%Y-%m-%d_%H-%M-%S').dump"

# Log start of execution
echo "$(date +'%Y-%m-%d %H:%M:%S') - Initializing system database backup..." >> $BACKUP_SYSTEM_LOG

# Check if the backup directory exists
if [ ! -d "$BACKUP_SYSTEM_DIR" ]; then
  echo "$(date +'%Y-%m-%d %H:%M:%S') - System Backup directory does not exist. Creating directory..." >> $BACKUP_SYSTEM_LOG
  mkdir -p $BACKUP_SYSTEM_DIR
fi

# Remove the oldest backup files if the number of backups exceeds the limit
while [ $(ls -1 $BACKUP_SYSTEM_DIR | wc -l) -ge $MAX_BACKUPS ]; do
  OLDEST_BACKUP=$(ls -t $BACKUP_SYSTEM_DIR | tail -1)
  rm $BACKUP_SYSTEM_DIR/$OLDEST_BACKUP
  echo "$(date +'%Y-%m-%d %H:%M:%S') - Removed old system backup file: $OLDEST_BACKUP" >> $BACKUP_SYSTEM_LOG
done

# Backup the database using pg_dump
echo "$(date +'%Y-%m-%d %H:%M:%S') - Starting system database backup..." >> $BACKUP_SYSTEM_LOG
(docker exec docker-system-db-1 pg_dump -U $DB_USER -d $DB_SYSTEM_NAME -Fc -E utf-8 > $BACKUP_FILE) &

# Wait for backup to complete
wait

# Check if the backup was successful
if [ $? -eq 0 ]; then
  if [ -s $BACKUP_FILE ]; then
    echo "$(date +'%Y-%m-%d %H:%M:%S') - System Backup successful. File: $BACKUP_FILE" >> $BACKUP_SYSTEM_LOG
  else
    echo "$(date +'%Y-%m-%d %H:%M:%S') - System Backup failed. The backup file is empty." >> $BACKUP_SYSTEM_LOG
    rm $BACKUP_FILE
  fi
else
  echo "$(date +'%Y-%m-%d %H:%M:%S') - System Backup failed." >> $BACKUP_SYSTEM_LOG
fi
