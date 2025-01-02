import React from "react";

const Account = () => {
  return (
    <div className="container flex flex-1 flex-col overflow-auto p-6">
      <div className="flex flex-col lg:flex-row gap-8 ">
        {/* Personl details*/}
        <div className="flex flex-col items-center justify-center  shadow rounded-lg p-6 lg:w-1/4 bg-gray-800 h-fit">
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
          <h2 className="mt-4 text-lg font-bold text-center">Username</h2>
          <button className="mt-2 btn btn-outline btn-primary">
            Share profile link
          </button>
          <button className="btn btn-link  mt-2">
            Update profile visibility
          </button>
        </div>

        {/* Personal information */}
        <div className="shadow rounded-lg overflow-hidden bg-gray-800">
          <div className="flex justify-center items-center overflow-hidden">
            <div className="w-full max-w-3xl shadow-md rounded-lg p-8 overflow-hidden">
              <h2 className="text-2xl font-bold mb-6">Personal information</h2>
              <form className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">First name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className="input input-bordered"
                    defaultValue=""
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Last name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    className="input input-bordered"
                    defaultValue=""
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Phone Number</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Préfixe"
                      className="input input-bordered w-20"
                      defaultValue="+212"
                    />
                    <input
                      type="text"
                      placeholder="Phone Number"
                      className="input input-bordered flex-1"
                      defaultValue=""
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
                      placeholder="Préfixe"
                      className="input input-bordered w-20"
                      defaultValue="+212"
                    />
                    <input
                      type="text"
                      placeholder="Additional Phone Number"
                      className="input input-bordered flex-1"
                    />
                  </div>
                </div>
                <div className="form-control lg:col-span-2">
                  <label className="label">
                    <span className="label-text">Adresse</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Region</span>
                  </label>
                  <select className="select select-bordered">
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
                  <select className="select select-bordered">
                    <option>Tunis</option>
                    <option>Bizerte</option>
                    <option>Sousse</option>
                  </select>
                </div>
                <div className="lg:col-span-2 flex justify-end ">
                  <button className="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
