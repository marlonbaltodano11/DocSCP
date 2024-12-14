import { useEffect, useRef, useState } from "react";
import DocumentIcon from "@assets/initial_document_upload/document_icon.svg";
import DocumentExist from "@assets/initial_document_upload/document_exist.svg";
import { useGlobalDispatch } from "@global_context/GlobalProvider";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const UploadDocument = ({ ApiReference }) => {
  const inputUploadDocument = useRef(null);
  const [file, setFile] = useState(null); // Para almacenar el archivo
  const [fileName, setFileName] = useState("Esperando documento....."); // Para almacenar el nombre del archivo
  const [fileExtension, setFileExtension] = useState(""); // Para almacenar la extensión del archivo
  const dispatch = useGlobalDispatch();
  const navigate = useNavigate();
  // Función para manejar la selección del archivo a través del botón
  const handleFileSelection = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const nameParts = selectedFile.name.split(".");
      const nameWithoutExtension = nameParts.slice(0, -1).join(".");
      const extension = nameParts[nameParts.length - 1];
      setFileName(nameWithoutExtension);
      setFileExtension(extension);
      validateFile(extension);
    }
  };

  // Función para manejar el Drop del archivo
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      const nameParts = droppedFile.name.split(".");
      const nameWithoutExtension = nameParts.slice(0, -1).join(".");
      const extension = nameParts[nameParts.length - 1];
      setFileName(nameWithoutExtension);
      setFileExtension(extension);
      validateFile(extension);
    }
  };

  //Funcion para comprobar el archivo en el Drop

  const validateFile = (extension) => {
    if (extension != "json" && extension != "docx") {
      alert(
        "Solo se permiten archivos de tipo JSON (archivo de guardado) o DOCX"
      );
      setFileExtension("");
      setFile(null);
      setFileName("Esperando documento.....");
    }
  };

  // Función para abrir el input de archivo cuando se hace clic en el botón
  const triggerUpload = () => {
    inputUploadDocument.current.click();
  };
  useEffect(() => {
    if (file) {
      ApiReference.setRequestData({ planFile: file });
    }
  }, [file, setFile]);

  const handleUploadFile = () => {
    if (fileExtension != "json") {
      ApiReference.makeRequest();
    }

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      const content = e.target.result;
      const data = JSON.parse(content);
      console.log(data);
      dispatch({
        type: "LOAD_CHECKPOINT_FILE",
        payload: data.state,
      });
      navigate("/format-syllabus/step_1");
    };
  };

  return (
    <>
      <section
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="zone-drop-document"
      >
        <h3>Arrastra y suelta tu archivo aquí</h3>
        <h3>o</h3>
        <button
          className="upload-document-button shadow"
          onClick={triggerUpload}
        >
          Selecciona Archivo
        </button>
      </section>
      <section className="process-document-container">
        <div className="document-name">
          <img src={file ? DocumentExist : DocumentIcon} alt="Documento" />
          <p>
            {fileName}
            {file && (
              <span
                className={
                  fileExtension === "json"
                    ? "json-style-text"
                    : fileExtension === "pdf"
                    ? "pdf-style-text"
                    : "docx-style-text"
                }
              >
                {fileExtension === "json"
                  ? ".json"
                  : fileExtension === "pdf"
                  ? ".pdf"
                  : ".docx"}
              </span>
            )}
          </p>
        </div>
        {file ? (
          <div className="process-button-container">
            <button
              className="delete-doc-button shadow"
              onClick={() => {
                setFile(null);
                setFileName("Esperando documento.....");
                setFileExtension("");
              }}
            >
              Borrar
            </button>
            <button
              onClick={() => {
                handleUploadFile();
              }}
              type="button"
              className="process-doc-button shadow"
              disabled={!file} // Deshabilita el botón si no hay archivo
            >
              Procesar
            </button>
          </div>
        ) : (
          ""
        )}
      </section>
      <input
        ref={inputUploadDocument}
        type="file"
        hidden
        accept=".pdf,.docx,.json"
        onChange={handleFileSelection}
      />
    </>
  );
};

export default UploadDocument;

UploadDocument.propTypes = {
  ApiReference: PropTypes.object,
};
