# Backend-APIs

### Run:

*make sure that the mySQL server is running and env-vars are correctly configured*

* Install npm packages:
```
npm insatll
```

* Run:
```
node api.js
```

### File-tree:

```text
.
|──  jwt/
|   └── auth.js       # jwt-implementation(middleware)
|   
├── sql/
│   ├── db.js        # Sequelize-init
│   └── user.js      # User-model
|
├── .env
|
├── package-lock.json
└── package.json  
```    