import React from "react";
import { usePizzaContext } from "./PizzaContext";
import { PizzaTopping } from "./PizzaTopping";
import { cn } from "../../lib/tailwind";

export const Pizza = ({ className, toppingOptions }) => {
  const { selectedToppings } = usePizzaContext();

  return (
    <div>
      <div className={cn("pizza__pie", className)}>
        {selectedToppings.map((topping) => (
          <PizzaTopping
            key={topping}
            topping={topping}
            toppingAmount={toppingOptions[topping].amount}
          />
        ))}
      </div>
    </div>
  );
};
