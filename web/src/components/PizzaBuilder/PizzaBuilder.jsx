import React from "react";
import { usePizzaContext } from "./PizzaContext";
import { Pizza } from "./Pizza";
import { toppingOptions } from "./constants/topping-options";
import { sizeOptions } from "./constants/size-options";
import { discountCodes } from "./constants/discount-codes";
import { OrderDetails } from "./OrderDetails";
import { PizzaProvider } from "./PizzaProvider";
import { PizzaOptions } from "./PizzaOptions";

const toppingPrice = 150;

export const PizzaBuilder = () => {
  const { orderConfirmed, setOrderConfirmed } = usePizzaContext();

  React.useEffect(() => {
    if (orderConfirmed) {
      setOrderConfirmed(false);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);
  return (
    <PizzaProvider>
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="col-span-2 w-full flex flex-col gap-2">
          <div className="sm:px-6 md:px-12 lg:px-24">
            <Pizza toppingOptions={toppingOptions} className={"mt-4"} />
          </div>
          <OrderDetails
            discountCodes={discountCodes}
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
    </PizzaProvider>
  );
};
