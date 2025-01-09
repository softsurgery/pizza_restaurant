import React, { useState } from "react";

const Checkout = ({cancel}) => {
  const [formData, setFormData] = useState({
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
  return (
    <div className="flex flex-1 flex-col overflow-auto items-center h-screen py-6">
      <div className="w-full max-w-3xl p-6 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Checkout</h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <div className="mt-2 space-y-2">
            <div className="flex justify-between border-b pb-2">
              <span>Pizza 1</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Pizza 2</span>
              <span>$15.00</span>
            </div>
            <div className="flex justify-between font-semibold pt-2">
              <span>Total</span>
              <span>$25.00</span>
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
};

export default Checkout;
