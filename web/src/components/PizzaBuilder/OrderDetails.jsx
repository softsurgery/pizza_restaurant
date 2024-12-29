import { useNavigate } from "react-router-dom";
import { usePizzaContext } from "./PizzaContext";
import React from "react";
import { cn } from "../../lib/tailwind";

export const OrderDetails = ({
  className,
  discountCodes,
  sizeOptions,
  toppingPrice,
}) => {
  const {
    selectedSize,
    selectedToppings,
    discountCode,
    setDiscountCode,
    discountApplied,
    setDiscountApplied,
    orderConfirmed,
    setOrderConfirmed,
  } = usePizzaContext();

  const navigate = useNavigate();

  const discountValid = React.useMemo(
    () => Object.keys(discountCodes).includes(discountCode),
    [discountCode]
  );

  const totalPrice = React.useMemo(
    () =>
      parseFloat(
        (
          (sizeOptions[selectedSize].basePrice +
            toppingPrice * selectedToppings.length) /
          100
        ).toFixed(2)
      ),
    [selectedSize, selectedToppings]
  );

  const handleDiscountInput = (value) => {
    setDiscountCode(value.trim().toLowerCase());

    if (discountApplied) {
      setDiscountApplied(false);
    }
  };

  const handleDiscountEnter = (e) => {
    if (e.key === "Enter") {
      setDiscountApplied(true);
    }
  };

  const handleOrderConfirm = () => {
    setOrderConfirmed(true);

    navigate("/confirmation");
  };

  return (
    <section className={cn("flex gap-5 justify-center", className)} >
     
      <div>
        <h3>Total Price</h3>
        <p>
          {discountApplied && discountValid ? (
            <>
              <ins>
                $
                {(
                  totalPrice -
                  totalPrice * (discountCodes[discountCode] / 100)
                ).toFixed(2)}
              </ins>
              <del>${totalPrice.toFixed(2)}</del>
            </>
          ) : (
            `$${totalPrice.toFixed(2)}`
          )}
        </p>
        {!orderConfirmed && (
          <button
            className="btn"
            onClick={handleOrderConfirm}
          >
            Order
          </button>
        )}
      </div>
    </section>
  );
};
