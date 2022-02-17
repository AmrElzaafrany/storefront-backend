 # API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: `products/'[GET]`
- Show: `products/:id'[GET]`
- Create: (args: Product)[token required]: `'products/' [POST] (token)`
- Products by category: `'products/cat/:category' [GET]`
- Delete: `'products/:id  [DELETE]`
- Update: `'products/:id  [UPDATE]`
- [OPTIONAL] Top 5 most popular products 


#### Users
- Index [token required]: `'users/' [GET] (token)`
- Show [token required]: `'users/:id' [GET] (token)`
- Create (args: User)[token required]: `'users/' [POST] (token)`
- Delete: `'users/:id  [DELETE]`
- Update: `'users/:id  [UPDATE]`

#### Orders
- Index [token required]: `'orders/' [GET] (token)`
- Show [token required]: `'orders/:id' [GET] (token)`
- Completed Orders by user [token required]: `'orders/completed/:user_id' [GET] (token)`
- Create: (args: Product)[token required]: `'orders/' [POST] (token)`

## Data Shapes
#### Product
-  id
- name
- price
- category

```
Table: Product (id:serial[primary key], name:varchar(50)[not null], price:numeric[not null], category:varchar(50))
```
#### User
- id
- username
- firstName
- lastName
- password

```
Table: User (id:serial[primary key], firstName:varchar(50)[not null], lastName:varchar(50)[not null], username: varchar(50)[not null] , password:varchar(60)[not null])
```
#### Orders
- id
- user_id
- status of order (active or complete)

```
Table: Orders (id:serial[primary key], product_id:integer(foreign key to products table), quantity:integer[default 1], user_id:integer(foreign key to users table), status:enum(active, complete)[not null])
```

#### Order_Products
- id
- product_id of each product in the order
- quantity of each product in the order
- order_id

```
Table: Orders (id:serial[primary key], product_id:integer(foreign key to products table), quantity:integer, order_id (foreign key to order table))
```