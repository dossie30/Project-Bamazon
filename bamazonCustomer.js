var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "orchard4227",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayItems();
  start();
});

function displayItems() {
  connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
    }
    console.log("-----------------------------------");
  });
}

function start() {
  connection.query("SELECT item_id, stock_quantity, product_name, price FROM products", function(err, res) {

  inquirer
    .prompt([
      {
        name: "item_choice",
        type: "input",
        message: "Type Item ID that you want to buy?"
      },
      {
        name: "units",
        type: "input",
        message: "How many units do you want?"
      },
      
    ])
    .then(function(answer) {
     // get the information of the chosen item 
      var chosenItem;
      var chosenQuantity;

      for (var i = 0; i < res.length; i++) {
        if (res[i].item_id == answer.item_choice) {
          chosenItem = res[i];
        }
      }

        
        if (chosenItem.stock_quantity >= parseInt(answer.units)) {     
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: (chosenItem.stock_quantity - answer.units)
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Order was successful!");
              console.log("Your final cost is $" + (chosenItem.price * answer.units) );
              start();
            }
          );
        } else {
          
          console.log("Insufficent quantity!");
          start();
        }
    });

  });
}
