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

const getItem = (productId) => {
  let getQuery = `SELECT product, imageName, color, url, alt FROM imagecarousel WHERE product = ${productId}::varchar;`;
  var startGetQuery = performance.now();
  client
    .query(getQuery)
    .then(res => {
        console.log('getQuery: ', res.rows);
        var endGetQuery = performance.now();
        console.log('Get Query Time: ', endGetQuery - startGetQuery);
    })
    .catch(err => {
        console.error(err);
    })
    .finally(() => {
        client.end();
    });
};

const createItem = (product, imageName, color, url, alt) => {
  let createQuery = `INSERT INTO imagecarousel (product,imagename,color,url,alt) VALUES (${product}, '${imageName}', '${color}', '${url}', '${alt}');`;
  var startCreateQuery = performance.now();
  client
    .query(createQuery)
    .then(res => {
        console.log('New entry created!');
        var endCreateQuery = performance.now();
        console.log('Get Query Time: ', endCreateQuery - startCreateQuery);
    })
    .catch(err => {
        console.error(err);
    })
    .finally(() => {
        client.end();
    });
};

const deleteItem = (productId) => {
  let deleteQuery = `DELETE FROM imagecarousel WHERE product = ${productId}::varchar;`;
  var startDeleteQuery = performance.now();
  client
    .query(deleteQuery)
    .then(res => {
        console.log('Entry Deleted!');
        var endDeleteQuery = performance.now();
        console.log('Get Query Time: ', endDeleteQuery - startDeleteQuery);
    })
    .catch(err => {
        console.error(err);
    })
    .finally(() => {
        client.end();
    });
};

const updateItem = (product, imageName, color, url, alt) => {
  let updateQuery = `UPDATE imagecarousel SET imagename='${imageName}', color='${color}', url='${url}', alt='${alt}' WHERE product=${product}::varchar;`;
  var startUpdateQuery = performance.now();
  client
    .query(updateQuery)
    .then(res => {
        console.log('Entry Updated!');
        var endUpdateQuery = performance.now();
        console.log('Get Query Time: ', endUpdateQuery - startUpdateQuery);
    })
    .catch(err => {
        console.error(err);
    })
    .finally(() => {
        client.end();
    });
};

// getItem('10000001');
// createItem('10000001', 'Cool Girl', 'glossy-red', 'https://loremflickr.com/640/480/clothes', 'http://placeimg.com/640/480/abstract');
// deleteItem('10000001');
// updateItem('10000001', 'Bad Girl', 'glossy-blue', 'https://loremflickr.com/640/480/clothes', 'http://placeimg.com/640/480/abstract')

module.exports = {
  getItem,
  createItem,
  deleteItem,
  updateItem,
};