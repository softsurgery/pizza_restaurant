import toast from "react-hot-toast";
import { cn } from "../../lib/tailwind";
import cartModel from "../../models/CartModel";
import { observer } from "mobx-react-lite";

export const PizzaCard = observer(({ className, pizza }) =>{

  const handleAddToCartClick = (size, quantity) => {
    cartModel.addPizza({
      id: pizza._id + size,
      label: pizza.name,
      image: pizza.image,
      priceOfSm: pizza.priceOfSm,
      priceOfMd: pizza.priceOfMd,
      priceOfLg: pizza.priceOfLg,
      quantity,
      size,
    });
    toast.success(`Pizza ${pizza.name} added successfully`);
  };

  return (
    <div className={cn("card bg-gray-800 w-80 shadow-xl", className)}>
      <div className="card-body">
        <h2 className="card-title">{pizza.name}</h2>
        <p>{pizza.description}</p>
      </div>
      <figure>
        <img src={pizza.image} alt={pizza.name} className="w-full h-60" />
      </figure>

      <button
        disabled={!pizza.availableOfSm}
        className="btn btn-outline btn-info mx-5 mt-5"
        onClick={() => handleAddToCartClick("Small", 1)}
      >
        <span className="text-xl">🛒</span> Small Size (
        {pizza.availableOfSm ? `${pizza.priceOfSm.toFixed(2)}$` : "Unavailable"}
        )
      </button>

      <button
        disabled={!pizza.availableOfMd}
        className="btn btn-outline btn-info mx-5 mt-5"
        onClick={() => handleAddToCartClick("Medium", 1)}
      >
        <span className="text-xl">🛒</span> Medium Size (
        {pizza.availableOfMd ? `${pizza.priceOfMd.toFixed(2)}$` : "Unavailable"}
        )
      </button>

      <button
        disabled={!pizza.availableOfLg}
        className="btn btn-outline btn-info mx-5 mt-5"
        onClick={() => handleAddToCartClick("Large", 1)}
      >
        <span className="text-xl">🛒</span> Large Size (
        {pizza.availableOfLg ? `${pizza.priceOfLg.toFixed(2)}$` : "Unavailable"}
        )
      </button>

      <div className="pb-2 text-sm mx-4 ">
        {/* <p className="text-gray-400">
          <span className="font-bold text-gray-200 text-lg">Price : </span>
          <span className="text-green-400">${pizza.price.toFixed(2)}</span>
        </p>
        <p className={pizza.available ? "text-green-400" : "text-red-400"}>
          <span className="font-bold text-gray-200 text-lg">Available : </span>{" "}
          {pizza.available ? "Yes" : "No"}
        </p> */}
      </div>
    </div>
  );
})
