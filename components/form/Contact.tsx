"use client";

import { motion } from "framer-motion";
import { fadeIn } from "../../variants/variant";
import { useState } from "react";
import toast from "react-hot-toast";
// import { useToast } from "../../@/hooks/use-toast";

interface Props {
  name: string;
  email: string;
  phone: string;
  message?: string;
}

const Contact = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<Props>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // const { toast } = useToast();

  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  // handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // handle form submission
  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.message) toast.success("Your message has been sent.");

      if (data.error) toast.error(data.error);

      setForm(initialFormState);
      setSubmitting(false);
    } catch (error) {
      toast.error(`Error sending message. Try again! ${error}`); //Error sending message. Try again!
      setForm(initialFormState);
      setSubmitting(false);
    }
  };

  return (
    <section
      className="w-full bg-cover bg-center py-20 px-3 md:px-0"
      style={{
        backgroundImage: `url(${"/images/contact-us-bg.png"})`,
      }}
      id="contact"
    >
      <div className="container mx-auto">
        <div className="text-center">
          <motion.span
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
          >
            Contact us
          </motion.span>

          <motion.h2
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
            className="text-2xl md:text-3xl text-dark font-nunito max-w-5xl mx-auto font-bold my-1 md:px-4"
          >
            For more information about our services, training programs or to
            discuss your project needs, please contact us
          </motion.h2>
          <motion.p
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
            className="text-grey max-w-2xl mx-auto mt-2 md:mt-0"
          >
            Reach out to us for more information on how we can assist you:
          </motion.p>
        </div>

        {/* form */}
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="bg-white rounded my-10 px-4 py-5 md:p-10"
        >
          <form
            onSubmit={handleFormSubmission}
            className="max-w-5xl mx-auto flex flex-col justify-center gap-5"
          >
            <div className="flex items-center gap-10">
              <div className="hidden md:block w-[15%] text-right">
                <label
                  htmlFor="name"
                  className="font-medium font-nunito text-base text-grey"
                >
                  Your Name
                </label>
              </div>

              <div className="flex-1">
                <input
                  onChange={handleChange}
                  value={form.name}
                  type="text"
                  name="name"
                  id="name"
                  className="border rounded-lg h-12 border-[#D6D6D6] outline-none py-2 px-5 text-sm font-medium font-nunito text-grey placeholder:text-[#BBBBBB] w-full"
                  placeholder="Enter Name"
                  required
                />
              </div>
            </div>

            {/* email */}
            <div className="flex items-center gap-10">
              <div className="hidden md:block w-[15%] text-right">
                <label
                  htmlFor="email"
                  className="font-medium font-nunito text-base text-grey"
                >
                  Email Address
                </label>
              </div>

              <div className="flex-1">
                <input
                  onChange={handleChange}
                  value={form.email}
                  type="email"
                  name="email"
                  id="email"
                  className="border rounded-lg h-12 border-[#D6D6D6] outline-none py-2 px-5 text-sm font-medium font-nunito text-grey placeholder:text-[#BBBBBB] w-full"
                  placeholder="Email"
                  required
                />
              </div>
            </div>

            {/* phone number */}
            <div className="flex items-center gap-10">
              <div className="hidden md:block w-[15%] text-right">
                <label
                  htmlFor="phone"
                  className="font-medium font-nunito text-base text-grey"
                >
                  Phone Number
                </label>
              </div>

              <div className="flex-1">
                <input
                  onChange={handleChange}
                  value={form.phone}
                  type="tel"
                  name="phone"
                  id="phone"
                  className="border rounded-lg h-12 border-[#D6D6D6] outline-none py-2 px-5 text-sm font-medium font-nunito text-grey placeholder:text-[#BBBBBB] w-full"
                  placeholder="Number"
                  required
                />
              </div>
            </div>

            {/* message */}
            <div className="flex items-center gap-10">
              <div className="hidden md:block w-[15%] text-right">
                <label
                  htmlFor="message"
                  className="font-medium font-nunito text-base text-grey"
                >
                  Message
                </label>
              </div>

              <div className="flex-1">
                <textarea
                  onChange={handleChange}
                  value={form.message}
                  name="message"
                  id="message"
                  className="border rounded-lg h-32 border-[#D6D6D6] outline-none py-2 px-5 text-sm font-medium font-nunito text-grey placeholder:text-[#BBBBBB] w-full resize-none"
                  placeholder="Type Message"
                />
              </div>
            </div>

            {/* cta */}
            <button
              type="submit"
              className="bg-red rounded p-3 inline-flex items-center justify-center mt-16 shadow text-lightGrey text-sm font-nunito font-normal ml-auto"
            >
              {submitting ? "Sending..." : "Send message"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
