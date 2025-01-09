import { action, makeObservable, observable } from "mobx";
import axios from "../api/axios";

class ToppingModel {
  toppings = [];
  loading = false;
  error = null;

  constructor() {
    makeObservable(this, {
      //states
      toppings: observable,
      loading: observable,
      error: observable,
      //methods
      fetchToppings: action,
      addTopping: action,
      removeTopping: action,
      randomizeToppings: action,
      clearToppings: action,
    });
  }

  async fetchToppings() {
    try {
      this.loading = true;
      const response = await axios.get("/toppings");
      this.toppings = response.data;
      this.loading = false;
    } catch (err) {
      this.error = err.message;
      this.loading = false;
    }
  }

  addTopping(topping) {
    this.toppings.push(topping);
  }

  removeTopping(index) {
    if (index >= 0 && index < this.toppings.length) {
      this.toppings.splice(index, 1);
    }
  }

  randomizeToppings() {
    if (this.toppings.length === 0) return [];

    const randomCount = Math.max(2, Math.floor(Math.random() * this.toppings.length) + 1);

    const shuffled = [...this.toppings];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, randomCount);
  }

  clearToppings() {
    this.toppings = [];
  }
}

const toppingModel = new ToppingModel();
export default toppingModel;
