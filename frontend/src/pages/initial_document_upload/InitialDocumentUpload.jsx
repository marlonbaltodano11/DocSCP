import HeaderComponent from "@components/common/header/HeaderComponent";
import FooterComponent from "@components/common/footer/FooterComponent";
import MainComponent from "@components/common/main/MainComponent";
import LogoSyllabus from "@assets/initial_document_upload/logo_syllabus.svg";
import LeftDecoration from "@assets/initial_document_upload/left_decoration.svg";
import RighDecoration from "@assets/initial_document_upload/right_decoration.svg";
import InformativeText from "@components/initial_document_upload/InformativeText";
import "@styles/initial_document_upload/initial-document-upload.css";
import UploadDocument from "@components/initial_document_upload/UploadDocument";
import { useEffect, useState } from "react";
import DataLoadingAnimation from "../../components/animations/DataLoadingAnimation";
import useApi from "../../hooks/UseApi";
import { useGlobalDispatch } from "@global_context/GlobalProvider";
import { useNavigate } from "react-router-dom";
import { resetEntireGlobalState } from "@utils/ResetGlobalState";
import NotificationOverlay from "../../components/common/notification_overlay/NotificationOverlay";

const InitialDocumentUpload = () => {
  const navigate = useNavigate();
  const dispatch = useGlobalDispatch();
  let CleanGlobalContextAux = true;
  //Clean global context

  useEffect(() => {
    if (CleanGlobalContextAux) {
      console.log("entra");
      resetEntireGlobalState(dispatch);
      CleanGlobalContextAux = false;
    }
  }, []);

  //--------------------Peticion
  const UploadDocumentApi = useApi({
    endpoint: "/api/v1/lesson-plans/parse",
    method: "POST",
    autoFetch: false,
  });

  useEffect(() => {
    if (UploadDocumentApi.error) {
      setOverlayType(0);
      setModalOpen(true);
      return;
    }

    if (UploadDocumentApi.response) {
      handleApiResponse(UploadDocumentApi.response);
      navigate("/academic-cycle");
    }
  }, [UploadDocumentApi.response, UploadDocumentApi.error]);

  const handleApiResponse = (response) => {
    if (response) {
      dispatch({
        type: "UPDATE_ACADEMIC_CALENDAR_FROM_RESPONSE",
        payload: response,
      });
      dispatch({
        type: "STORE_FIRST_API_RESPONSE",
        payload: response,
      });
    }
  };

  //Overlay
  const closeOverlay = () => setModalOpen(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [overlayType, setOverlayType] = useState(null);

  const overlayActions = {
    closeOverlay,
  };

  return UploadDocumentApi.loading ? (
    <DataLoadingAnimation></DataLoadingAnimation>
  ) : (
    <MainComponent>
      <HeaderComponent></HeaderComponent>
      <main>
        <img className="logo-syllabus-upload-doc" src={LogoSyllabus}></img>
        <section className="content-section-upload-doc">
          <img
            className="side-decoration-upload-doc decoration-left"
            src={LeftDecoration}
            alt=""
          />
          <div className="document-upload-container">
            <InformativeText></InformativeText>
            <UploadDocument ApiReference={UploadDocumentApi}></UploadDocument>
          </div>
          <img
            className="side-decoration-upload-doc decoration-right"
            src={RighDecoration}
            alt=""
          />
        </section>
        {overlayType !== null && (
          <NotificationOverlay
            OverlayType={overlayType}
            IsModalOpen={isModalOpen}
            overlayActions={overlayActions}
          />
        )}
      </main>
      <FooterComponent></FooterComponent>
    </MainComponent>
  );
};

export default InitialDocumentUpload;
