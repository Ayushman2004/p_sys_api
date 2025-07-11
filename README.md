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
|── app.js                            # start-point
|
├── config/
│   └── db.js                         # sequelize-init
|
├── controller/ 
│   ├── auth_controller.js            # auth-controller
|   ├── agent_controller.js           # agent-controller
|   ├── notification_controller.js    # notification-controller
│   └── lead_controller.js            # lead-controller
|
├── routes/ 
│   ├── lead_router.js                # lead route-handler
|   ├── agent_router.js               # agent route-handler
|   ├── notification_router.js        # notification route-handler
│   └── crm_router.js                 # crm route-handler
|
|──  jwt/
|   └── auth.js                       # jwt-implementation(middleware)
|   
├── model/
│   ├── lead.js                       # lead-model
|   ├── agent.js                      # agent-model
|   ├── notification.js               # notification-model
│   └── user.js                       # user-model
|
├── .env
|
├── package-lock.json
└── package.json  
```    