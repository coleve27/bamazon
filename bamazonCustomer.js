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
  // inventory();
  inquirer.
  prompt([{
      name: "purchase",
      type: "input",
      message: "What is the id of the item you wish to purchase?"
    }, {
      name: "amount",
      type: "input",
      message: "How many units would yo like to purchase?"
    }])
    .then(function(answer) {
      var query = connection.query(
        "SELECT stock_quantity FROM products WHERE ?", [{
          item_id: answer.purchase
        }],

        function(err, res) {
          if (err) throw err;




        }
      );



      // connection.query(
      //   "UPDATE products"
      // )
    });
  connection.end();
});

//inquirer practice









//function that checks customer order against inventory//








//function that console.logs the stock
// TODO: check out CLI table or forloop to get inventory
function inventory() {
  console.log("Bamazon Inventory: ");
  var query = connection.query(
    "SELECT * FROM products",
    function(err, res) {
      if (err) throw err;

      for (i = 0; i < res.length; i++)
        console.log(console.log('Item ID:' + res[i].item_id + ' Product Name: ' + res[i].product_name + ' Price: ' + '$' + res[i].price + '(Quantity left: ' + res[i].stock_quantity + ')'));

    }
  );
}
