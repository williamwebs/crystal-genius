"use client";

import React, { useState } from "react";
import ProfileForm from "../../../components/admin/ProfileForm";

const Settings = () => {
  return (
    <div className="space-y-8 mt-4">
      <ProfileForm />
      {/* <div className="font-nunito font-medium py-4">
        <h2 className="text-FCFAFA text-lg mb-6">Settings</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="border border-D6D6D6/20 rounded-[6px] p-6 bg-[#555555]">
            <h3 className="text-white text-md mb-4 border-b border-white/20 pb-2">Profile Information</h3>
            <form onSubmit={handleUpdateProfile} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[13px] text-D6D6D6 block">Admin Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-10 bg-transparent border border-D6D6D6/30 rounded-[4px] px-3 text-[13px] text-FCFAFA focus:outline-none focus:border-D6D6D6/60 transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] text-D6D6D6 block">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full h-10 bg-dark/50 border border-D6D6D6/10 rounded-[4px] px-3 text-[13px] text-gray-500 cursor-not-allowed"
                />
                <p className="text-[11px] text-gray-400">Email address cannot be changed.</p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-[139px] h-10 flex items-center justify-center rounded-[6px] bg-red text-white text-[13px] hover:bg-red/80 transition-colors border border-red"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>

          <div className="border border-D6D6D6/20 rounded-[6px] p-6 bg-[#555555]">
            <h3 className="text-white text-md mb-4 border-b border-white/20 pb-2">Security</h3>
            <form onSubmit={handleUpdatePassword} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[13px] text-D6D6D6 block">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full h-10 bg-transparent border border-D6D6D6/30 rounded-[4px] px-3 text-[13px] text-FCFAFA focus:outline-none focus:border-D6D6D6/60 transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] text-D6D6D6 block">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full h-10 bg-transparent border border-D6D6D6/30 rounded-[4px] px-3 text-[13px] text-FCFAFA focus:outline-none focus:border-D6D6D6/60 transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] text-D6D6D6 block">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full h-10 bg-transparent border border-D6D6D6/30 rounded-[4px] px-3 text-[13px] text-FCFAFA focus:outline-none focus:border-D6D6D6/60 transition-colors"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-[139px] h-10 flex items-center justify-center rounded-[6px] bg-red text-white text-[13px] hover:bg-red/80 transition-colors border border-red"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Settings;
