import { observer } from "mobx-react-lite";
import React from "react";
import cartModel from "../../models/CartModel";
import toast from "react-hot-toast";
import Checkout from "../Checkout/Checkout";

const Basket = observer(() => {
  const [showCheckout, setShowCheckout] = React.useState(false);

  const handleRemoveFromCartClick = (pizza) => {
    cartModel.removePizza(pizza.id);
    toast.success(`Pizza ${pizza.label} (${pizza.size}) Removed successfully`, {
      className: "bg-slate-800 text-white",
    });
  };

  const handleButtonClick = () => {
    setShowCheckout(true);
  };

  if (showCheckout) {
    // Render the Checkout component as the full-page content
    return <Checkout />;
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="prose border-b max-w-full">
        <h1>🛒 Cart</h1>
        <p className="mb-5">
          The Cart is where you can view and manage the items you&apos;ve
          selected for purchase. It provides a clear summary of your chosen
          products and lets you make adjustments before checking out.
        </p>
      </div>
      <div className="flex flex-1 flex-col overflow-auto">
        <table className="table">
          {/* head */}
          <thead className="sticky top-0 bg-slate-800 z-10 rounded-xl">
            <tr>
              <th></th>
              <th>Label</th>
              <th>Size </th>
              <th>Unit Price</th>
              <th className="text-center">Quantity</th>
              <th>Total Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartModel.pizzas.map((p) => {
              const unitPrice =
                p.size === "Small"
                  ? p.priceOfSm
                  : p.size === "Medium"
                  ? p.priceOfMd
                  : p.priceOfLg;
              const totalPrice = unitPrice * p.quantity;
              return (
                <tr key={p.id}>
                  {/* Image */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask rounded-lg h-16 w-16">
                          <img src={p.image} alt={p.label} />
                        </div>
                      </div>
                    </div>
                  </td>
                  {/* Name */}
                  <td>{p.label}</td>
                  {/* Size */}
                  <td>{p.size}</td>
                  {/* Price */}
                  <td>{unitPrice.toFixed(2)} $</td>
                  {/* Quantity */}
                  <td>
                    <div className="flex flex-row gap-5 justify-center">
                      <button
                        className="btn btn-outline"
                        onClick={() => cartModel.decreasePizza(p.id)}
                      >
                        -
                      </button>
                      <input
                        disabled
                        placeholder="0"
                        className="input input-ghost w-24 text-center"
                        value={p.quantity}
                      />
                      <button
                        className="btn btn-outline"
                        onClick={() => cartModel.increasePizza(p.id)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  {/* Total Price */}
                  <td>{totalPrice.toFixed(2)} $</td>
                  {/* Action */}
                  <td>
                    <button
                      className="btn btn-outline btn-error"
                      onClick={() => handleRemoveFromCartClick(p)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Total Section */}
      <div className="my-5 flex flex-col justify-end items-center gap-2">
        <p>
          Total: <strong>{cartModel.getTotalPrice.toFixed(2)} $</strong>
        </p>
        <button className="btn btn-primary mt-3" onClick={handleButtonClick}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
});

export default Basket;
