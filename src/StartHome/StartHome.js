import Header from "./Components/Header";
import Sections from "./Components/Sections";
import Footer from "./Components/Footer";
import Faq from "./Components/Faq";
import "./StartHome-Styles.css";

function StartHome() {
  return (
    <div className="starthome-container">
      <Header />
      <Sections />
      <Faq />
      <Footer />
    </div>
  );
}

export default StartHome;
