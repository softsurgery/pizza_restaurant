import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import authModel from "../../models/AuthModel";
import accountModel from "../../models/AccountModel";
import {toast} from "react-hot-toast";

export const AccountDetails = observer(() => {
  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    accountModel.fetchOrCreateUserDetails(authModel.userId);
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!accountModel.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    if (!accountModel.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }
    if (!accountModel.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^\d{8,15}$/.test(accountModel.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 8-15 digits.";
    }
    if (!authModel.user.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(authModel.user.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!accountModel.address.trim()) {
      newErrors.address = "Address is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // No errors means the form is valid
  };

  const handleSave = async () => {
    if (validate()) {
      try {
        await accountModel.createOrUpdateUserDetails();
        await authModel.updateEmail()
        toast.success("Details saved successfully.");
      } catch (error) {
        console.error("Failed to save user details:", error);
        toast.error("An error occurred while saving details.");
      }
    }
  };

  const handleReset = () => {
    accountModel.fetchOrCreateUserDetails();
    setErrors({});
  };

  return (
    <div className="flex flex-col overflow-auto p-6">
      <div className="flex flex-col xl:flex-row gap-8">
        {/* Personal details */}
        <div className="flex flex-col items-center justify-center p-6 w-fit px-24 xl:w-1/4 h-fit mx-auto">
          <h2 className="text-2xl font-bold my-2">Account</h2>
          <div className="avatar mt-4">
            <div className="w-24 rounded-full">
              <img
                src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2484"
                alt="Profile"
              />
            </div>
          </div>
          <h2 className="mt-4 text-lg font-bold text-center">
            {authModel.user.username}
          </h2>
          <h2 className="mt-4 text-lg font-bold text-center">
            {authModel.user.email || "john@gmail.com"}
          </h2>
          <button className="btn btn-link mt-2" onClick={() => authModel.logout()}>
            Sign-out
          </button>
        </div>

        {/* Personal information */}
        <div className="shadow rounded-lg bg-gray-800 w-full xl:w-3/4">
          <div className="flex justify-center items-center">
            <div className="w-full shadow-md rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Personal information</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-10">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">First name</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    className="input input-bordered"
                    value={accountModel.firstName}
                    onChange={(e) => accountModel.set("firstName", e.target.value)}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Last name</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    className="input input-bordered"
                    value={accountModel.lastName}
                    onChange={(e) => accountModel.set("lastName", e.target.value)}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Phone Number</span>
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className="input input-bordered"
                    value={accountModel.phoneNumber}
                    onChange={(e) => accountModel.set("phoneNumber", e.target.value)}
                  />
                  {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">E-mail</span>
                  </label>
                  <input
                    type="email"
                    placeholder="E-mail"
                    className="input input-bordered"
                    value={authModel.email}
                    onChange={(e) => authModel.set("email", e.target.value)}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className="form-control lg:col-span-2">
                  <label className="label">
                    <span className="label-text">Address</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter your address"
                    className="input input-bordered"
                    value={accountModel.address}
                    onChange={(e) => accountModel.set("address", e.target.value)}
                  />
                  {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                </div>
              </div>
              <div className="flex gap-2 justify-end mt-10">
                <button className="btn btn-primary" onClick={handleSave}>
                  Save
                </button>
                <button className="btn btn-primary btn-outline" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
