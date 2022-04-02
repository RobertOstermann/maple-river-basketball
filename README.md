# March Madness Auction

This is an auction site for the NCAA Tournament.

# Server

`dotnet new react -o server`

- Remove `ClientApp`

# Client

`npx create-react-app client --template typescript`

# Docker

This project uses docker to run a postresql database locally.
Install Docker Desktop and run `docker-compose up`.

# Database

Go to localhost:5050 to access PGAdmin.
Select Servers->Register->Server...

- Host = postgresql_database
- Port = 5432
- Maitenance database = marchMadnessDB
- Username = admin
- Password = admin1234

Install the command line entity framework tool.

- `dotnet tool install --global dotnet-ef`

Run the migrations

- `dotnet ef database update`

Add a migration

- `dotnet ef migrations add {Migration Title}`

Remove a migration

- `dotnet ef migrations remove`

# Links

[Deploy Postgres to Heroku](https://github.com/nbarbettini/little-aspnetcore-book/blob/36cbe1bcb441eb6ada0e23bfab0cca9c5981b858/chapters/deploy-the-application/deploy-to-heroku-with-postgresql.md)
