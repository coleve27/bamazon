// Create a new Node application called bamazonManager.js. Running this application will:
//
// List a set of menu options:
//
// View Products for Sale
//
// View Low Inventory
//
// Add to Inventory
//
// Add New Product
//
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
//
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
//
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
//
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;

});

menu();

function menu() {
  inquirer
    .prompt([{
      type: "list",
      message: "What would you like to do?",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"],
      name: "choices"
    }]).then(function(answer) {
        console.log(answer)
        if (answer.choices == "View Products for Sale") {
          inventory();
        } else if (answer.choices == "View Low Inventory") {
          lowInventory();
        } else if (answer.choices == "Add to Inventory") {
          addInventory();
        } else if (answer.choices == "Add New Product") {
          addProduct();
        } else if (answer.choices == "Quit") {
          console.log("Thank you! Goodbye!")
          connection.end();
        }
      }

    )
}

function inventory() {
  console.log("Bamazon Inventory: ");
  var query = connection.query(
    "SELECT * FROM products",
    function(err, res) {
      if (err) throw err;

      for (i = 0; i < res.length; i++)
        console.log('Item ID:' + res[i].item_id + ' Product Name: ' + res[i].product_name + ' Price: ' + '$' + res[i].price + '(Quantity left: ' + res[i].stock_quantity + ')');
      menu();
    }
  );

}

function lowInventory() {
  console.log("Low Inventory: ");
  connection.query(
    "SELECT * FROM products WHERE stock_quantity < 5",
    function(err, res) {
      if (err) throw err;

      for (i = 0; i < res.length; i++)
        console.log('Item ID:' + res[i].item_id + ' Product Name: ' + res[i].product_name + ' Price: ' + '$' + res[i].price + '(Quantity left: ' + res[i].stock_quantity + ')');
      menu();
    }
  );

}

function addInventory() {
  connection.query(
    "SELECT * FROM products",
    function(err, res) {
      if (err) throw err;

      for (i = 0; i < res.length; i++)
        console.log('Item ID:' + res[i].item_id + ' Product Name: ' + res[i].product_name + ' Price: ' + '$' + res[i].price + '(Quantity left: ' + res[i].stock_quantity + ')');

      doAdd();
    }
  );


}

function doAdd() {
  inquirer.
  prompt([{
      name: "id",
      type: "input",
      message: "What is the id of the item you wish to add?"
    }, {
      name: "amount",
      type: "input",
      message: "How many units would yo like to add?"
    }])
    .then(function(answer) {
      connection.query(
        "SELECT * FROM products WHERE ?", [{
          item_id: answer.id
        }],

        function(err, res) {
          connection.query(
            "UPDATE products SET ? WHERE ?", [{
                stock_quantity: res[0].stock_quantity + parseInt(answer.amount)
              },
              {
                item_id: answer.id
              }
            ],
            function(err, res) {

            }

          )
          inventory()

        });
    })
}

function addProduct() {
  connection.query(
    "SELECT * FROM products",
    function(err, res) {
      if (err) throw err;

      for (i = 0; i < res.length; i++)
        console.log('Item ID:' + res[i].item_id + ' Product Name: ' + res[i].product_name + ' Price: ' + '$' + res[i].price + '(Quantity left: ' + res[i].stock_quantity + ')');

      doAddProduct();
    }
  );


}

function doAddProduct() {
  inquirer.
  prompt([{
        name: "name",
        type: "input",
        message: "What is the name of the item you wish to add?"
      },
      {
        name: "department",
        type: "input",
        message: "What is the department of the item you wish to add?"
      }, {
        name: "price",
        type: "input",
        message: "What is the price of the item you wish to add?"
      }, {
        name: "quantity",
        type: "input",
        message: "How many units would yo like to add?"
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO products SET ?", [{
            product_name: answer.name,
            department_name: answer.department,
            price: parseFloat(answer.price).toFixed(2),
            stock_quantity: parseInt(answer.quantity)
          }
        ],
        function(err, res) {
          console.log(err)
        }

      )
      inventory()

    })
}
