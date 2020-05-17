# steamAfk

## Getting Started

This simple tool can be used to farm hours on your Steam account, it auto reconnects your account in case you need to use it or gets disconnected

### Installation

Download files or clone the repo then install packages

```
npm install
```

Edit the cfg.json file with your accounts details

```
[
   {
      "details":{
         "username": "account1",
         "password": "account1pw",
         "shared": ""
      },
      "games":[
         730
      ],
      "proxy":"http://127.0.0.1:1337"
   },
   {
      "details":{
         "username": "account2",
         "password": "account2pw",
         "shared": "account2shared"
      },
      "games":[
         730
      ],
      "proxy":null
   }
]
```

Start the program and enjoy

```
npm start
```