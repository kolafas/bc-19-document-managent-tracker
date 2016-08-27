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

## Adding variables from Auth0
The authenication provider for this app is auth0, so you have to get the configurations keys

Add them to the `.env` file

```
API_KEY=huk516791829n726812hj1928j1

AUTH_DOMAIN=sample-database.firebaseapp.com

DATABASE_URL=https://document-manager-6df6d.firebaseio.com

STORAGE_BUCKET=https://sample-database.firebaseio.com


DOMAIN=document-manager.eu.auth0.com

CLIENT_ID=n6fAsjtap6aio8EhoWKHgEYHptFESo2l

CLIENT_SECRET=657882212/-213-=3=1=2-101313

CALLBACK_URL=http://yoursite.com/authorize

//Add this call back url the Auth0 settings

SESSION_SECRET=MEv1LGpYjxgBubvR5_zHHhvyT3qsJxfggHO7KLZPU5nkgbCXDDnncx_j0BVs7q-y
```

##To run the app with the environment variables

```
node -r dotenv/config app.js
```












