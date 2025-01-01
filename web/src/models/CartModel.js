import { action, computed, makeObservable, observable } from "mobx";
import { makePersistable } from "mobx-persist-store";

class CartModel {
  pizzas = [];

  constructor() {
    makeObservable(this, {
      // states
      pizzas: observable,
      getCount: computed,
      getTotalPrice: computed,
      // methods
      addPizza: action,
      increasePizza: action,
      decreasePizza: action,
      removePizza: action,
      clearPizzas: action,
    });

    makePersistable(this, {
      name: "CartModel",
      properties: ["pizzas"],
      expireIn: 3 * 24 * 60 * 60 * 1000, // Expiration in milliseconds (3 days)
      storage: window.localStorage, // Use localStorage for persistence
    }).catch((error) =>
      console.error("Failed to initialize persistence for CartModel:", error)
    );
  }

  addPizza(pizza) {
    const existingPizza = this.pizzas.find((p) => p.id === pizza.id);
    if (!existingPizza) {
      this.pizzas.push({ ...pizza, quantity: 1 });
    } else {
      existingPizza.quantity++;
    }
  }

  increasePizza(id) {
    const pizza = this.pizzas.find((p) => p.id === id);
    if (pizza) {
      pizza.quantity++;
    }
  }

  decreasePizza(id) {
    const pizza = this.pizzas.find((p) => p.id === id);
    if (pizza && pizza.quantity > 1) {
      pizza.quantity--;
    }
  }

  removePizza(id) {
    this.pizzas = this.pizzas.filter((p) => p.id !== id);
  }

  clearPizzas() {
    this.pizzas = [];
  }

  get getCount() {
    return this.pizzas.reduce((total, pizza) => total + pizza.quantity, 0);
  }

  get getTotalPrice() {
    return this.pizzas.reduce((total, pizza) => {
      const price =
        pizza.size === "Small"
          ? pizza.priceOfSm
          : pizza.size === "Medium"
          ? pizza.priceOfMd
          : pizza.priceOfLg;
      return total + pizza.quantity * price;
    }, 0);
  }
}

const cartModel = new CartModel();
export default cartModel;
