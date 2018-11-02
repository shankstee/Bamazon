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
//   viewProducts();
    viewLowProducts();
});



function viewProducts() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products;", function (err, res) {
        if (err) throw err;
        console.table(res);

        
    });
    
    
    
}

function viewLowProducts() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5;", function (err, res) {
        if (err) throw err;
        console.table(res);

        
    });
    
    
    
}

function addProduct() {
    connection.query("", function (err, res) {
        if (err) throw err;
        console.table(res);

        
    });

}

function askAdd() {
    inquirer
      .prompt([
        {
        name: "askItem",
        type: "input",
        message: "What Item number would you like to add to?",
        },
        {
          name: "howMany",
          type: "input",
          message: "How many would you like to add?"
        }
      
      ])
      .then(function(answer) {

        var itemAdd = answer.askItem; // the item the user wants to buy
        var thisMany = answer.howMany; // How many of that item the user wants to buy

        var query = connection.query("SELECT * FROM products WHERE item_id=?", [itemAdd], function(err, res) {
            if (res[0].stock_quantity < parseInt(thisMany)) { // if the result the user guesses stock quantitiy is less than the amount the user wants
              console.log("Bamazon currently does not have that many in stock..");
            } else {
              console.log("Your Order is complete");
              connection.query("UPDATE products SET ? WHERE ?", [
                {
                  stock_quantity: res[0].stock_quantity - parseInt(thisMany)
              },
              {
                item_id: itemToBuy
              }
  
            ],function(err, result) {
              
              console.log("The price of " + thisMany + " " + res[0].product_name + "s" + " is " +  res[0].price + " dollars each.");
  
              connection.end();
                
              })
            }
          });



      })};
    
    
    


