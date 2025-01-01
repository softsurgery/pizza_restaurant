import { observer } from "mobx-react-lite";
import React from "react";
import cartModel from "../../models/CartModel";

const Basket = observer(() => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
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
            const unitPrice = p.size === "Small" ? p.priceOfSm : p.size === "Medium" ? p.priceOfMd : p.priceOfLg;
            const totalPrice = unitPrice * p.quantity;
            return (
              <tr key={p.id}>
                {/* Checkbox */}
                <td>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </td>
                {/* Image */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={p.image}
                          alt="Avatar Tailwind CSS Component"
                        />
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
                <td className="flex gap-10 justify-center">
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
                </td>
                {/* Total Price */}
                <td>{totalPrice.toFixed(2)} $</td>
                {/* Action */}
                <td>
                  <button
                    className="btn btn-outline"
                    onClick={() => cartModel.removePizza(p.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        {/* foot */}
      </table>
    </div>
  );
});

export default Basket;
