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
├── config/
│   └── db.js            # User-model
|
├── controller/
│   ├── auth_controller.js          # route-handler
│   └── lead_controller.js      # provides functions to the router
|
├── routes/
│   ├── lead_router.js          # route-handler
│   └── crm_router.js      # provides functions to the router
|
|──  jwt/
|   └── auth.js            # jwt-implementation(middleware)
|   
├── model/
│   ├── lead.js              # Sequelize-init
│   └── user.js            # User-model
|
├── .env
|
├── package-lock.json
└── package.json  
```    