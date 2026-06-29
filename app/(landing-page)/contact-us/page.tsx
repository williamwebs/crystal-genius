"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  name: string;
  email: string;
  phone: string;
  message?: string;
}

const ContactUsPage = () => {
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
    <main className="w-full">
      {/* header */}
      <header className="relative h-[700px] md:h-[600px] -mt-20 sm:-mt-0 bg-[#333333] flex flex-col items-center justify-center ">
        {/* absolute grid lines */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <Image
            src="/images/contact-us-grid.svg"
            alt="Grid Lines"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="flex flex-col items-center z-10">
          <h2 className="text-[48px] md:text-[60px] text-white font-nunito font-medium ">
            Contact
          </h2>
          <div className="w-[130px] flex items-center justify-between gap-2 ">
            <Link
              href="/"
              className="font-nunito font-medium text-white hover:text-white/50 "
            >
              Home
            </Link>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.7937 7.49965H2.5C2.36739 7.49965 2.24021 7.55233 2.14645 7.6461C2.05268 7.73987 2 7.86704 2 7.99965C2 8.13226 2.05268 8.25944 2.14645 8.3532C2.24021 8.44697 2.36739 8.49965 2.5 8.49965H11.7937L8.14531 12.145C8.05124 12.239 7.9984 12.3666 7.9984 12.4997C7.9984 12.6327 8.05124 12.7603 8.14531 12.8543C8.23938 12.9484 8.36697 13.0013 8.5 13.0013C8.63303 13.0013 8.76062 12.9484 8.85469 12.8543L13.3547 8.35434C13.4015 8.30787 13.4386 8.25261 13.4639 8.19173C13.4892 8.13086 13.5023 8.06558 13.5023 7.99965C13.5023 7.93372 13.4892 7.86844 13.4639 7.80757C13.4386 7.7467 13.4015 7.69143 13.3547 7.64496L8.85469 3.14496C8.80811 3.09839 8.75281 3.06144 8.69196 3.03623C8.6311 3.01102 8.56587 2.99805 8.5 2.99805C8.43413 2.99805 8.3689 3.01102 8.30804 3.03623C8.24719 3.06144 8.19189 3.09839 8.14531 3.14496C8.09873 3.19154 8.06179 3.24684 8.03658 3.3077C8.01137 3.36855 7.9984 3.43378 7.9984 3.49965C7.9984 3.56552 8.01137 3.63075 8.03658 3.69161C8.06179 3.75246 8.09873 3.80776 8.14531 3.85434L11.7937 7.49965Z"
                fill="#F3F6F8"
              />
            </svg>

            <p className="font-nunito font-medium text-white ">Contact</p>
          </div>
        </div>
      </header>

      {/* contact us section */}

      <section className="py-[120px] max-w-[1200px] mx-auto px-4 flex flex-col gap-10 ">
        <div className="flex flex-col md:flex-row items-center justify-between gap-[20px] md:gap-[100px] ">
          <div className="w-full md:w-[300px] space-y-1 md:space-y-2">
            <span className="font-nunito font-medium text-[#002E44] text-sm ">
              Let’s Talk
            </span>
            <h4 className="font-nunito font-medium text-[#2B2B2B] text-[32px] md:text-[40px] uppercase ">
              Contact Us
            </h4>
          </div>

          <div className="flex-1 space-y-3">
            <p className="font-nunito font-bold text-[18px] md:text-[24px] text-[#333333] ">
              For more information about our services, training programs or to
              discuss your project needs, please contact us
            </p>
            <span className="font-nunito font-medium text-[#2B2B2B] text-xs md:text-sm mt-1 md:mt-0 ">
              Reach out to us for more information on how we can assist you:
            </span>
          </div>
        </div>

        {/* form */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4 ">
          <div className="">
            <form
              onSubmit={handleFormSubmission}
              className="max-w-5xl mx-auto flex flex-col justify-center gap-3"
            >
              <div className="flex flex-col gap-2">
                <div className="hidden md:block">
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
              <div className="flex flex-col gap-2">
                <div className="hidden md:block">
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
              <div className="flex flex-col gap-2">
                <div className="hidden md:block">
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
              <div className="flex flex-col gap-2 ">
                <div className="hidden md:block">
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
                className="bg-red rounded p-3 inline-flex items-center justify-center shadow text-lightGrey text-sm font-nunito font-normal uppercase"
              >
                {submitting ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
          <div className="space-y-6">
            {/* location */}
            <div className="border border-[#CECECE] bg-white rounded-[4px] py-4 px-3 flex flex-col gap-3 ">
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 10.8281C19.767 10.8281 18.5616 11.1938 17.5364 11.8788C16.5111 12.5638 15.7121 13.5375 15.2402 14.6767C14.7683 15.8159 14.6449 17.0694 14.8854 18.2788C15.126 19.4881 15.7197 20.599 16.5916 21.4709C17.4635 22.3428 18.5744 22.9365 19.7837 23.1771C20.9931 23.4176 22.2466 23.2942 23.3858 22.8223C24.525 22.3504 25.4987 21.5514 26.1837 20.5261C26.8687 19.5009 27.2344 18.2955 27.2344 17.0625C27.2344 15.409 26.5775 13.8233 25.4084 12.6541C24.2392 11.485 22.6535 10.8281 21 10.8281ZM21 21.3281C20.1563 21.3281 19.3316 21.0779 18.6301 20.6092C17.9287 20.1405 17.3819 19.4743 17.0591 18.6949C16.7362 17.9154 16.6517 17.0578 16.8163 16.2303C16.9809 15.4029 17.3872 14.6428 17.9837 14.0462C18.5803 13.4497 19.3404 13.0434 20.1678 12.8788C20.9953 12.7142 21.8529 12.7987 22.6324 13.1216C23.4118 13.4444 24.078 13.9912 24.5467 14.6926C25.0154 15.3941 25.2656 16.2188 25.2656 17.0625C25.2656 18.1938 24.8162 19.2788 24.0163 20.0788C23.2163 20.8787 22.1313 21.3281 21 21.3281ZM21 2.95312C17.2593 2.95747 13.673 4.44538 11.028 7.09046C8.38288 9.73554 6.89497 13.3218 6.89062 17.0625C6.89062 22.1337 9.24328 27.5198 13.6943 32.6386C15.7032 34.9603 17.9643 37.0513 20.4356 38.873C20.6011 38.9887 20.7981 39.0508 21 39.0508C21.2019 39.0508 21.3989 38.9887 21.5644 38.873C24.0357 37.0513 26.2968 34.9603 28.3057 32.6386C32.7567 27.5198 35.1094 22.1386 35.1094 17.0625C35.105 13.3218 33.6171 9.73554 30.972 7.09046C28.327 4.44538 24.7407 2.95747 21 2.95312ZM21 36.8337C18.5391 34.9338 8.85938 26.8439 8.85938 17.0625C8.85938 13.8426 10.1385 10.7546 12.4153 8.47778C14.6921 6.20097 17.7801 4.92188 21 4.92188C24.2199 4.92188 27.3079 6.20097 29.5847 8.47778C31.8615 10.7546 33.1406 13.8426 33.1406 17.0625C33.1406 26.8439 23.4609 34.9338 21 36.8337Z"
                  fill="#0077CC"
                />
              </svg>
              <div className="space-y-1">
                <h4 className="font-nunito font-medium text-[22px] text-[#0077CC] ">
                  Our Address
                </h4>
                <p className="font-nunito font-medium text-[#777777] ">
                  152, Akowonjo-Egbeda Road, by Sobo Bus stop, Akowonjo-Ikeja,
                  Lagos
                </p>
              </div>
            </div>
            {/* email */}
            <div className="border border-[#CECECE] bg-white rounded-[4px] py-4 px-3 flex flex-col gap-3 ">
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.078 33.25C7.27183 33.25 6.59925 32.9805 6.06025 32.4415C5.52125 31.9025 5.25117 31.2293 5.25 30.422V11.578C5.25 10.7718 5.52008 10.0992 6.06025 9.56025C6.60042 9.02125 7.27242 8.75117 8.07625 8.75H33.9237C34.7288 8.75 35.4008 9.02008 35.9398 9.56025C36.4788 10.1004 36.7488 10.773 36.75 11.578V30.4237C36.75 31.2288 36.4799 31.9013 35.9398 32.4415C35.3996 32.9817 34.7276 33.2512 33.9237 33.25H8.078ZM21 21.203L7 12.0488V30.4237C7 30.7376 7.10092 30.9954 7.30275 31.1973C7.50458 31.3991 7.763 31.5 8.078 31.5H33.9237C34.2376 31.5 34.4954 31.3991 34.6973 31.1973C34.8991 30.9954 35 30.737 35 30.422V12.047L21 21.203ZM21 19.25L34.461 10.5H7.539L21 19.25ZM7 12.0488V10.5V30.4237C7 30.7376 7.10092 30.9954 7.30275 31.1973C7.50458 31.3991 7.763 31.5 8.078 31.5H7V12.0488Z"
                  fill="#0077CC"
                />
              </svg>

              <div className="space-y-1">
                <h4 className="font-nunito font-medium text-[22px] text-[#0077CC] ">
                  Our Email
                </h4>
                <a
                  href="mailto:crystalgeniusinternational@gmail.com"
                  className="font-nunito font-medium text-[#777777] "
                >
                  crystalgeniusinternational@gmail.com
                </a>
              </div>
            </div>
            {/* time */}
            <div className="border border-[#CECECE] bg-white rounded-[4px] py-4 px-3 flex flex-col gap-3 ">
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 35.875C29.2152 35.875 35.875 29.2152 35.875 21C35.875 12.7848 29.2152 6.125 21 6.125C12.7848 6.125 6.125 12.7848 6.125 21C6.125 29.2152 12.7848 35.875 21 35.875Z"
                  stroke="#0077CC"
                  stroke-width="2"
                />
                <path
                  d="M8.74998 4.90723C7.15391 5.82876 5.82851 7.15416 4.90698 8.75023M33.25 4.90723C34.8461 5.82876 36.1714 7.15416 37.093 8.75023M21 11.3752V20.5627C21 20.8042 21.196 21.0002 21.4375 21.0002H28.875"
                  stroke="#0077CC"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>

              <div className="space-y-1">
                <h4 className="font-nunito font-medium text-[22px] text-[#0077CC] ">
                  Opening Hours
                </h4>
                <p className="font-nunito font-medium text-[#777777] ">
                  Mon – Fri 9 am to 5 pm GMT
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUsPage;
