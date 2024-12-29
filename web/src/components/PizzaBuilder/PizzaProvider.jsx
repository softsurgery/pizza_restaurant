import React from "react";
import { PizzaContext } from "./PizzaContext";

export const PizzaProvider = ({ children }) => {
  const [selectedSize, setSelectedSize] = React.useState("large");
  const [selectedToppings, setSelectedToppings] = React.useState([]);
  const [discountCode, setDiscountCode] = React.useState("");
  const [orderConfirmed, setOrderConfirmed] = React.useState(false);
  const [discountApplied, setDiscountApplied] = React.useState(false);

  return (
    <PizzaContext.Provider
      value={{
        selectedSize,
        setSelectedSize,
        selectedToppings,
        setSelectedToppings,
        discountCode,
        setDiscountCode,
        discountApplied,
        setDiscountApplied,
        orderConfirmed,
        setOrderConfirmed,
      }}
    >
      {children}
    </PizzaContext.Provider>
  );
};
