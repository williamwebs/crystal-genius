import Link from 'next/link';
import React from 'react'

const LetsTalk = () => {
  return (
    <section className="bg-[#333333] min:h-[200px] py-10 ">
      <div className="w-full h-full container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col">
          <h3 className="font-impact font-normal text-center md:text-left text-white text-[22px] md:text-[32px]">
            The Cure for Common Unprofessionalism in Construction
          </h3>
          <p className="font-nunito font-medium text-white text-center md:text-left md:text-[17px] mt-3 md:mt-0 ">
            How do you know which delivery method is right for you? This guide
            will help you get started.
          </p>
        </div>

        <Link
          href="/contact-us"
          className="bg-[#F3F6F8] w-full md:w-[168px] h-[47px] rounded-[30px] flex items-center justify-center gap-4 mt-5 md:mt-0 "
        >
          <span className="font-nunito font-medium text-[15px] text-yellow uppercase">
            Let's Talk
          </span>
          <div className="bg-yellow w-8 h-8 rounded-full flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.7937 7.4999H2.5C2.36739 7.4999 2.24021 7.55257 2.14645 7.64634C2.05268 7.74011 2 7.86729 2 7.9999C2 8.1325 2.05268 8.25968 2.14645 8.35345C2.24021 8.44722 2.36739 8.4999 2.5 8.4999H11.7937L8.14531 12.1452C8.05124 12.2393 7.9984 12.3669 7.9984 12.4999C7.9984 12.6329 8.05124 12.7605 8.14531 12.8546C8.23938 12.9487 8.36697 13.0015 8.5 13.0015C8.63303 13.0015 8.76062 12.9487 8.85469 12.8546L13.3547 8.35458C13.4015 8.30811 13.4386 8.25285 13.4639 8.19198C13.4892 8.13111 13.5023 8.06583 13.5023 7.9999C13.5023 7.93396 13.4892 7.86868 13.4639 7.80781C13.4386 7.74694 13.4015 7.69168 13.3547 7.64521L8.85469 3.14521C8.80811 3.09863 8.75281 3.06168 8.69196 3.03647C8.6311 3.01127 8.56587 2.99829 8.5 2.99829C8.43413 2.99829 8.3689 3.01127 8.30804 3.03647C8.24719 3.06168 8.19189 3.09863 8.14531 3.14521C8.09873 3.19179 8.06179 3.24708 8.03658 3.30794C8.01137 3.3688 7.9984 3.43402 7.9984 3.49989C7.9984 3.56577 8.01137 3.63099 8.03658 3.69185C8.06179 3.75271 8.09873 3.808 8.14531 3.85458L11.7937 7.4999Z"
                fill="#F3F6F8"
              />
            </svg>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default LetsTalk