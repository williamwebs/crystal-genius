"use client";

import React, { useEffect, useState } from "react";
import {
  CloseXIcon,
  NotificationIcon,
} from "../../constants/images";
import { useRouter } from "next/navigation";
import FormInput from "./FormInput";
import { supabase } from "../../lib/supabase";
import toast from "react-hot-toast";

const ProfileForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    email_on_new_order: true,
    email_on_contact_message: true,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: settings } = await supabase
        .from("admin_settings")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      setFormData({
        fullName: user.user_metadata?.full_name || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
        email_on_new_order: settings?.email_on_new_order ?? true,
        email_on_contact_message: settings?.email_on_contact_message ?? true,
      });
    } catch (error) {
      console.error("Failed to load profile", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const field = e.currentTarget;
    const value =
      field instanceof HTMLInputElement && field.type === "checkbox"
        ? field.checked
        : field.value;

    setFormData({ ...formData, [field.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (formData.password && formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Update Auth Profile
      const updateData: any = {
        data: { full_name: formData.fullName }
      };
      
      if (formData.password) {
        updateData.password = formData.password;
      }

      const { error: authError } = await supabase.auth.updateUser(updateData);
      if (authError) throw authError;

      const settingsResponse = await fetch("/api/admin/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_on_new_order: formData.email_on_new_order,
          email_on_contact_message: formData.email_on_contact_message,
        }),
      });

      const settingsResult = await settingsResponse.json();

      if (!settingsResponse.ok) {
        throw new Error(settingsResult.error || "Failed to save settings");
      }

      toast.success("Profile updated successfully");
      
      // Clear password fields
      setFormData(prev => ({ ...prev, password: "", confirmPassword: "" }));
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-D6D6D6">Loading profile...</div>;
  }

  return (
    <div className="font-nunito font-medium py-4">
      <div className="border border-D6D6D6/20 rounded-[6px] p-2 w-full bg-[#555555]">
        {/* Header */}
        <header className="flex items-center justify-between py-4 px-2 border-b border-D6D6D6/30">
          <h2 className="text-FCFAFA">Admin Profile</h2>
          <button
            type="button"
            onClick={() => router.back()}
            className="hover:opacity-80 transition-opacity text-D6D6D6"
          >
            <CloseXIcon />
          </button>
        </header>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="px-1 pt-8 pb-1 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              type="text"
            />

            <FormInput
              label="Email Address (Cannot be changed here)"
              name="email"
              value={formData.email}
              onChange={() => {}}
              type="email"
              required
            />

            <FormInput
              label="New Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
            />

            <FormInput
              label="Confirm New Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              type="password"
            />
          </div>

          <section className="bg-dark min-h-[100px] rounded-[8px] py-2 mt-8">
            <div className="flex items-center gap-2 border-b border-D6D6D6/30 px-4 py-2 pb-4">
              <NotificationIcon />
              <h2 className="text-D6D6D6 text-lg">Notification Preferences</h2>
            </div>

            <div className="py-5 px-4 space-y-3 font-medium font-nunito">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="email_on_new_order"
                  id="email_on_new_order"
                  checked={formData.email_on_new_order}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <label htmlFor="email_on_new_order" className="flex flex-col">
                  <span className="text-FCFAFA text-base font-medium">New Drawing Purchases</span>
                  <span className="text-[#BBBBBB] text-[11px] -mt-1">
                    Get notified when a customer purchases a drawing.
                  </span>
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="email_on_contact_message"
                  id="email_on_contact_message"
                  checked={formData.email_on_contact_message}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <label htmlFor="email_on_contact_message" className="flex flex-col">
                  <span className="text-FCFAFA text-base font-medium">
                    Contact Messages
                  </span>
                  <span className="text-[#BBBBBB] text-[11px] -mt-1">
                    Get notified when someone sends a message via the contact
                    form.
                  </span>
                </label>
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={submitting}
              className="w-[87px] h-10 flex items-center justify-center rounded-[6px] bg-transparent text-white text-[13px] hover:bg-dark transition-colors border border-D6D6D6/30 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="min-w-[139px] px-4 h-10 flex items-center justify-center rounded-[6px] bg-red text-white text-[13px] hover:bg-red/80 transition-colors border border-red disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
