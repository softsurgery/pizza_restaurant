import React from "react";
import { observer } from "mobx-react-lite";
import cartModel from "../../models/CartModel";
import { capitalize } from "../../lib/string.utils";
import { useNavigate } from "react-router-dom";
import accountModel from "../../models/AccountModel";

const Checkout = observer(({ cancel }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onCheckoutClick = () => {
    const newErrors = {};
    cartModel.clearPizzas();
    navigate("/app/payment-is-confirming");
  };

  return (
    <div className="flex flex-1 flex-col overflow-auto items-center h-screen py-6">
      <div className="w-full max-w-4xl p-6 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Checkout</h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <div className="mt-2 space-y-2">
            {cartModel.pizzas.map((p) => {
              const unitPrice =
                p.flag === "custom"
                  ? p.price
                  : p.size === "Small"
                  ? p.priceOfSm
                  : p.size === "Medium"
                  ? p.priceOfMd
                  : p.priceOfLg;
              const totalPrice = unitPrice * p.quantity;
              return (
                <div className="flex justify-between border-b pb-2">
                  <span>
                    {p.quantity} x {p.label}
                    {p.flag === "custom" && (
                      <div>
                        (
                        {p.toppings.map((t) => (
                          <p className="inline mx-1 italic">{capitalize(t)}</p>
                        ))}
                        )
                      </div>
                    )}{" "}
                    ({p.size})
                  </span>
                  <span>{totalPrice.toFixed(2)} $</span>
                </div>
              );
            })}
            <div className="flex justify-between font-semibold pt-2">
              <span>Total</span>
              <span>{cartModel.getTotalPrice.toFixed(2)} $</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold">Payment Details</h2>
          <form className="mt-4 space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Cardholder Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="John Doe"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Card Number</span>
              </label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="flex space-x-4">
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text">Expiry Date</span>
                </label>
                <input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="MM/YY"
                />
              </div>
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text">CVV</span>
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="123"
                />
              </div>
            </div>
          </form>
        </div>

        <button
          className="btn btn-primary text-white w-full mt-4"
          onClick={onCheckoutClick}
        >
          Complete Payment
        </button>
        <button
          className="btn btn-error btn-outline text-white w-full mt-4"
          onClick={cancel}
        >
          Cancel Checkout
        </button>
      </div>
    </div>
  );
});

export default Checkout;
