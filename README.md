# bitGames

Online store with drag&amp;drop functionality.

This proyect corresponds to the final challenge of the GeekHubs Academy online back-end bootcamp.

## Summary

- [bitgames](#bitgames)
  - [Summary](#summary)
  - [Built With](#built-with)
    - [About the technologies used](#about-the-technologies-used)
  - [How the website works](#how-the-website-works)
    - [Using the shopping cart](#using-the-shopping-cart)
    - [Using the API](#using-the-API)
  - [Versioning](#versioning)
  - [Author](#author)
  - [Copyright and license](#copyright-and-license)
  - [Acknowledgments](#acknowledgments)

## Built With
    
| Tecnology | Description |
| ------ | ------ |
| [Node.js v14.15.5](https://nodejs.org/en/) | JavaScript runtime built on Chrome's V8 JavaScript engine. |
| [Express v4.17.1](https://expressjs.com/) | Fast, unopinionated, minimalist web framework for Node.js |
| [mongoDB v4.4.4 Community](https://www.mongodb.com/) | General purpose, document-based, distributed database built for modern application developers and for the cloud |
| [Handlebars v4.7.7](https://handlebarsjs.com/) | Minimal templating on steroids |
| [JSON Web Tokens](https://jwt.io/) | Open, industry standard RFC 7519 method for representing claims securely between two parties. |
| [Bootstrap Icons v1.4.0](https://icons.getbootstrap.com/) (&amp;) [Font Awesome v5.15.0](https://fontawesome.com/) | Mixed icons for more fun. |
| [Google Fonts](https://fonts.google.com/) | Variety is the spice of life |

### About the technologies used

First project in the process of assimilating the MERN stack (mongoDb, Express, React.js and Node.js), this time, focused on the back-end.

## How the website works

The application allows 3 access roles: `administrator, vendor and user`, identified by codes `0, 1 and 2` respectively. When you create a new user from the home page, you will have the role 2 (user-buyer).

There are specific pages for vendor and user only, which are the requirements of the project.However, any of the pages can be accessed as an administrator and have full functionality: `make purchases, view invoices, view products with different search filters, modify them, delete them, add new ones and modify the profile`, through the URL and the identifier.

By reusing the code and views already generated, you can easily add pages to manage users and invoices.

You can quickly start testing the application by importing the following JSON file.
```sh
[
  {
    "_id": {
      "$oid": "60537c7e12a0b62d48db28d3"
    },
    "name": "admin",
    "lastname": "admin",
    "newEmail": "admin@admin.com",
    "password": "$2a$10$4UomcIz9cUp.wZ0NSDm7FOCYBlEtBA3wWAHYYtH1.oakB9k9MZgE.",
    "role": 0,
    "createdAt": "18/03/2021 17:14",
    "__v": 0
  },
  {
    "_id": {
      "$oid": "605380fa2ef1110c14972809"
    },
    "name": "vendor",
    "lastname": "vendor",
    "newEmail": "vendor@vendor.com",
    "password": "$2a$10$lr3q5bopJ5QLO3Gx1Q9KqOQMT9sPoQe3Q59GDY78GCuLAdOzrLl8y",
    "role": 1,
    "createdAt": "18/03/2021 17:34",
    "__v": 0
  },
  {
    "_id": {
      "$oid": "60553299b41d102d2c651044"
    },
    "name": "user",
    "lastname": "user",
    "newEmail": "user@user.com",
    "password": "$2a$10$stu01qGaHoFOlfxWKqTLGe24v4fNKGCuuOwnVrGt2uTFijoQZ2Ea6",
    "role": 2,
    "createdAt": "20/03/2021 00:24",
    "__v": 0
  },
]
```
Each user has the same password as the email domain name, i.e. `admin, vendor and user`.

### Using the shopping cart

In `store` page, at the top right, in red, is the icon to display or add products to the shopping cart. If you click on the icon before adding products, an empty list will be displayed and the buttons will be disabled. In addition, the subtotal will indicate 0 €.

To add products to the purchase, there are 2 possibilities:
- press the `"Add to cart"` button.
- drag the product to the shopping cart icon.

Each time a product is added, the icon starts flashing and the confirmation message of the added product is displayed.

You can only add each product once, and a warning will appear if it is already in the cart.

Once you access the cart, it stops flashing.

When added to the cart, each product has a selector to choose the quantity of the product in question, this selection being limited to between 1 and 10.

Every time you change the quantity or add new products, the subtotal is updated, indicating the price of the new selected quantity.

If the cart has products, the two buttons are enabled to manage it:
- `"Empty this cart"`, which will completely empty the cart.
- `"Purchase now"`, which will simulate the purchase made, emptying the cart and displaying a purchase confirmation message.

The selection of products, together with the total purchase price, will be stored in the database and can be viewed from the `invoices` page.

Furthermore, each product has a button `"x"` to remove it individually.

### Using the API

You can easily export your products and users from the database in JSON format. Once created in the database, you can get them in the pages: `api/games` and `api/users`.

## Versioning

`v1.0.0-alpha`
The site use [SemVer](http://semver.org/) for versioning. 

## Author

**Antonio Cebrián Mesa** - _Full Stack Developer & Informatics Teacher_ -
- [My personal Website](http://clasesinformaticagranada.es/)
- [Follow me on Twitter](https://twitter.com/hacking_the_web)
- [For projects and classes](https://www.linkedin.com/in/antonio-cebri%C3%A1n-mesa)

## Copyright and license

Code and documentation copyright 2021 the [Author](https://www.linkedin.com/in/antonio-cebri%C3%A1n-mesa). Code released under the [MIT License](https://github.com/Ch3ssMaster/bitgames/blob/master/LICENSE.md). 

## Acknowledgments

Always grateful to all those who freely share their knowledge through the internet (StackOverflow, youtubers, bloggers, etc).