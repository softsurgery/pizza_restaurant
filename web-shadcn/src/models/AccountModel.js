import { action, makeObservable, observable, runInAction } from "mobx";
import axios from "../api/axios";
import authModel from "./AuthModel";
import { makePersistable } from "mobx-persist-store";

class AccountModel {
  username = "";
  picture = null;
  firstName = "";
  lastName = "";
  phoneNumber = "";
  address = "";

  constructor() {
    makeObservable(this, {
      // States
      firstName: observable,
      lastName: observable,
      phoneNumber: observable,
      address: observable,
      // Methods
      set: action,
      fetchOrCreateUserDetails: action,
      createOrUpdateUserDetails: action,
    });
    makePersistable(this, {
      name: "AccountModel",
      properties: ["firstName", "lastName", "phoneNumber", "address"],
      expireIn: 3 * 24 * 60 * 60 * 1000, // Expiration in milliseconds (3 days)
      storage: window.localStorage, // Use localStorage for persistence
    }).catch((error) =>
      console.error("Failed to initialize persistence for AuthModel:", error)
    );
  }

  set(name, value) {
    this[name] = value;
  }

  async fetchOrCreateUserDetails() {
    const userId = authModel.user._id;
    try {
      const response = await axios.get(`/userDetails/${userId}`);
      if (response.data) {
        runInAction(() => {
          this.set("firstName", response.data.firstName);
          this.set("lastName", response.data.lastName);
          this.set("phoneNumber", response.data.phoneNumber);
          this.set("address", response.data.address);
        });
      }
    } catch (error) {
      console.error("Error fetching user details:", error.message);
    }
  }

  async createOrUpdateUserDetails() {
    const userId = authModel.user._id;
    const userDetails = {
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      address: this.address,
      region: this.region,
      city: this.city,
      userId,
    };

    try {
      // Check if user details already exist
      const response = await axios.get(`/userDetails/${userId}`);
      if (response.data) {
        console.log("im here", userId);
        // Update existing user details
        const updatedDetails = await axios.put(
          `/userDetails/${userId}`,
          userDetails
        );
        runInAction(() => {
          // Update MobX state
          this.set("firstName", updatedDetails.data.firstName);
          this.set("lastName", updatedDetails.data.lastName);
          this.set("phoneNumber", updatedDetails.data.phoneNumber);
          this.set("address", updatedDetails.data.address);
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Create new user details if not found
        const createdDetails = await axios.post(`/userDetails`, {
          ...userDetails,
          userId,
        });
        runInAction(() => {
          // Update MobX state
          this.set("firstName", createdDetails.data.firstName);
          this.set("lastName", createdDetails.data.lastName);
          this.set("phoneNumber", createdDetails.data.phoneNumber);
          this.set("address", createdDetails.data.address);
        });
      } else {
        console.error(
          "Error while creating/updating user details:",
          error.message
        );
        throw error;
      }
    }
  }
}

const accountModel = new AccountModel();
export default accountModel;
