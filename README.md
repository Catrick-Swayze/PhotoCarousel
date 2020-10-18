# Carousel
Image Carousel

# Welcome to the image carousel.

In order to get setup run the following scripts:

1) Install Dependencies: npm install

2) Seeding Script:
  - open mongo instance in terminal: mongo
  - choose database: use carousel
  - clear collection: db.images.remove({})
  - in a seperate terminal: npm run dbSetup

3) Server Start Script: npm start

4) Webpack Script: npm run build

5) Carousel should be rendered to DOM


Testing Script: npm test

Have Fun!

# CRUD API
Create: POST to /products/:product/ to add to carousel.

Read: GET at /products/:product/ to get one product, get at /products to get all products.

Update: PUT at /products/:product/ to update one product in database.

Delete: DELETE at /products/:product/ to delete the product from the database.
