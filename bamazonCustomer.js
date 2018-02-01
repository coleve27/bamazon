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

inventory();

function inventory() {
  console.log("Bamazon Inventory: ");
  var query = connection.query(
    "SELECT * FROM products",
    function(err, res) {
      if (err) throw err;

      for (i = 0; i < res.length; i++)
        console.log('Item ID:' + res[i].item_id + ' Product Name: ' + res[i].product_name + ' Price: ' + '$' + res[i].price + '(Quantity left: ' + res[i].stock_quantity + ')');
          order();
    }
  );

}

function order() {
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
        connection.query(
          "SELECT * FROM products WHERE ?", [{
            item_id: answer.purchase
          }],
          function(err, res) {
            if (answer.amount > res[0].stock_quantity) {
              console.log("check back when we have more in stock!")
              newOrder();
            } else {
              var amount_owed = res[0].price * answer.amount
              console.log("your total is " + amount_owed)

              connection.query(
                "UPDATE products SET ? WHERE ?", [{
                    stock_quantity: res[0].stock_quantity - answer.amount
                  },
                  {
                    item_id: answer.purchase
                  }
                ],
                function(err, res) {

                }

              )
              newOrder()

            };

          }
        );

    });

}

function newOrder() {
  inquirer
    .prompt([{
      type: "confirm",
      message: "Would you like to place a new order?",
      name: "confirm",
      default: true

    }]).then(function(answer) {
        if (answer.confirm) {
          inventory();
        } else {
          console.log("thank you for shopping!");
        }

      }

    )
}







//function that checks customer order against inventory//








//function that console.logs the stock
// TODO: check out CLI table or forloop to get inventory
