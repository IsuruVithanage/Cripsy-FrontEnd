"use client";
import React, { useEffect, useState } from "react";
import { getCustomerDetails, updateCustomer } from "@/apis/customerAPIs/customerAPI";
import CustomButton from "@/components/Button/CustomButton";
import {showToast} from "@/components/Messages/showMessage";
import {getUserID} from "@/utils/tokenUtils";


export const CreateProfileSection = () => {
  const [profile, setProfile] = useState({
    userName: "",
    email: "",
    contact: "",
    address: "",
    district: "",
  });

  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch customer details
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        setLoading(true);
        const data = await getCustomerDetails(getUserID());
        setProfile(data);
      } catch (err) {
        setError("Failed to fetch customer details. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, []);

  // Update customer details
  const updateProfile = async () => {
    try {
      setLoading(true);
      await updateCustomer(getUserID(), profile);
      showToast({
        type: 'success',
        message: 'Profile Updated successfully!',
        description: 'Your profile has been added to the database.',
      })
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
      <div className="w-full">
        <h6 className="text-1xl text-gray-400">Account / My Profile</h6>
        <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">My Profile</h2>
          </div>

          <form className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-carnation-400">
                First Name
              </label>
              <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={profile.userName}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md placeholder-gray-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-carnation-400">
                Email
              </label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md placeholder-gray-500"
              />
            </div>
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-carnation-400">
                Contact No
              </label>
              <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={profile.contact}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md placeholder-gray-500"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-carnation-400">
                Address
              </label>
              <input
                  type="text"
                  id="address"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md placeholder-gray-500"
              />
            </div>
            <div>
              <label htmlFor="district" className="block text-sm font-medium text-carnation-400">
                District
              </label>
              <input
                  type="text"
                  id="district"
                  name="district"
                  value={profile.district}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md placeholder-gray-500"
              />
            </div>
          </form>

          <div className="mt-3"></div>
          <CustomButton buttonLabel="Update" onClick={updateProfile} variant={"primary"} />
        </div>
      </div>
  );
};
