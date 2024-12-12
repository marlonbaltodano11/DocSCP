import "@styles/format_syllabus/superior-action-menu.css";
import ReprocessBtnIcon from "@assets/format_syllabus/reprocess_btn_icon.svg";
import SaveInstanceBtnIcon from "@assets/format_syllabus/save_instance_btn_icon.svg";
import DownloadFormatBtnIcon from "@assets/format_syllabus/download_format_btn_icon.svg";
import { useNavigate } from "react-router-dom";

const SuperiorActionMenu = () => {
  const navigate = useNavigate();
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
        <button type="button" className="shadow">
          <img src={SaveInstanceBtnIcon} alt="" />
          Guardar Instancia
        </button>
        <button type="button" className="shadow">
          <img src={DownloadFormatBtnIcon} alt="" />
          Descargar Formato
        </button>
      </div>
    </section>
  );
};

export default SuperiorActionMenu;
