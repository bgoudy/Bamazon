var mysql = require("mysql");
var inquirer = require("inquirer");
// connect to database
var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  // username
  user: "root",

  // password
  password: "password",
  database: "bamazon"
});

  // connect to db
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  
  queryProducts();
  start();
});

// Pull all product information from MySQL for user
function queryProducts() {
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + "|" + res[i].product_name + "|" + res[i].department_name + "|" + res[i].price + "|" + res[i].stock_quantity);
        }
        /*console.log("----------------------------------------");*/
        
    });
}


function start(){
  inquirer.prompt([
  {
    name:"productID",
    type:"input",
    message:"Please enter the Product ID for purchase.",
    // choices:["product_id", "product_name"] //How do I populate this from MySQL?
    filter: Number
  },
  {
    name: "quantity",
    type: "input",
    message: "Please enter the quantity for purchase.",
    filter: Number
  }
  ]).then(function(answer){
    //
  })
} 
// Allow user to choose product for purchase

// Ask user for purchase quantity

//connection.end();