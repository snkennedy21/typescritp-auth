# Environment Variable Setup
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
### Important!
- Make sure the database information in `typescript-auth/backend/.env` matches the information in `typescript-auth/backend/prisma/.env`

# Database Management
- Prisma is used to manage the tables in your database
- If you are starting a new project there are a few steps you need to take
### 1. Create Your Schema
- Create a schema for your tables in `typescript-auth/backend/prisma/schema.prisma`
- Here is an example:
```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id       Int    @id @default(autoincrement())
  name     String
  email    String @unique
  password String

  @@index([email, name])
}
```

### 2. Generate and Apply Database Migrations
#### Generate Database Migration File and Apply Migrations
```
npx prisma migrate dev --name <migration_name>
```
- This command does three things
  1. It checks the schema for changes.
  2. It creates SQL migration files in the `typescript-auth/backend/prisma/migrations` directory.
  3. It applies the migrations to your development database.
#### Generate Database Migration File (Does Not Apply Migrations)
```
npx prisma migrate dev --name <migration_name> --create-only
```
