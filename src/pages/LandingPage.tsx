import Banner from "../components/main-components/Banner";
import Header from "../components/main-components/Header";
import Footer from "../components/main-components/Footer";
import "../assets/styles";

const LandingPage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-grow w-full items-center">
          <Banner />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
