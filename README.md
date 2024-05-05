Prisma Notes

Migrate: npx prisma migrate dev

npx prisma generate: regenerates the Prisma Client code based on your database schema, ensuring that your application's database interactions are in sync with your data model


Create New Migration File
npx prisma migrate dev --name your_migration_name

Migrate
npx prisma migrate dev


DATABASE_URL='postgres://username:password@db:5432/db'



How to Change Tables
Exec into the express container
npx prisma generate
npm prisma migrate dev —name new_name