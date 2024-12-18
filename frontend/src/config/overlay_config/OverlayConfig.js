import ReprocessBtnIcon from "@assets/notification_overlay/reprocess_icon.svg";
import SaveInstanceBtnIcon from "@assets/notification_overlay/save_instance_icon.svg";
import DownloadFormatBtnIcon from "@assets/notification_overlay/download_format_icon.svg";
import FailApiIcon from "@assets/notification_overlay/fail_api_icon.svg";
import ReturnHomeIcon from "@assets/notification_overlay/return_home_icon.svg";
import WarningIcon from "@assets/notification_overlay/warning_icon.svg";


const ClassNameList = [
  "fail-api-overlay",
  "return-home-overlay",
  "reprocess-overlay",
  "save-overlay-1",
  "save-overlay-2",
  "fail-api-overlay"
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
        title: "Ir a Inicio",
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
  5: {
    Icon: FailApiIcon,
    Title: "Error Al Generar Syllabus",
    Subtitle: "Verificar que el puntaje total en ambos parciales sea menor a 100 puntos.",
    ButtonsArray: [
      {
        title: "Aceptar",
        actionKey: "closeOverlay",
        className: "close-overlay-btn",
      },
    ],

  },
  6: {
    Icon: FailApiIcon,
    Title: "Error Al Subir Documento",
    Subtitle: "Solo se permiten archivos de tipo JSON (archivo de guardado) o DOCX. Verificar archivo subido.",
    ButtonsArray: [
      {
        title: "Aceptar",
        actionKey: "closeOverlay",
        className: "close-overlay-btn",
      },
    ],

  },
  7: {
    Icon: WarningIcon,
    Title: "Advertencia: Fecha Inicio mayor que la Fecha Final.",
    ButtonsArray: [
      {
        title: "Aceptar",
        actionKey: "closeOverlay",
        className: "close-overlay-btn",
      },
    ],

  },
};

export { OverlayDataMap, ClassNameList };
