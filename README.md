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
|── app.js                      # start-point
|
├── config/
│   └── db.js                   # sequelize-init
|
├── controller/
│   ├── auth_controller.js      # auth-controller
│   └── lead_controller.js      # lead-controller
|
├── routes/
│   ├── lead_router.js          # lead route-handler
│   └── crm_router.js           # crm route-handler
|
|──  jwt/
|   └── auth.js                 # jwt-implementation(middleware)
|   
├── model/
│   ├── lead.js                 # lead-model
│   └── user.js                 # user-model
|
├── .env
|
├── package-lock.json
└── package.json  
```    