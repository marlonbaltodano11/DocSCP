import "@styles/format_syllabus/superior-action-menu.css";
import ReprocessBtnIcon from "@assets/format_syllabus/reprocess_btn_icon.svg";
import SaveInstanceBtnIcon from "@assets/format_syllabus/save_instance_btn_icon.svg";
import DownloadFormatBtnIcon from "@assets/format_syllabus/download_format_btn_icon.svg";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "@global_context/GlobalProvider";
import downloadSyllabus from "../../../utils/downloadSyllabus"; // Importa la función personalizada

const SuperiorActionMenu = () => {
  const navigate = useNavigate();

  const state = useGlobalState();

  const guardarDatosEnJSON = () => {
    // Datos que se van a guardar en el JSON
    const data = {
      state,
    };

    // Convertir los datos a JSON
    const jsonData = JSON.stringify(data, null, 2); // null y 2 para formato legible

    // Crear un objeto Blob para guardar el JSON
    const blob = new Blob([jsonData], { type: "application/json" });

    // Crear un enlace de descarga y hacer clic en él
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
  };

  //Descarga-------------------------------
  const handleDownloadFormat = async () => {
    try {
      await downloadSyllabus(
        state.FormatSyllabusObject,
        state.FormatSyllabusObject["{{signatureName}}"] + "- Syllabus" ||
          "Syllabus"
      );
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
      alert("Hubo un error al descargar el archivo. Intente nuevamente.");
    }
  };

  return (
    <section className="action-menu-format-syllabus-container shadow">
      <div className="return-button">
        <button
          className="shadow"
          onClick={() => {
            navigate("/academic-cycle");
          }}
        >
          <img src={ReprocessBtnIcon} alt="" />
          Procesar De Nuevo
        </button>
      </div>
      <div className="actions-buttons">
        <button
          type="button"
          className="shadow"
          onClick={() => {
            guardarDatosEnJSON();
          }}
        >
          <img src={SaveInstanceBtnIcon} alt="" />
          Guardar Instancia
        </button>
        <button
          type="button"
          className="shadow"
          onClick={() => {
            handleDownloadFormat();
          }}
        >
          <img src={DownloadFormatBtnIcon} alt="" />
          Descargar Formato
        </button>
      </div>
    </section>
  );
};

export default SuperiorActionMenu;
