import React from "react";
import { cn } from "../../lib/tailwind";
import { observer } from "mobx-react-lite";
import customOrderModel from "../../models/CustomOrderModel";

export const OrderDetails = observer(
  ({ className, sizeOptions, toppingPrice }) => {

    const totalPrice = React.useMemo(
      () =>
        parseFloat(
          (
            (sizeOptions[customOrderModel.size].basePrice +
              toppingPrice * customOrderModel.toppings.length) /
            100
          ).toFixed(2)
        ),
      [customOrderModel.size, customOrderModel.toppings]
    );

    return (
      <section className={cn("flex gap-5 justify-center", className)}>
        <div>
          <h3>Total Price</h3>
          <p>{`$${totalPrice.toFixed(2)}`}</p>

          <button className="btn" onClick={() => {}}>
            Order
          </button>
        </div>
      </section>
    );
  }
);
