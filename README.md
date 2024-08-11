# Environment Variable Setup

Environment variables are used to manage configuration options and settings in an application's runtime environment without hard-coding them into the source code. This makes the application more secure and adaptable to different environments.

### Important!
All of these `.env` files are just examples to get you started. You should <strong>NEVER</strong> use these .env files for your final project. You should modify all these environment variables and <strong>NEVER</strong> check them into GitHub

### 1. Setting Up Prisma
- This `.env` file is used by Prisma to connect to the database
- Put this file here `typescript-auth/backend/prisma/.env`
```
DATABASE_URL="postgresql://user:password@db:5432/postgres"
```
### 2. Setting Up Express
- This `.env` file is used by Express to set up secrets for authentication
- These secrets are used by Express to create JWT tokens
- Put this file at `typescript-auth/backend/.env`
```
# Database
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=postgres
PGADMIN_DEFAULT_EMAIL=user@email.com
PGADMIN_DEFAULT_PASSWORD=password

# Express
ACCESS_KEY=super_secret_access_key
REFRESH_KEY=super_seccret_refresh_key
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=1w
ACCESS_COOKIE_EXPIRY=900000 # 15 minutes
REFRESH_COOKIE_EXPIRY=604800000 # 1 week
```
### 3. Setting Up Postgres
- This `.env` file is used to create the PostgreSQL database
- Put this file at `typescript-auth/db/.env`
```
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=postgres
PGADMIN_DEFAULT_EMAIL=user@email.com
PGADMIN_DEFAULT_PASSWORD=password
```
### Important!
- Make sure the database information in `typescript-auth/backend/.env` matches the information in `typescript-auth/backend/prisma/.env`


# Starting The Application

The application is managed using docker and docker compose

### 1. Create a volume for persistent data
```
docker volume create postgres_data
```
### 2. Start the containers
```
docker compose up -d
```
- This should be enough to get the application up and running
- `typescript-auth/backend/Dockerfile` and `typescript-auth/docker-compose.yml` will do the following for you
  - It will run `npx prisma generate` which will ensure that the Prisma Client is in sync with your latest schema definitions
  - It will run `npx prisma migrate dev` which will create and apply new migration files based on the changes you've made to your Prisma schema file (schema.prisma)
  - It will run `npm run dev` which will start the backend api in development mode

# Database Setup and Management
Prisma is used to manage the tables in your database. If you want to make changes to your database you need to do the following
### 1. Modify Your Schema
- Schema for your tables is located at `typescript-auth/backend/prisma/schema.prisma`

### 2. Generate and Apply Database Migrations
#### Generate Database Migration File and Apply Migrations
```
npx prisma migrate dev --name <migration_name>
```
- This command does three things
  - It checks the schema for changes.
  - It creates SQL migration files in the `typescript-auth/backend/prisma/migrations` directory.
  - It applies the migrations to your development database.
#### Generate Database Migration File (Does Not Apply Migrations)
```
npx prisma migrate dev --name <migration_name> --create-only
```


# Deploying to AWS
### Create Environment Variables
##### typescript-auth/backend/.env
```
# Database
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=postgres

# Express
ACCESS_KEY=super_secret_access_key
REFRESH_KEY=super_seccret_refresh_key
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=1w
ACCESS_COOKIE_EXPIRY=900000 # 15 minutes
REFRESH_COOKIE_EXPIRY=604800000 # 1 week
```
##### typescript-auth/backend/prisma/.env
```
DATABASE_URL="postgresql://user:password@db:5432/postgres"
```
### Run the containers
```
docker compose -f docker-compose-prod.yml up -d
```
