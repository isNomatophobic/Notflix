import Navbar from "./headerComponents/Navbar";
import HeaderBody from "./headerComponents/HeaderBody";
import Background from "./headerComponents/Background";
function Header() {
  const bgStyle =
    "linear-gradient(0deg, rgba(0,0,0,0.8) 13%, rgba(0,03,0,0.4) 50%, rgba(0,0,0,.92) 100%)";
  return (
    <div className="header-container">
      <Navbar displayLink={true} bg="transparent" />
      <HeaderBody />
      <Background bgStyle={bgStyle} height={`100%`} />
    </div>
  );
}
export default Header;
