import React from "react";
import { Pizza } from "./Pizza";
import { toppingOptions } from "./constants/topping-options";
import { sizeOptions } from "./constants/size-options";
import { OrderDetails } from "./OrderDetails";
import { PizzaOptions } from "./PizzaOptions";

const toppingPrice = 150;

export const PizzaBuilder = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="col-span-2 w-full flex flex-col gap-2">
        <div className="sm:px-6 md:px-12 lg:px-24">
          <Pizza toppingOptions={toppingOptions} className={"mt-4"} />
        </div>
        <OrderDetails
          sizeOptions={sizeOptions}
          toppingPrice={toppingPrice}
        />
      </div>
      <PizzaOptions
        className={"col-span-3"}
        sizeOptions={sizeOptions}
        toppingOptions={toppingOptions}
        toppingPrice={toppingPrice}
      />
    </div>
  );
};
