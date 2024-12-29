import React from "react";

export const PizzaContext = React.createContext({});

export const usePizzaContext = () => React.useContext(PizzaContext);
