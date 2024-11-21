const Contact = () => {
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
          <span>Contact us</span>

          <h2 className="text-2xl md:text-3xl text-dark font-nunito max-w-5xl mx-auto font-bold my-1 md:px-4">
            For more information about our services, training programs or to
            discuss your project needs, please contact us
          </h2>
          <p className="text-grey max-w-2xl mx-auto mt-2 md:mt-0">
            Reach out to us for more information on how we can assist you:
          </p>
        </div>

        {/* form */}
        <div className="bg-white rounded my-10 px-4 py-5 md:p-10">
          <form className="max-w-5xl mx-auto flex flex-col justify-center gap-5">
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
                  type="text"
                  name="name"
                  id="name"
                  className="border rounded-lg h-12 border-[#D6D6D6] outline-none py-2 px-5 text-sm font-medium font-nunito text-grey placeholder:text-[#BBBBBB] w-full"
                  placeholder="Enter Name"
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
                  type="email"
                  name="email"
                  id="email"
                  className="border rounded-lg h-12 border-[#D6D6D6] outline-none py-2 px-5 text-sm font-medium font-nunito text-grey placeholder:text-[#BBBBBB] w-full"
                  placeholder="Email"
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
                  type="tel"
                  name="phone"
                  id="phone"
                  className="border rounded-lg h-12 border-[#D6D6D6] outline-none py-2 px-5 text-sm font-medium font-nunito text-grey placeholder:text-[#BBBBBB] w-full"
                  placeholder="Number"
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
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
