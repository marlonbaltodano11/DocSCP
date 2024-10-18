import HeaderComponent from "@components/common/header/HeaderComponent";
import FooterComponent from "@components/common/footer/FooterComponent";
import MainComponent from "@components/common/main/MainComponent";

const InitialDocumentUpload = () => {
  return (
    <div className="main-app-container">
      <HeaderComponent></HeaderComponent>
      <MainComponent></MainComponent>
      <FooterComponent></FooterComponent>
    </div>
  );
};

export default InitialDocumentUpload;
