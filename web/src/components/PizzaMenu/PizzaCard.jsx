import { cn } from "../../lib/tailwind";
import cartModel from "../../models/CartModel";

export default function PizzaCard({ className, pizza }) {
  const handleAddToCartClick = (size, quantity) => {
    cartModel.addPizza({
      id: pizza._id,
      label: pizza.name,
      image: pizza.image,
      price: pizza.price,
      quantity,
      size,
    });
  };
  console.log(pizza);
  return (
    <div className={cn("card bg-gray-800 w-80 shadow-xl", className)}>
      <div className="card-body">
        <h2 className="card-title">{pizza.name}</h2>
        <p>{pizza.description}</p>
      </div>
      <figure>
        <img src={pizza.image} alt={pizza.name} />
      </figure>
      <button
        className="btn btn-outline btn-info m-5"
        onClick={() => handleAddToCartClick("small", 1)}
      >
        <span className="text-xl">🛒</span> Add to cart
      </button>
      <div className="p-4 text-sm mx-5">
        <p className="text-gray-400 text-lg">
          <span className="font-bold text-gray-200">Size : </span> {pizza.size}
        </p>
        <p className="text-gray-400">
          <span className="font-bold text-gray-200 text-lg">Price : </span>
          <span className="text-green-400">${pizza.price.toFixed(2)}</span>
        </p>
        <p className={pizza.available ? "text-green-400" : "text-red-400"}>
          <span className="font-bold text-gray-200 text-lg">Available : </span>{" "}
          {pizza.available ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
}
