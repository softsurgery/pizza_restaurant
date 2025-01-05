import { PizzaBuilder } from "../components/PizzaBuilder/PizzaBuilder";
import { cn } from "../lib/tailwind";

export default function CustomOrder({ className }) {
  return (
    <div>
      {/* <div className="prose border-b max-w-full mb-5 ">
        <h1>🔥 Custom Order</h1>
        <p className="mb-5">
          Indulge in our hand-crafted pizzas, made with the freshest ingredients
          and baked to perfection. From classic favorites to creative
          specialties, there's something for every pizza lover to enjoy.
          Discover your new favorite slice today!
        </p>
      </div> */}

      <div
        className={cn(
          className
        )}
      >
        <PizzaBuilder />
      </div>
    </div>
  );
}
