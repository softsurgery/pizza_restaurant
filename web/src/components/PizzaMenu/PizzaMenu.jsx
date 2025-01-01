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
    <div>
      <div className="prose border-b max-w-full mb-5">
        <h1>Our Pizza Menu</h1>
        <p className="mb-5">
          Indulge in our hand-crafted pizzas, made with the freshest ingredients
          and baked to perfection. From classic favorites to creative
          specialties, there's something for every pizza lover to enjoy.
          Discover your new favorite slice today!
        </p>
      </div>

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
