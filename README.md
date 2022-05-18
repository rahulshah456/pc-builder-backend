# pc-builder-backend
This project contains the API calls required for running the PC-Builer Frontend project.

## Available Scripts

In the project directory, you can run:

### `npm install`

This command will install all the required packages for running this application.


### `node \.index.js`

Runs the app in the development mode.\
Open [http://localhost:4001](http://localhost:4001) to view it in the browser.


### `nodemon \.index.js`

Runs the app in the development mode.\
Open [http://localhost:4001](http://localhost:4001) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Environment variable setup

Below constant variables required for running the application and connecting to the database. create the .env file in the 
root of the project and add the respective variables

`MONGO_URI=<DATABASE_ENDPOINT>`

`API_PORT=<PORT>`

`TOKEN_KEY=<ANY_PASSPHRASE_STRING>`
