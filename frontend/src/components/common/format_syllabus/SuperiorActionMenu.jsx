import { useState } from "react";
import "@styles/format_syllabus/superior-action-menu.css";
import ReprocessBtnIcon from "@assets/format_syllabus/reprocess_btn_icon.svg";
import SaveInstanceBtnIcon from "@assets/format_syllabus/save_instance_btn_icon.svg";
import DownloadFormatBtnIcon from "@assets/format_syllabus/download_format_btn_icon.svg";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "@global_context/GlobalProvider";
import downloadSyllabus from "../../../utils/downloadSyllabus";
import NotificationOverlay from "../notification_overlay/NotificationOverlay";

const SuperiorActionMenu = () => {
  const navigate = useNavigate();
  const state = useGlobalState();
  const [overlayType, setOverlayType] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const closeOverlay = () => setModalOpen(false);

  const reprocessData = () => {
    navigate("/academic-cycle");
    setModalOpen(false);
  };

  const overlayActions = {
    closeOverlay,
    reprocessData,
  };

  const guardarDatosEnJSON = () => {
    const data = { state };
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${
      state.FormatSyllabusObject["{{signatureName}}"] || "Syllabus"
    } - Datos.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Mostrar overlay de instancia guardada
    setOverlayType(3);
    setModalOpen(true);
    setTimeout(() => {
      setOverlayType(null);
      setModalOpen(false);
    }, 2000);
  };

  const handleDownloadFormat = async () => {
    try {
      await downloadSyllabus(
        state.FormatSyllabusObject,
        state.FormatSyllabusObject["{{signatureName}}"] + "- Syllabus" ||
          "Syllabus"
      );
      // Mostrar overlay de formato guardado
      setOverlayType(4);
      setModalOpen(true);
      setTimeout(() => {
        setOverlayType(null);
        setModalOpen(false);
      }, 2000);
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
      // Mostrar overlay de error
      setOverlayType(0);
      setModalOpen(true);
    }
  };

  return (
    <section className="action-menu-format-syllabus-container shadow">
      <div className="return-button">
        <button
          className="shadow"
          onClick={() => {
            // Abrir overlay de reprocesar
            setOverlayType(2);
            setModalOpen(true);
          }}
        >
          <img src={ReprocessBtnIcon} alt="" />
          Procesar De Nuevo
        </button>
      </div>
      <div className="actions-buttons">
        <button type="button" className="shadow" onClick={guardarDatosEnJSON}>
          <img src={SaveInstanceBtnIcon} alt="" />
          Guardar Instancia
        </button>
        <button type="button" className="shadow" onClick={handleDownloadFormat}>
          <img src={DownloadFormatBtnIcon} alt="" />
          Descargar Formato
        </button>
      </div>

      {overlayType !== null && (
        <NotificationOverlay
          OverlayType={overlayType}
          IsModalOpen={isModalOpen}
          overlayActions={overlayActions}
        />
      )}
    </section>
  );
};

export default SuperiorActionMenu;
