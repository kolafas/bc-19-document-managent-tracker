# bc-19-document-management-tracker
Web app to manage users documents


## To Get Started

```js
git clone https://github.com/kolafas/bc-19-document-managent-tracker.git
```

The above git command clones the respository on your local machine.

Run the npm install command to install all dependencies

```js
npm install
```
The app uses [firebase](http://www.firebase.google.com) for persistence of data i.e Firebase as database provider

To run the app, environmental variables need to be specified

Copy the configuration keys for your firebase database, from the firebase console.

```
apiKey: "huk516791829n726812hj1928j1",
authDomain: "sample-database.firebaseapp.com",
databaseURL: "https://sample-database.firebaseio.com",
storageBucket: "sample-data.appspot.com"
```

## P.S
Do not use the above variables as your connector to your database.
Make use of the variables provided to you by [firebase](https://firebase.google.com)

Create a ```.env ``` file  in your the root folder of the app 
Add the data in the ```.env` file as specified from your database

```
API_KEY=huk516791829n726812hj1928j1

AUTH_DOMAIN=sample-database.firebaseapp.com

DATABASE_URL=https://document-manager-6df6d.firebaseio.com

STORAGE_BUCKET=https://sample-database.firebaseio.com
```

##To run the app with the environment variables

```
node -r dotenv/config app.js
```












