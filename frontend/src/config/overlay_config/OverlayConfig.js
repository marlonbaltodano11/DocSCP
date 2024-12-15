import ReprocessBtnIcon from "@assets/notification_overlay/reprocess_icon.svg";
import SaveInstanceBtnIcon from "@assets/notification_overlay/save_instance_icon.svg";
import DownloadFormatBtnIcon from "@assets/notification_overlay/download_format_icon.svg";
import FailApiIcon from "@assets/notification_overlay/fail_api_icon.svg";
import ReturnHomeIcon from "@assets/notification_overlay/return_home_icon.svg";

const ClassNameList = [
  "fail-api-overlay",
  "return-home-overlay",
  "reprocess-overlay",
  "save-overlay-1",
  "save-overlay-2",
];

const OverlayDataMap = {
  0: {
    Icon: FailApiIcon,
    Title: "Error Al Realizar La Petición",
    Subtitle: "Validar La Integridad De Los Datos Ingresados (Fechas correctas o algún campo vacío) o Validar que el archivo sea correcto.",
    ButtonsArray: [
      {
        title: "Aceptar",
        actionKey: "closeOverlay",
        className: "close-overlay-btn",
      },
    ],
  },
  1: {
    Icon: ReturnHomeIcon,
    Title: "¿Está Seguro De Volver Al Inicio?",
    Subtitle: "Advertencia: Todos los datos se perderán.",
    ButtonsArray: [
      {
        title: "Volver",
        actionKey: "goHome",
        className: "go-home-btn",
      },
      {
        title: "Cancelar",
        actionKey: "closeOverlay",
        className: "close-overlay-btn",
      },
    ],
  },
  2: {
    Icon: ReprocessBtnIcon,
    Title: "¿Está Seguro De Volver A Procesar La Información?",
    Subtitle: "Advertencia: Los datos generados serán sobrescritos.",
    ButtonsArray: [
      {
        title: "Procesar",
        actionKey: "reprocessData",
        className: "reprocess-btn",
      },
      {
        title: "Volver",
        actionKey: "closeOverlay",
        className: "close-overlay-btn",
      },
    ],
  },
  3: {
    Icon: SaveInstanceBtnIcon,
    Title: "Instancia Guardada En Su Ordenador",
    Subtitle: "",
  },
  4: {
    Icon: DownloadFormatBtnIcon,
    Title: "Formato Guardado En Su Ordenador",
    Subtitle: "",

  },
};

export { OverlayDataMap, ClassNameList };
