import { cn } from "../lib/tailwind";

export default function PizzaCard({ className }) {
  return (
    <div className={cn("card bg-gray-800 w-80 shadow-xl", className)}>
      <div className="card-body">
        <h2 className="card-title">Pizza 4 Formages</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
      </div>
      <figure>
        <img
          src="https://www.foodandwine.com/thmb/BK0P-VpOvPowtz-okmiaS4kTqvI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg"
          alt="Shoes"
        />
      </figure>
      <button className="btn btn-outline btn-info m-5"><span className="text-xl">🛒</span> Add to cart</button>
    </div>
  );
}
