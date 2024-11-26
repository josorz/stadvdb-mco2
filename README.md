# STADVDB MCO2

For database functions, we are currently using the [node-mysql2](https://sidorares.github.io/node-mysql2/docs/documentation) library. The backend code for update/delete can be found on `src/app/api/edit/[id]/route.ts`. Feel free to change the database library for a better alternative.

## Steamgames

This uses an updated database for proper time handling. The initial master SQL is located [here](https://drive.google.com/file/d/1wHI6Kf0KjAiUsZyh0v5rw_OPoIbCHPQf/view?usp=sharing).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Then, create a local `.env.local` file with the following variables:

```
NEXT_PUBLIC_API_URL=http://<DB_HOST>:3000
DB_HOST=localhost
DB_USER=<YOUR_DB_USERNAME>
DB_PASSWORD=<YOUR_DB_PASSWORD>
DB_PORT=3306
DB_NAME=steamgames
```

## CCSCloud

To deploy the site on the CCSCloud Server, first copy the file to the server

```bash
sudo apt update
sudo apt install git-all
git clone https://github.com/josorz/stadvdb-mco2
```

Then get public url

```bash
hostname -I
```

Then create a `.env.production` file with nano/vim

```bash
sudo nano .env.production
```

Add the following variables:

```
NEXT_PUBLIC_API_URL=http://<PUBLIC_URL>:3000
DB_HOST=localhost
DB_USER=root
DB_PORT=3306
DB_NAME=steamgames
```

Then run

```bash
npm install
npm run build
npm run start
```
