import { observer } from "mobx-react-lite";
import React from "react";
import cartModel from "../../models/CartModel";
import toast from "react-hot-toast";

const Basket = observer(() => {
  const handleRemoveFromCartClick = (pizza) => {
    cartModel.removePizza(pizza.id);
    toast.success(`Pizza ${pizza.label} (${pizza.size}) Removed successfully`, {
      className: "bg-slate-800 text-white",
    });
  };

  return (
    <div className="overflow-x-auto">
      <div className="prose border-b max-w-full mb-5">
        <h1>🛒 Cart</h1>
        <p className="mb-5">
          The Cart is where you can view and manage the items you&apos;ve
          selected for purchase. It provides a clear summary of your chosen
          products and lets you make adjustments before checking out.
        </p>
      </div>
      <table className="table">
        {/* head */}
        <thead>
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
                      <div className="mask rounded-lg h-24 w-24">
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
        {/* foot */}
      </table>
      {/* Total Section */}
      <div className="prose my-5 max-w-full text-right ">
        <h2>Total</h2>
        <p>
          Grand Total: <strong>{cartModel.getTotalPrice.toFixed(2)} $</strong>
        </p>
        <button className="btn btn-primary mt-3">Proceed to Checkout</button>
      </div>
    </div>
  );
});

export default Basket;
