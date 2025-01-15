import { PizzaMenu } from "../components/PizzaMenu/PizzaMenu";
import { cn } from "../lib/tailwind";

export default function Menu({ className }) {
  return (
    <div className={cn("flex flex-1 flex-col overflow-hidden", className)}>
      <div className="prose border-b max-w-full mb-5">
        <h1>🛎️ Our Pizza Menu</h1>
        <p className="mb-5">
          Indulge in our hand-crafted pizzas, made with the freshest ingredients
          and baked to perfection. From classic favorites to creative
          specialties, there's something for every pizza lover to enjoy.
          Discover your new favorite slice today!
        </p>
      </div>
      <PizzaMenu />
    </div>
  );
}
