import Button from "./button";

type CardProps = {
  title: string;
  description: string;
};

export default function Card({ title, description }: CardProps) {
  return (
    <div className="bg-[#D1F447] w-[295px] h-auto p-6 mt-10 rounded-3xl font-poppins">
      <div className="flex flex-col">
        <h1 className="text-left font-semibold text-2xl mb-3">
          {title}
        </h1>

        <p className="text-left">
          {description}
        </p>

        <div className="mt-auto pt-10">
          <Button />
        </div>
      </div>
    </div>
  );
}
