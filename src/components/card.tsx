import Button from "./button";

type CardProps = {
  title: string;
  description: string;
};

export default function Card({ title, description }: CardProps) {
  return (
    <div className="bg-[#D1F447] w-full max-w-sm h-full p-6 sm:p-8 rounded-3xl font-poppins shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
      <div className="flex flex-col flex-1">
        <h1 className="text-left font-semibold text-xl sm:text-2xl mb-4 text-(--color-text) leading-tight">
          {title}
        </h1>

        <p className="text-left text-black text-sm sm:text-base leading-relaxed flex-1">
          {description}
        </p>

        <div className="mt-6 sm:mt-8 pt-4">
          <Button />
        </div>
      </div>
    </div>
  );
}
