import { action, computed, makeObservable, observable } from "mobx";
import { makePersistable } from "mobx-persist-store";

class CustomOrderModel {
  toppings = [];
  size = "large";

  constructor() {
    makeObservable(this, {
      // states
      toppings: observable,
      size: observable,
      // methods
      addTopping: action,
      removeTopping: action,
      clearToppings: action,
      getToppingCount: computed,
      getToppingTotalPrice: computed,
      setSize: action,
    });

    makePersistable(this, {
      name: "CustomOrderModel",
      properties: ["toppings"],
      expireIn: 3 * 24 * 60 * 60 * 1000,
      storage: window.localStorage,
    }).catch((error) =>
      console.error(
        "Failed to initialize persistence for CustomOrderModel:",
        error
      )
    );
  }
  addTopping(topping) {
    this.toppings = [...this.toppings, topping];
  }

  removeTopping(topping) {
    this.toppings = this.toppings.filter((t) => t !== topping);
  }

  clearToppings() {
    this.toppings = [];
  }

  get getToppingCount() {
    return this.toppings.length;
  }

  get getToppingTotalPrice() {
    return this.toppings.reduce((total, topping) => total + topping.price, 0);
  }

  setSize(size) {
    this.size = size;
  }
}

const customOrderModel = new CustomOrderModel();
export default customOrderModel;
