module.exports = (app) => {
    const BasketController = require('../controllers/basket.controller');
    app.post('/basket', BasketController.addToBasket);
    app.get('/basket/:userId', BasketController.getBasketByUser);
    app.delete('/basket/item', BasketController.removeFromBasket);
    app.delete('/basket/:userId', BasketController.clearBasket);
}

