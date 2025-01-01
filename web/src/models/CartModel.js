import { action, computed, makeObservable, observable } from "mobx";
import { makePersistable } from "mobx-persist-store";

class CartModel {
  pizzas = [];

  constructor() {
    makeObservable(this, {
      //states
      pizzas: observable,
      getCount: computed,
      //methods
      addPizza: action,
      removePizza: action,
      clearPizzas: action,
    });

    makePersistable(this, {
      name: "PizzaModel",
      properties: ["pizzas", "count"],
      expireIn: 3 * 24 * 60 * 60,
      storage: localStorage,
      debugMode: true,
    });
  }

  addPizza(pizza) {
    this.pizzas.push(pizza);
  }

  removePizza(index) {
    if (index >= 0 && index < this.pizzas.length) {
      this.pizzas.splice(index, 1);
    }
  }

  clearPizzas() {
    this.pizzas = [];
  }

  get getCount() {
    return this.pizzas.length;
  }
  
}

const cartModel = new CartModel();
export default cartModel;
