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
  console.log("connected as id " + connection.threadId + "\n");
  //console.log the stock
  inventory();
  connection.end();
});

//inquirer practice

inquirer.
  prompt({
    name: "purchase",
    type: "input",
    message: "What is the id of the item you wish to purchase?"
  })
// TODO: add promot for asking how many units



  .then(function(answer){
    connection.query(
      "UPDATE products"
    )
  })
















//function that console.logs the stock
// TODO: check out CLI table or forloop to get inventory
function inventory() {
  console.log("Bamazon Inventory: ");
  var query = connection.query(
    "SELECT * FROM products",
    function(err, res) {
      console.log(res[0].product_name + " products updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      // deleteProduct();
    }
  );
}
