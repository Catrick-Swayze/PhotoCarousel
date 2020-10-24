const { Client } = require('pg');
const { performance } = require('perf_hooks');

const client = new Client({
  user: 'username',
  host: 'localhost',
  port: 5432,
  password: 'password',
  database: 'imagecarousel',
})

client.connect(function (err){
  if(err)
      console.log(err);
  else
      console.log("postgreSQL Connected!");
});

const getItem = (productId, callback) => {
  let getQuery = `SELECT product, imageName, color, url, alt FROM imagecarousel WHERE product = ${productId}::varchar;`;
  var startGetQuery = performance.now();
  client
    .query(getQuery)
    .then(res => {
        console.log('getQuery: ', res.rows);
        var endGetQuery = performance.now();
        console.log('Get Query Time: ', endGetQuery - startGetQuery);
        callback(res.rows);
    })
    .catch(err => {
        console.error(err);
    })
};

const createItem = (product, imageName, color, url, alt, callback) => {
  let createQuery = `INSERT INTO imagecarousel (product,imagename,color,url,alt) VALUES (${product}, '${imageName}', '${color}', '${url}', '${alt}');`;
  var startCreateQuery = performance.now();
  client
    .query(createQuery)
    .then(res => {
        console.log('New entry created!');
        var endCreateQuery = performance.now();
        console.log('Get Query Time: ', endCreateQuery - startCreateQuery);
        callback(res.rows);
    })
    .catch(err => {
        console.error(err);
    })
};

const deleteItem = (productId, callback) => {
  let deleteQuery = `DELETE FROM imagecarousel WHERE product = ${productId}::varchar;`;
  var startDeleteQuery = performance.now();
  client
    .query(deleteQuery)
    .then(res => {
        console.log('Entry Deleted!');
        var endDeleteQuery = performance.now();
        console.log('Get Query Time: ', endDeleteQuery - startDeleteQuery);
        callback();
    })
    .catch(err => {
        console.error(err);
    })
    .finally(() => {
        client.end();
    });
};

const updateItem = (product, imageName, color, url, alt, callback) => {
  let updateQuery = `UPDATE imagecarousel SET imagename='${imageName}', color='${color}', url='${url}', alt='${alt}' WHERE product=${product}::varchar;`;
  var startUpdateQuery = performance.now();
  client
    .query(updateQuery)
    .then(res => {
        console.log('Entry Updated!');
        var endUpdateQuery = performance.now();
        console.log('Get Query Time: ', endUpdateQuery - startUpdateQuery);
        callback(res.rows);
    })
    .catch(err => {
        console.error(err);
    })
    .finally(() => {
        client.end();
    });
};

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(express.json());
const path = require('path');
const babelPolyFill = require('@babel/polyfill');

app.use(express.static(path.join(__dirname, '/../../dist')));

app.get('/products/:product/', function(req, res) {
    var productParam = req.params.product;
    getItem(productParam, ((result) => {
        res.send(result);
    }));
});

app.post('/products/', function(req, res) {
    var product = req.body.product;
    var imageName = req.body.imageName;
    var color = req.body.color;
    var url = req.body.url;
    var alt = req.body.alt;
    createItem(product, imageName, color, url, alt, ((result) => {
        res.send(result);
    }));
});

app.delete('/products/:product/', function(req, res) {
    var product = req.params.product;
    deleteItem(productParam, ((result) => {
        res.send('202 DELETE');
    }));
});

app.put('/products/:product/', function (req, res) {
    var product = req.body.product;
    var imageName = req.body.imageName;
    var color = req.body.color;
    var url = req.body.url;
    var alt = req.body.alt;
    updateItem(product, imageName, color, url, alt, ((result) => {
        res.send(result);
    }));
});

// getItem('10000001');
// createItem('10000001', 'Cool Girl', 'glossy-red', 'https://loremflickr.com/640/480/clothes', 'http://placeimg.com/640/480/abstract');
// deleteItem('10000001');
// updateItem('10000001', 'Bad Girl', 'glossy-blue', 'https://loremflickr.com/640/480/clothes', 'http://placeimg.com/640/480/abstract')

app.listen(3001, () => {
    console.log('Listening on port 3001...')
})

module.exports = {
  getItem,
  createItem,
  deleteItem,
  updateItem,
};