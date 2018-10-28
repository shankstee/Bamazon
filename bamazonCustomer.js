var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({ // establish a connection with local database
  host: "127.0.0.1",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

connection.connect(function(err) { // Check if connection to database was sucsessful or not. 
  if (err) throw err;
  console.log("Connected");
  afterConnection();
  connection.end();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("----------These Products 4 Sale---------");
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name+ " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("-----------------------------------");
    askWhatToBuy();
  });
}

function askWhatToBuy() {
  inquirer
    .prompt(
      {
      name: "askItem",
      type: "input",
      message: "What Item number would you like to buy?",
      },
      {
        name: "howMany",
        type: "list",
        message: "How many would you like ?"
      }
    
    )
    .then(function(answer) {
      switch (answer.askItem) {
      case "Find songs by artist":
        artistSearch();
        break;

      case "Find all artists who appear more than once":
        multiSearch();
        break;

      case "Find data within a specific range":
        rangeSearch();
        break;

      case "Search for a specific song":
        songSearch();
        break;
      }
    });
}
