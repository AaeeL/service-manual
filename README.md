# Service Manual
REST API for an electric service manual.
## Usage
### Setting up database
* Install MongoDB if you don't have it already.
* To start the database server, run `mongod` from the file where you installed MongoDB.
* Create a new database and name it for example `servicemanual`. Easiest way to do this is to use mongoDB Compass.
### Initializing data
Using mongoDB Compass, create a new collection which contains devices and name it for example `devices`. Device data can be anything from device name to production year and model. Device name is unique. After that you are good to go.
### Running this api
* Clone this repo.
* cd to repo.
* Run `npm install` to install modules.
* Run `npm start` to start the api.
### Querys
You can query this API using Postman.
1. **Inserting data**
  - To insert data to database send a `POST` request to `/api/insert`.
  - Sent data must be in json form containing fields `target`, `description` and `criticality`. Criticality field is a number from 1 to 3. All the data in the fields must be in string form.
  - Example query: `{"target": "some device name", "description": "some description", "criticality": "3"}`.
  - Route returns status code `200` if everything went ok and `400` if there was a mistake.
2. **Updating data**
  - To update data send a `PUT` request to `/api/update`.
  - Sent data must be in json form containing two main fields `target` and `updates`. Target contains a maintenance task id and updates is a json object and contains fields `description`, `state` and `criticality`. Again, all data in the fields has to be in string form and ciriticality is a number from 1 to 3.
  - Example query: `{"target":"task id", updates: {"description": "some description", "state": "some state", "criticality": "3"}}`.
  - Route returns status code `200` if update was successful and `400` if something went wrong.
3. **Deleting data**
  - To delete data send a `DELETE` request to `/api/delete`.
  - Sent data must be in json form containing field `target`. Target is a task id.
  - Example query: `{"target": "task id"}`.
  - Route returns status code `200` if document was deleted successfully and `400` if someting went wrong.
4. **Searcing**
  - To search tasks from database send a `GET` request to `/api/fetch`. No params needed.
  - `/api/fetch` returns an array of json objects ordered by criticality and date. If there are no tasks, returns an empty array.
5. **Filtering search**
  - To search tasks of a one specific device send a `GET` request to `/api/fetch_one` with a device name.
  - Example query: `/api/fetch_one?name=device name`.
  - Returned value is an array of json objects ordered by criticality and date. If there were no tasks, returned value is an empty array.
