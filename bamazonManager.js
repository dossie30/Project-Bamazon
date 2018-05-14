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

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});

function start() {
  inquirer
    .prompt({
      name: "menu",
      type: "rawlist",
      message: "Select menu option:",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    })
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.menu == "View Products for Sale") {
        displayItems();
      } else if (answer.menu == "View Low Inventory") {
        lowInventory();
      } else if (answer.menu == "Add to Inventory") {
        addInventory();
      } else {
        addNewproduct();
      }
    });
}

function displayItems() {
  connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("-----------------------------------");
    start();
  });
}

function lowInventory() {
  var query = connection.query("SELECT * from products WHERE stock_quantity<5",
    function (err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
      }
      console.log("-----------------------------------");
      start();
    });

}

function addInventory() {
  var query = connection.query("SELECT * from products",
    function (err, res) {
      //displayItems();
      
      
      inquirer
        .prompt([
          {
            name: "add_more",
            type: "input",
            message: "Which product do you want to add?"
          },
          {
            name: "add_units",
            type: "input",
            message: "How many units do you want to add?"
          }

        ])
        .then(function (answer) {

          var chosenItem;
          for (var i = 0; i < res.length; i++) {
            if (res[i].item_id == answer.add_more) {
              chosenItem = res[i];
            }
          }


          if (chosenItem.item_id == answer.add_more) {
            connection.query(
              "UPDATE products SET ? WHERE ?", [
                {
                  stock_quantity: (chosenItem.stock_quantity + parseInt(answer.add_units))
                },
                {
                  item_id: chosenItem.item_id
                }
                
              ],
              function (error,res) {
                if (error) throw err;

                console.log("Successful Add!");
                console.log(res.affectedRows + " product inserted!\n");
                start();
              }
            );
          } else {


            start();
          }
        });
    });
}

function addNewproduct() {
  
  inquirer
    .prompt([
      {
        name: "product_name",
        type: "input",
        message: "What is the product you would like to add?"
      },
      {
        name: "dept_name",
        type: "input",
        message: "What department would you like to place your product?"
      },
      {
        name: "price",
        type: "input",
        message: "What would you like the price to be?",
        
      },
      {
        name: "stock_quantity",
        type: "input",
        message: "How much do you want to add to inventory?"
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.product_name,
          dept_name: answer.dept_name,
          price: answer.price,
          stock_quantity: answer.stock_quantity
        },
        function(err) {
          if (err) throw err;
          console.log("Your product was created successfully!");
          
          start();
        }
      );
    });
}