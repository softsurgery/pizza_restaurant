module.exports = (app) => {
    const Pizza = require("../controllers/pizza.controller"); 
    app.post("/pizzas", Pizza.createPizza);
    app.get("/pizzas", Pizza.getAllPizzas);
    app.get("/pizzas/:id", Pizza.getPizzaById);
    app.put("/pizzas/:id", Pizza.updatePizza);
    app.delete("/pizzas/:id", Pizza.deletePizza);
  };
  