import { PizzaBuilder } from "../components/PizzaBuilder/PizzaBuilder";
import { cn } from "../lib/tailwind";

export default function CustomOrder({ className }) {
  return (
    <div className={cn("flex flex-col flex-1 overflow-hidden", className)}>
      <div className="prose border-b max-w-full">
        <h1>🔥 Custom Order</h1>
        <p className="mb-5">
          Indulge in our hand-crafted pizzas, made with the freshest ingredients
          and baked to perfection. From classic favorites to creative
          specialties, there's something for every pizza lover to enjoy.
          Discover your new favorite slice today!
        </p>
      </div>

      <PizzaBuilder className={"flex-1 overflow-auto p-4"} />
    </div>
  );
}
