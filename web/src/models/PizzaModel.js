import axios from "axios";
import { action, makeObservable, observable } from "mobx";
import { makePersistable } from "mobx-persist-store";

class PizzaModel {
  pizzas = [];
  loading = false;
  error = null;

  constructor() {
    makeObservable(this, {
      //states
      pizzas: observable,
      loading: observable,
      error: observable,
      //methods
      fetchPizzas: action,
      addPizza: action,
      removePizza: action,
      clearPizzas: action,
    });
  }

  async fetchPizzas() {
    try {
      this.loading = true;
      const response = await axios.get(
        "http://localhost:3000/pizzas/"
      );
      this.pizzas = response.data;
      this.loading = false;
    } catch (err) {
      this.error = err.message;
      this.loading = false;
    }
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
}

const pizzaModel = new PizzaModel();
export default pizzaModel;
