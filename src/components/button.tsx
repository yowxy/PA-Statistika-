import { ArrowRight } from "lucide-react";

export default function Button() {
  return (
    <button  className="bg-black text-white  w-[212px] h-20 rounded-full flex items-center justify-center gap-12">
      <span className="text-2xl">Mulai</span>
      <div className="w-14 h-14 rounded-full bg-[#D1F447] flex items-center justify-center ">
        <ArrowRight className="w-6 h-6 text-black" />
      </div>

    </button>
  );
}
