import HeroSection from "./components/heroSection";
import Navbar from "../../components/navbar";
import InfoProyek from "./components/infoProyek";
import Tentang from "./components/tentang";
import Footer from "../../components/footer";

export default function Home() {
  return (
  <div className="font-poppins ">
    <Navbar />
    <HeroSection />
    <InfoProyek/>
    <Tentang/>
    <Footer/>
  </div>
  );
}