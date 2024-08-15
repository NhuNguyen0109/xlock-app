import backgroundImg from "../../assets/images/Footer.png";

const Footer = () => {
  return (
    <div className="footer w-full h-[120px] bg-[#29428D] bottom-0 flex justify-center items-center">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
        }}
      >
        {/* Optional content goes here */}
      </div>
    </div>
  );
};

export default Footer;
