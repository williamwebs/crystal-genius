import React from "react";

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  iconBgColor,
}) => {
  return (
    <div
      className="bg-[#555555] rounded-[8px] p-5 border-l-4 flex items-center gap-3"
      style={{ borderLeftColor: iconBgColor }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-white"
        style={{ backgroundColor: iconBgColor }}
      >
        {icon}
      </div>
      <div>
        <p className="text-base text-FCFAFA font-nunito font-medium mb-1">
          {title}
        </p>
        <p className="text-[22px] font-nunito font-extrabold text-white">
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
