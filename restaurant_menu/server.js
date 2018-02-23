const express = require('express');
const app = express();
const PORT = 3001;
const assert = require('assert');
const bodyParser = require('body-parser')
const fs = require('fs');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const reqPath = path.join(__dirname, './data.json');
let savedItems = JSON.parse(fs.readFileSync(reqPath, 'utf8'));

 const updateItems = res => {
   fs.writeFile(reqPath, JSON.stringify(savedItems), 'utf8', function(err) {
     if(err) {
       console.log(err);
     }
     res.send('ok')
   });
 }

app.get('/dishes', function(req, res){
  res.send(savedItems)
})

app.post('/dishes/addItem', function(req, res){
  console.log(req)
  const newItem = req.body.data.item;
  const order = (req.body.data.order)?[]:'';
  var totalPrice = (order.totalPrice+parseFloat(newItem.price))
  var orderNew = { items:order.item.push(newItem),totalPrice:order.totalPrice}
  res.send(orderNew)
})

// app.post('/dishes/checkoutItem', function(req, res){
//   res.send('checkout successfull')
// })


app.listen(PORT, function () {
  console.log('Example app listening on port 3001!')
})
