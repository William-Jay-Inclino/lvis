
Note: 

 - You must first need to install pnpm globally and docker
 - Open 4 terminals (step 3, 5, 6, 7) must have different terminals

to run the app in development: 


1. INSTALL PACKAGES
- run: pnpm i 


2. CONFIGURE ENV FILES
- ADD env file in the root directory (use the _env.dev.temp) 
- ADD env file in /apps/system/ (use the _env.temp) 
- ADD env file in /apps/warehouse/ (use the _env.temp) 


3. RUN DOCKER CONTAINER FOR POSTGRES DB
-inside docker folder directory run: 
docker-compose up system-db warehouse-db


4. MIGRATE SYSTEM & WAREHOUSE DATABASE 
- inside apps/system run:
pnpm run migrate:dev

-inside apps/warehouse run:
pnpm run migrate:dev


5. RUN SYSTEM SERVICE
pnpm run start:dev system 


6. RUN WAREHOUSE SERVICE
pnpm run start:dev warehouse 


7. RUN API GATEWAY SERVICE 
pnpm run start:dev 


8. POPULATE DATABASE (optional)
to seed the database: read database-seeder.txt located in: 
/notes/database-seeder.txt


9. CREATE ADMIN

- To create a user with a role of ADMIN: run this command in the terminal
curl -X POST -H "Content-Type: application/json" -d '{"password": "admin123"}' http://localhost:4001/auth/create-admin


10. Open browser and go to: http://localhost:3000/login