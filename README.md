# Backend-APIs

### Run:

*make sure that the mySQL server is running and env-vars are correctly configured*

* Install npm packages:
```
npm insatll
```

* Run:
```
node app.js
```

### File-tree:

```text
.
|── app.js                 # start-point
|
├── routes/
│   ├── router.js          # route-handler
│   └── controller.js      # provides functions to the router
|
|──  jwt/
|   └── auth.js            # jwt-implementation(middleware)
|   
├── sql/
│   ├── db.js              # Sequelize-init
│   └── user.js            # User-model
|
├── .env
|
├── package-lock.json
└── package.json  
```    