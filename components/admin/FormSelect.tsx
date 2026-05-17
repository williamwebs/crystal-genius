import React from "react";

type SelectOption = {
  value: string;
  label: string;
};

type FormSelectProps = {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  options: SelectOption[];
};

const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options,
}: FormSelectProps) => {
  return (
    <div className="space-y-1">
      <label className="text-[13px] text-FCFAFA">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full h-10 bg-transparent border border-D6D6D6/30 rounded-md px-4 py-[2px] text-sm text-D6D6D6 focus:outline-none focus:border-red transition-colors appearance-none"
        style={{ WebkitAppearance: "none", MozAppearance: "none" } as React.CSSProperties}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-dark text-D6D6D6">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
