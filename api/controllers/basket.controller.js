const Basket = require("../models/basket.model");
const Pizza = require("../models/pizza.model");

// Create or update a basket item
const addToBasket = async (req, res) => {
  try {
    const { userId, pizzaId, quantity } = req.body;

    // Validate the pizza exists
    const pizza = await Pizza.findById(pizzaId);
    if (!pizza) {
      return res.status(404).json({ error: "Pizza not found" });
    }

    const basket = await Basket.findOne({ user: userId });

    let updatedBasket;

    if (basket) {
      // Check if the pizza is already in the basket
      const itemIndex = basket.items.findIndex(
        (item) => item.pizza.toString() === pizzaId
      );

      if (itemIndex > -1) {
        // Update quantity and total price
        basket.items[itemIndex].quantity += quantity;
        basket.items[itemIndex].totalPrice = basket.items[itemIndex].quantity * pizza.price;
      } else {
        // Add new item to the basket
        basket.items.push({
          pizza: pizzaId,
          quantity,
          totalPrice: quantity * pizza.price,
        });
      }

      // Update total price for the basket
      basket.totalPrice = basket.items.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
      updatedBasket = await basket.save();
    } else {
      // Create a new basket
      const newBasket = new Basket({
        user: userId,
        items: [
          {
            pizza: pizzaId,
            quantity,
            totalPrice: quantity * pizza.price,
          },
        ],
        totalPrice: quantity * pizza.price,
      });

      updatedBasket = await newBasket.save();
    }

    res.status(200).json(updatedBasket);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add to basket", details: err.message });
  }
};

// Get the basket for a user
const getBasketByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const basket = await Basket.findOne({ user: userId }).populate(
      "items.pizza"
    );
    if (!basket) {
      return res.status(404).json({ error: "Basket not found" });
    }

    res.status(200).json(basket);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch basket", details: err.message });
  }
};

// Remove an item from the basket
const removeFromBasket = async (req, res) => {
  try {
    const { userId, pizzaId } = req.body;

    const basket = await Basket.findOne({ user: userId });
    if (!basket) {
      return res.status(404).json({ error: "Basket not found" });
    }

    const itemIndex = basket.items.findIndex(
      (item) => item.pizza.toString() === pizzaId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found in basket" });
    }

    // Remove item and update total price
    basket.items.splice(itemIndex, 1);
    basket.totalPrice = basket.items.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    await basket.save();

    res.status(200).json({ message: "Item removed from basket", basket });
  } catch (err) {
    res
      .status(500)
      .json({
        error: "Failed to remove item from basket",
        details: err.message,
      });
  }
};

// Clear the basket for a user
const clearBasket = async (req, res) => {
  try {
    const { userId } = req.params;

    const basket = await Basket.findOne({ user: userId });
    if (!basket) {
      return res.status(404).json({ error: "Basket not found" });
    }

    basket.items = [];
    basket.totalPrice = 0;

    await basket.save();

    res.status(200).json({ message: "Basket cleared", basket });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to clear basket", details: err.message });
  }
};

module.exports = {
  addToBasket,
  getBasketByUser,
  removeFromBasket,
  clearBasket,
};
