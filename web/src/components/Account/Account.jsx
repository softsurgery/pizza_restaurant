import React from "react";
import { toast } from "react-hot-toast";
import axios from "../../api/axios";
import { observer } from "mobx-react-lite";
import authModel from "../../models/AuthModel";

export const Account = observer(() => {
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

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/userDetails", {
        ...formData,
        // userId: "64b2f9d1234567890abcdef0", // Replace with the actual user ID
      });
      toast.success("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save data. Please try again.");
    }
  };

  return (
    <div className="container flex flex-col overflow-auto p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Personal details */}
        <div className="flex flex-col items-center justify-center shadow rounded-lg p-6 lg:w-1/4 bg-gray-800 h-fit">
          <h2 className="mt-4 text-lg font-bold text-center p-3">
            Your Account
          </h2>
          <div className="avatar">
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
          <button className="mt-2 btn btn-outline btn-primary">
            Share profile link
          </button>
          <button className="btn btn-link mt-2">
            Update profile visibility
          </button>
          <button className="btn btn-link mt-2" onClick={authModel.logout}>
            Sign-out
          </button>
        </div>

        {/* Personal information */}
        <div className="shadow rounded-lg overflow-hidden bg-gray-800 w-full lg:w-3/5">
          <div className="flex justify-center items-center">
            <div className="w-full max-w-3xl shadow-md rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Personal information</h2>
              <form
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                onSubmit={handleSubmit}
              >
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
                    <span className="label-text">Additional Phone Number</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="additionalPhoneNumber"
                      placeholder="Additional Phone Number"
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
                <div className="lg:col-span-2 flex justify-end">
                  <button className="btn btn-primary" type="submit">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
