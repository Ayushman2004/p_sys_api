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
├── app.js
├── config
│   └── db.js
├── controller
│   ├── agent_att_controller.js
│   ├── agent_controller.js
│   ├── auth_controller.js
│   ├── lead_att_controller.js
│   ├── lead_controller.js
│   └── notification_controller.js
├── documentation.pdf
├── jwt
│   └── auth.js
├── model
│   ├── agent_attendence.js
│   ├── agent.js
│   ├── lead_attendence.js
│   ├── lead.js
│   ├── notification.js
│   └── user.js
├── package.json
├── package-lock.json
├── README.md
├── routes
│   ├── agent_router.js
│   ├── crm_router.js
│   ├── lead_router.js
│   └── notification_router.js
└── uploads 
```    