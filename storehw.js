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
start();



function start(){
  inquirer.prompt([
  {
    name:"productID",
    type:"input",
    message:"\n Please enter the Product ID for purchase. \n",
    filter: Number
  },
  {
    name: "quantity",
    type: "input",
    message: "\n Please enter the quantity for purchase. \n",
    filter: Number
  }
  ]).then(function(answer) {
   /* var stock = stock_quantity;
    var id = item_id;
    var name = product_name;
    var dept = department_name;
    var price = price; */

        connection.query("SELECT item_id, product_name, department_name, price, stock_quantity, FROM products WHERE ?", {item_id: answer.id}, function(err,res) {
          console.log("\n You chose to purchase" + answer.products.stock_quantity + " " + res.products.item_id + " " + res.products.product_name + " " + res.products.department_name + " " + res.products.price);

          if (res[0].stock >= answer.quantity) {
            var quantityRem = res.stock - answer.products.stock_quantity;

            connection.query("UPDATE products SET ? WHERE ?", [
              {
                stock_quantity: quantityRem
              },
              {
                item_id: answer.id
              }
            ], function(err,res){

            });
            var total = res.products.price * answer.stock_quantity;
            console.log("\n Your total is $" + total.toFixed(2) + "\n")
          }
          else {
            console.log("\n Item out of stock. \n");
          }
        })
  })
} 
// Allow user to choose product for purchase

// Ask user for purchase quantity

//connection.end();