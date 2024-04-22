#!/bin/bash

# Define database credentials and name
DB_USER="jay"
DB_NAME="lvis_system_db"
BACKUP_DIR="/home/jay/Documents/projects/leyeco/lvis/backup/system_db"

# Define backup file name with current date and time
BACKUP_FILE="$BACKUP_DIR/system_db_backup_$(date +'%Y-%m-%d_%H-%M-%S').dump"

# Define log file
LOG_FILE="/home/jay/Documents/projects/leyeco/lvis/backup/logs/system_db_backup.log"

# Limit the number of backup files to 5
MAX_BACKUPS=5

# Remove the oldest backup files if the number of backups exceeds the limit
while [ $(ls -1 $BACKUP_DIR | wc -l) -ge $MAX_BACKUPS ]; do
  OLDEST_BACKUP=$(ls -t $BACKUP_DIR | tail -1)
  rm $BACKUP_DIR/$OLDEST_BACKUP
done

# Log start of execution
echo "$(date +'%Y-%m-%d %H:%M:%S') - Starting backup..." >> $LOG_FILE

# Backup the database using pg_dump
(docker exec docker-system-db-1 pg_dump -U $DB_USER -d $DB_NAME -Fc -E utf-8 > $BACKUP_FILE) &

# Wait for backup to complete
wait

# Check if the backup was successful
if [ $? -eq 0 ]; then
  echo "$(date +'%Y-%m-%d %H:%M:%S') - Backup successful. File: $BACKUP_FILE" >> $LOG_FILE
else
  echo "$(date +'%Y-%m-%d %H:%M:%S') - Backup failed." >> $LOG_FILE
fi
