import React from "react";
import { cn } from "../../lib/tailwind";
import { observer } from "mobx-react-lite";
import customOrderModel from "../../models/CustomOrderModel";
import toppingModel from "../../models/ToppingModel";
import { toast } from "react-hot-toast";
import cartModel from "../../models/CartModel";

export const OrderDetails = observer(
  ({ className, sizeOptions }) => {
    const totalPrice = React.useMemo(() => {
      const basePrice = sizeOptions[customOrderModel.size]?.basePrice || 0;

      const toppingsPrice = customOrderModel.toppings.reduce((acc, toppingName) => {

        const topping = toppingModel.toppings.find((t) => t?.name?.toUpperCase() === toppingName.toUpperCase());
        return acc + topping?.price;
      }, 0);

      return parseFloat(((basePrice + toppingsPrice * 100) / 100).toFixed(2));
    }, [customOrderModel.toppings, customOrderModel.size, toppingModel.toppings]);

    const handleAddToCartClick = (size, quantity) => {
     if (customOrderModel.toppings.length !== 0) {const index = cartModel.increaseCustomPizzaCounter();
      cartModel.addPizza({
        flag: "custom",
        id: index,
        label: `Custom Pizza ${index}`,
        image: "https://akleemans.github.io/random-pizza/assets/pizza.png",
        quantity,
        price: totalPrice,
        size,
        toppings: customOrderModel.toppings,
      });
      toast.success(`Pizza Custom Pizza ${index} added successfully`, {
        className: "bg-slate-800 text-white",
      });
      customOrderModel.clearToppings();}
      else {
        toast.error("Please select at least one topping");
      }
    };

    const randomCombo = () => {
      customOrderModel.clearToppings();
      const randomToppings = toppingModel.randomizeToppings();
      randomToppings.forEach((t) => customOrderModel.addTopping(t.name));
    }

    return (
      <section className={cn("flex flex-col gap-5 items-center mt-5", className)}>
        <div>
          <button className="btn btn-primary btn-outline text-lg" onClick={() => { handleAddToCartClick(customOrderModel.size, 1) }}>
            🍕 Order ({`$${totalPrice.toFixed(2)}`})
          </button>
        </div>
        <div>
          <button className="btn btn-primary btn-outline text-lg" onClick={randomCombo}>
            🍀 I feel lucky
          </button>
        </div>
      </section>
    );
  }
);
