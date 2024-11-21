import Image from "next/image";

interface Props {
  src: string;
  title: string;
  content: string;
  className?: string;
}

const HeroCard = ({ src, title, content, className }: Props) => {
  return (
    <div
      className={`w-full md:w-1/3 h-full px-3 flex flex-col gap-1 bg-white py-2 transition-all duration-500 hover:scale-105 hover:rounded-lg hover:shadow-lg ${className}`}
    >
      <Image src={src} width={40} height={40} alt="" />
      <h5 className="text-lg font-bold text-grey">{title}</h5>
      <p className="font-medium text-paragraphGrey">{content}</p>
    </div>
  );
};

export default HeroCard;
