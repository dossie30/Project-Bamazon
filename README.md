# Project-Bamazon
Amazon-like storefront app using MySQL &amp; Node.js.

There are two views to the app: Customer & Manager.

The inital start of the customer app displays all the items that are available for sale to the customer.

The app will then prompt customer two messages using Inquirer: What is the ID of the product you want to buy? How many units of the product do you want to buy?

Once the customer's order is placed, stock will be checked. If it is not enough stock, a message "Insufficent quantity!" will be displayed. If there is enough stock, the order will be fulfilled. A messeage "Order was successful!" will be displayed along with total cost of purchase. Also, stock will be updated in the SQL database.

The manager app list 4 menu options.
  - View Products for sale (displays all available items)
  - View Low inventory (displays all items with an inventory under 5)
  - Add to inventory (give the manager ability to add to inventory)
  - Add new product (give manager ability to add new product to store)

![link to video displaying app functionality](http://recordit.co/EUiLqWBJXx "

