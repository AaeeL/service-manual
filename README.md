# Service Manual
REST API for an electric service manual.
## Usage
### Setting up database
* install MongoDB if you don't have it already
* to start the database, run `mongod` from the file where you installed MongoDB
### Running this app
* clone this repo
* cd to repo
* run `npm install` to install modules
* run `npm start` to start the app
### Initializing data
For this app to work you must first initialize some data about some devices in to the database. Data can be anything, from device name to production year to device model or type. After that you can start to query.
### Querys
You can query this API using Postman.
1. **Inserting data**
  - To insert data to database send a POST request to `/api/insert`
  - Sent data must be in json form containing fields `target`, `description` and `criticality`. Criticality field has to be a number from 1 to 3.
2. Updating data
3. Deleting data
4. Searcing and filtering a search
