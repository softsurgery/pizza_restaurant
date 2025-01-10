import React from "react";
import { toast } from "react-hot-toast";
import axios from "../../api/axios";
import { observer } from "mobx-react-lite";
import authModel from "../../models/AuthModel";

export const AccountDetails = observer(() => {
  const [user, setUser] = React.useState({
    username: "username",
    email: "email",
  });

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    phoneNumber: "+216",
    additionalPhoneNumber: "+216",
    address: "",
    region: "Tunis",
    city: "Tunis",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/userDetails", {
        ...formData,
      });
      toast.success("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save data. Please try again.");
    }
  };

  return (
    <div className="container flex flex-col overflow-auto p-6">
      <div className="flex flex-col xl:flex-row gap-8">

        {/* Personal details */}
        <div className="flex flex-col items-center justify-center shadow rounded-lg p-6 xl:w-1/4 bg-gray-800 h-fit">
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
            {user.username || "John Doe"}
          </h2>
          <h2 className="mt-4 text-lg font-bold text-center">
            {user.email || "john@gmail.com"}
          </h2>
          <button className="btn btn-link mt-2" onClick={() => authModel.logout()}>
            Sign-out
          </button>
        </div>

        {/* Personal information */}
        <div className="shadow rounded-lg overflow-hidden bg-gray-800 w-full lg:w-3/4">
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
                    value={formData.firstName}
                    onChange={handleChange}
                  />
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
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Phone Number</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      className="input input-bordered flex-1"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">E-mail</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="E-mail"
                      className="input input-bordered flex-1"
                      value={formData.additionalPhoneNumber}
                      onChange={handleChange}
                    />
                  </div>
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
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Region</span>
                  </label>
                  <select
                    name="region"
                    className="select select-bordered"
                    value={formData.region}
                    onChange={handleChange}
                  >
                    <option>Tunis</option>
                    <option>Bizerte</option>
                    <option>Sousse</option>
                  </select>
                </div>
                {/* City */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">City</span>
                  </label>
                  <select
                    name="city"
                    className="select select-bordered"
                    value={formData.city}
                    onChange={handleChange}
                  >
                    <option>Tunis</option>
                    <option>Bizerte</option>
                    <option>Sousse</option>
                  </select>
                </div>

              </div>
              <div className="flex gap-2 justify-end mt-10">
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
                <button className="btn btn-primary btn-outline" type="submit">
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
