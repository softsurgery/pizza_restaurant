import { cn } from "../../lib/tailwind";
import PizzaCard from "./PizzaCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PizzaMenu({ className }) {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get("http://localhost:3000/pizzas");
        setPizzas(response.data);
        console.log(response.data[0].available);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
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
        {pizzas.map((pizza) => (
          <PizzaCard
            key={pizza._id}
            className={"mx-auto"}
            name={pizza.name}
            description={pizza.description}
            imageUrl={pizza.image}
            size={pizza.size} 
            price={pizza.price} 
            available={pizza.available} 
          />
        ))}
      </div>
    </div>
  );
}
