import React from "react";

type FormInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
};

const FormInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
}: FormInputProps) => {
  return (
    <div className="space-y-1">
      <label className="text-[13px] text-FCFAFA">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className="w-full h-10 bg-transparent border border-D6D6D6/30 rounded-md px-4 py-[2px] text-sm text-D6D6D6 focus:outline-none focus:border-red transition-colors"
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
