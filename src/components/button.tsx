import { ArrowRight } from "lucide-react";

export default function Button() {
  return (
    <a 
      href="/dashboard"
      className="bg-black text-white w-full sm:w-[212px] h-16 sm:h-20 rounded-full flex items-center justify-center gap-8 sm:gap-12 hover:bg-gray-900 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
    >
      <span className="text-xl sm:text-2xl">Mulai</span>
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#D1F447] flex items-center justify-center">
        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
      </div>
    </a>
  );
}
