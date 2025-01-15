import React from "react";
import { Pizza } from "./Pizza";
import { toppingOptions } from "./constants/topping-options";
import { sizeOptions } from "./constants/size-options";
import { OrderDetails } from "./OrderDetails";
import { PizzaOptions } from "./PizzaOptions";
import { cn } from "../../lib/tailwind";

export const PizzaBuilder = ({ className }) => {
  return (
    <div className={cn("flex flex-col xl:flex-row items-center xl:items-start", className)}>
      <div className="xl:w-1/2 flex flex-col gap-2 mx-10">
        <div className="mx-10">
          <Pizza toppingOptions={toppingOptions} />
        </div>
        <OrderDetails
          sizeOptions={sizeOptions}
        />
      </div>
      <PizzaOptions
        sizeOptions={sizeOptions}
        toppingOptions={toppingOptions}
      />
    </div>
  );
};
