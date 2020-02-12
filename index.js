const axios = require('axios')
const express = require('express')


const port= 3002;
const app = express();

// BTCUSD price API URL
let btcusdurl = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD'


// USDKES price URL
let usdkesurl = 'https://free.currconv.com/api/v7/convert?q=USD_KES&compact=ultra&apiKey=d0b86711525fc30d9f27'


const btcusdApi = axios.get(btcusdurl);
const usdkesApi = axios.get(usdkesurl);

// Formats BTCKES in 2 decimal places
function currencyFormat(num) {
  return num.toFixed(2)
}

// To show that the express server is running
app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
  );

// BTCKES API Endpoint that returns a json object 
app.get('/', (request, response) => { 
  axios.all([btcusdApi, usdkesApi])
  .then(axios.spread((...responses) => {
    const btcusdApi = responses[0].data
    const usdkesApi = responses[1].data
    const btcusdprice = Object.values(btcusdApi);
    const usdkesprice = Object.values(usdkesApi);
    const btckes = parseFloat(currencyFormat(btcusdprice * usdkesprice))
    response.json({ btckes})
    console.log(btckes)
    }
  
))
// If either of the APIs required is down, display error message
.catch(errors => {
  console.log('Try again later')
  
});
});
