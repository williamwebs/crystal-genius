import React from "react";

type FormTextareaProps = {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  rows?: number;
  required?: boolean;
  placeholder?: string;
};

const FormTextarea = ({
  label,
  name,
  value,
  onChange,
  rows = 4,
  required = false,
  placeholder,
}: FormTextareaProps) => {
  return (
    <div className="space-y-1">
      <label className="text-[13px] text-FCFAFA">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full bg-transparent border border-D6D6D6/30 rounded-md px-4 py-2 text-sm text-D6D6D6 focus:outline-none focus:border-red transition-colors"
        required={required}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

export default FormTextarea;
