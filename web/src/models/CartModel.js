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
      increasePizza: action,
      decreasePizza: action,
      removePizza: action,
      clearPizzas: action,
    });

    makePersistable(this, {
      name: "PizzaModel",
      properties: ["pizzas", "count"],
      expireIn: 3 * 24 * 60 * 60,
      storage: localStorage,
    });
  }

  addPizza(pizza) {
    if (!this.pizzas.some((p) => p.id === pizza.id)) {
      this.pizzas.push(pizza);
    }
    else{
      this.pizzas.forEach((p, index) => {
        if (p.id === pizza.id) {
          this.pizzas[index].quantity++;
          return;
        }
      });
    }
  }

  increasePizza(id) {
    this.pizzas.forEach((p) => {
      if (p.id === id) {
        p.quantity++;
        return;
      }
    });
  }

  decreasePizza(id) {
      this.pizzas.forEach((p) => {
        if (p.id === id && p.quantity > 1) {
          p.quantity--;
          return;
        }
      });
  }

  removePizza(id) {
    this.pizzas = this.pizzas.filter((p) => p.id!== id);
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
