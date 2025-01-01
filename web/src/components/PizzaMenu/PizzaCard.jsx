import { cn } from "../../lib/tailwind";
import cartModel from "../../models/CartModel";

export default function PizzaCard({
  className,
  name,
  description,
  imageUrl,
  size,
  price,
  available,
}) {
  const handleAddToCartClick = () => {
    cartModel.addPizza({
      name,
      imageUrl,
      size,
      price
    })
  }

  return (
    <div className={cn("card bg-gray-800 w-80 shadow-xl", className)}>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
      </div>
      <figure>
        <img src={imageUrl} alt={name} />
      </figure>
      <button className="btn btn-outline btn-info m-5" onClick={handleAddToCartClick}>
        <span className="text-xl">🛒</span> Add to cart
      </button>
      <div className="p-4 text-sm mx-5">
        <p className="text-gray-400 text-lg">
          <span className="font-bold text-gray-200">Size : </span> {size}
        </p>
        <p className="text-gray-400">
          <span className="font-bold text-gray-200 text-lg">Price : </span>
          <span className="text-green-400">${price.toFixed(2)}</span>
        </p>
        <p className={available ? "text-green-400" : "text-red-400"}>
          <span className="font-bold text-gray-200 text-lg">Available : </span>{" "}
          {available ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
}
