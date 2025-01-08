import React from "react";
import { observer } from "mobx-react-lite";
import { cn } from "../../lib/tailwind";
import { PizzaCard } from "./PizzaCard";
import pizzaModel from "../../models/PizzaModel";

export const PizzaMenu = observer(({ className }) => {
  React.useEffect(() => {
    pizzaModel.fetchPizzas();
  }, []);

  if (pizzaModel.loading) {
    return <p>Loading...</p>;
  }

  if (pizzaModel.error) {
    return <p className="text-red-500">Error: {pizzaModel.error}</p>;
  }
  return (
    <div className="flex flex-1 flex-col overflow-auto pb-5">
      <div
        className={cn(
          "grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
          className
        )}
      >
        {pizzaModel.pizzas.length !== 0 ? (
          pizzaModel.pizzas.map((pizza) => (
            <PizzaCard key={pizza._id} className={"mx-auto"} pizza={pizza} />
          ))
        ) : (
          <h1>No Pizza Found</h1>
        )}
      </div>
    </div>
  );
});
