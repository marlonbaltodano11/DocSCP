import FooterAsset from "@assets/footer/footer_asset.svg";
import FooterFlower from "@assets/footer/footer_flower.svg";
import "@styles/footer/footer-style.css";

const FooterComponent = () => {
  return (
    <footer className="container-footer main-footer">
      <img className="footer-waves" src={FooterAsset}></img>
      <img className="footer-flower" src={FooterFlower} alt="" />
    </footer>
  );
};

export default FooterComponent;
