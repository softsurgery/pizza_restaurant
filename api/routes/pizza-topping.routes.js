module.exports = (app) => {
    const PizzaTopping = require("../controllers/pizza-topping.controller.js");
    app.post("/pizza-toppings", PizzaTopping.createPizzaTopping);
    app.get("/pizza-toppings", PizzaTopping.getAllPizzaToppings);
    app.get("/pizza-toppings/:id", PizzaTopping.getPizzaToppingById);
    app.put("/pizza-toppings/:id", PizzaTopping.updatePizzaTopping);
    app.delete("/pizza-toppings/:id", PizzaTopping.deletePizzaTopping);
  };
  