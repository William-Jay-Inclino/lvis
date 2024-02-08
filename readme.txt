
Note: 

 - You must first need to install pnpm globally
 - Open 4 terminals (step 2, 3, 4, 5) must have different terminals

to run the app in development: 

1. pnpm i 

2. in docker directory (cd docker): run command 
docker compose up system-db warehouse-db 

3. go back in root directory: run command 
pnpm run start:dev system 

4. pnpm run start:dev warehouse 

5. pnpm run start:dev 

6. cd in apps/system and run: pnpm run migrate:dev
Note: make sure you have .env file in apps/system directory

7. cd in apps/warehouse and run: pnpm run migrate:dev
Note: make sure you have .env file in apps/warehouse directory

Note: Make sure in doing step 5, step 2-4 is already up and running 

to seed the database: read database-seeder.txt located in: 
/notes/database-seeder.txt


open browser and go to: http://localhost:4000/graphql 

Note: in order to execute api request you must first have an authorization

1. To create a user with a role of ADMIN: run this command in the terminal
curl -X POST -H "Content-Type: application/json" -d '{"password": "admin123"}' http://localhost:4001/auth/create-admin


2. To have an authorization you must first be logged in. run this command 
curl -X POST -H "Content-Type: application/json" -d '{"username": "admin", "password": "admin123"}' http://localhost:4000/auth/login


3. Copy the access_token value


4. open browser and go to: http://localhost:4000/graphql 

5. Navigate to HTTP HEADERS section located in the bottom left corner and copy and paste this: 

{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoiZGM0MDBiNjEtNGNiNy00MGY4LTk2MWYtZDEwM2I5ZmVjYzkxIiwiaWF0IjoxNzA3MzU5NDE3LCJleHAiOjE3MDczOTU0MTd9.RDOq2N5K8fls9B-waNh3-rSPDBwn6gMskAw5ix1ZYDI"
}

6. Replace the token with the access_token you copied in step 2


To verify if all is working: 

run this query:

query{
  users{
    id
    username
  }
}


Note: You can view the docs and schema in the right side portion