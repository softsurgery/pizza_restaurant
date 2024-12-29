import { cn } from "../../lib/tailwind";
import PizzaCard from "./PizzaCard";

export default function PizzaMenu({ className }) {
  const _array = Array.from({ length: 10 }, (_, index) => index);
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
        {_array.map((_, index) => (
          <PizzaCard key={index} className={"mx-auto"} />
        ))}
      </div>
    </div>
  );
}
