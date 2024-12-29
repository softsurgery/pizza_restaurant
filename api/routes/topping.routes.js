module.exports = (app) => {
    const Topping = require('../controllers/topping.controller.js');
  
    app.post('/toppings', Topping.createTopping);
    app.get('/toppings', Topping.getAllToppings);
    app.get('/toppings/:id', Topping.getToppingById);
    app.put('/toppings/:id', Topping.updateTopping);
    app.delete('/toppings/:id', Topping.deleteTopping);
  };
  