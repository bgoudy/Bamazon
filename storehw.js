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



//Function to prompt users to enter purchase information and pull product from inventory db
function start(){
  inquirer.prompt([
//Questions user about product they would like to buy
  {
    name:"productID",
    type:"input",
    message:"\n Please enter the Product ID for purchase. \n",
    filter: Number
  },
//Questions user on the amount/quantity they would like to buy
  {
    name: "quantity",
    type: "input",
    message: "\n Please enter the quantity for purchase. \n",
    filter: Number
  }
  //Queries db for product availability and pulls product from db inventory
  ]).then(function(answer) {
   /* var stock = stock_quantity;
    var id = item_id;
    var name = product_name;
    var dept = department_name;
    var price = price; */

        connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE ?", {item_id: answer.productID}, function(err,res) {
          if (err) throw err;
          console.log("\n You chose to purchase " + answer.quantity + " " /*+ res[0].item_id + " " */+ res[0].product_name + " from " + res[0].department_name + " at $" + res[0].price + " per unit.");

          if (res[0].stock_quantity >= answer.quantity) {
            var quantityRem = res[0].stock_quantity - answer.quantity;
            console.log(quantityRem);
            //console.log(res.stock_quantity, answer.quantity);
            connection.query("UPDATE products SET ? WHERE ?", [
              {
                stock_quantity: quantityRem
              },
              {
                item_id: answer.productID
              }
            ], function(err,res){
              if (err) throw err;
              //console.log(res);
              var total = res.price * answer.stock_quantity;
              console.log("\n Your total is $" + total.toFixed(2) + "\n")
             
            });
            
            
          }
          else {
            console.log("\n Item out of stock. \n");
          }
        })
  })
} 

start();
// Allow user to choose product for purchase

// Ask user for purchase quantity

//connection.end();