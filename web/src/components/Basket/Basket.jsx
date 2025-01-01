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
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartModel.pizzas.map((p, index) => (
            <tr key={index}>
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
                        src={p.imageUrl}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
              {/* Name */}
              <td>{p.name}</td>
              {/* Size */}
              <td>{p.size}</td>
              {/* Price */}
              <td>{p.price} $</td>
              {/* Quantity */}
              <td className="flex gap-10">
                <button className="btn btn-outline" onClick={() => cartModel.removePizza(index)}>-</button>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-ghost w-24"
                />
                <button className="btn btn-outline" onClick={() => cartModel.removePizza(index)}>+</button>
              </td>
              {/* Action */}
              <td>
                <button className="btn btn-outline" onClick={() => cartModel.removePizza(index)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        {/* foot */}
      </table>
    </div>
  );
});

export default Basket;
