import HeaderComponent from "@components/common/header/HeaderComponent";
import FooterComponent from "@components/common/footer/FooterComponent";
import MainComponent from "@components/common/main/MainComponent";
import LogoSyllabus from "@assets/initial_document_upload/logo_syllabus.svg";
import LeftDecoration from "@assets/initial_document_upload/left_decoration.svg";
import RighDecoration from "@assets/initial_document_upload/right_decoration.svg";
import InformativeText from "@components/initial_document_upload/InformativeText";
import "@styles/initial_document_upload/initial-document-upload.css";
import UploadDocument from "@components/initial_document_upload/UploadDocument";

const InitialDocumentUpload = () => {
  return (
    <MainComponent>
      <HeaderComponent></HeaderComponent>
      <img className="logo-syllabus-upload-doc" src={LogoSyllabus}></img>
      <section className="content-section-upload-doc">
        <img
          className="side-decoration-upload-doc decoration-left"
          src={LeftDecoration}
          alt=""
        />
        <div className="document-upload-container">
          <InformativeText></InformativeText>
          <UploadDocument></UploadDocument>
        </div>
        <img
          className="side-decoration-upload-doc decoration-right"
          src={RighDecoration}
          alt=""
        />
      </section>

      <FooterComponent></FooterComponent>
    </MainComponent>
  );
};

export default InitialDocumentUpload;
