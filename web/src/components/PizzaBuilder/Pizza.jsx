import React from "react";
import { PizzaTopping } from "./PizzaTopping";
import { cn } from "../../lib/tailwind";
import { observer } from "mobx-react-lite";
import customOrderModel from "../../models/CustomOrderModel";

export const Pizza = observer(({ className, toppingOptions }) => {

  return (
    <div>
      <div className={cn("pizza__pie", className)}>
        {customOrderModel.toppings.map((topping) => (
          <PizzaTopping
            key={topping}
            topping={topping}
            toppingAmount={toppingOptions[topping].amount}
          />
        ))}
      </div>
    </div>
  );
});
