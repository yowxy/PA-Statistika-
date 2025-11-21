export default function Navbar() {
  return (
    <div className="flex justify-center m-10">
      <div className="w-[1248px] h-16 bg-[#D1F447] rounded-2xl flex items-center px-6">
        <ul className="flex justify-between items-center w-full">
          
          <li className="font-semibold m-20">JagaJatim</li>

          <li className="flex justify-center items-center">
            <ul className="flex gap-6">
              <li className="font-semibold cursor-pointer">Home</li>
              <li className="font-semibold cursor-pointer">Tentang</li>
              <li className="font-semibold cursor-pointer">Data</li>
            </ul>
          </li>

          <a href="/dashboard">
          <li className="font-semibold cursor-pointer mr-20">Masuk Dashboard</li>
          </a>
        </ul>
      </div>
    </div>
  );
}
