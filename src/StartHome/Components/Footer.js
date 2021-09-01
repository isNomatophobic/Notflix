import FooterLinks from "./FooterComponents/FooterLinks";
function Footer({bgColor}) {
  return (
    <div className="footer-container" style={{backgroundColor:bgColor}}>
      <FooterLinks />
    </div>
  );
}
export default Footer;
