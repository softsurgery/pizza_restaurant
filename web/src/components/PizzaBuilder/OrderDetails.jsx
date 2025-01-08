import React from "react";
import { cn } from "../../lib/tailwind";
import { observer } from "mobx-react-lite";
import customOrderModel from "../../models/CustomOrderModel";
import toppingModel from "../../models/ToppingModel";

export const OrderDetails = observer(
  ({ className, sizeOptions }) => {
    const totalPrice = React.useMemo(() => {
      const basePrice = sizeOptions[customOrderModel.size]?.basePrice || 0;

      const toppingsPrice = customOrderModel.toppings.reduce((acc, toppingName) => {
        
        const topping = toppingModel.toppings.find((t) => t?.name?.toUpperCase() === toppingName.toUpperCase());
        console.log(toppingName)
        console.log(topping?.price)
        return acc + topping?.price;
      }, 0);

      return parseFloat(((basePrice + toppingsPrice*100)/100).toFixed(2));
    }, [customOrderModel.toppings,customOrderModel.size, toppingModel.toppings]);

    return (
      <section className={cn("flex gap-5 justify-center mt-5", className)}>
        <div>
          <button className="btn btn-primary btn-outline text-lg" onClick={() => { }}>
            🍕 Order ({`$${totalPrice.toFixed(2)}`})
          </button>
        </div>
      </section>
    );
  }
);
