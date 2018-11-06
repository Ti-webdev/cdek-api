# CDEK API For JavaScript

# Important! NOT READY YET!!!1
## DO NOT USE ANYWARE
### IF YOU GOT AN ERROR I GUESS CDEK IS DOWN AGAIN ...


## Install

```bash
npm install cdek-api
```

## Importing library

## NodeJS
```javascript
const CdekApi = require('cdek-api/dist/lib/cdek-api.js').default
```

## Browser  
```javascript
import Cdek from 'cdek-api'
```


### Usage

```javascript
const cdek = new CdekApi(CDEK_ACCOUNT, CDEK_SECURE_PASSWORD)

Promise.resolve().then(async () => {
  const response = await cdek.statusReport({
    _DispatchNumber: '0000000000'
  })
  console.log(response.Order)
}).catch(error => console.error(error))
```
