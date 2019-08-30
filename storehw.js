var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  connection.end();
  queryProducts();
  //start();
});

// Pull all product information from MySQL for user
function queryProducts() {
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + "|" + res[i].product_name + "|" + res[i].department_name + "|" + res[i].price + "|" + res[i].stock_quantity);
        }
        console.log("----------------------------------------")
    })
}
function start(){
  inquirer.prompt({
    name:"productID",
    type:"list",
    message:"What would you like to purchase?",
    choices:["product_id", "product_name"] //How do I populate this from MySQL?
  })
}
// Allow user to choose product for purchase

// Ask user for purchase quantity