import { useRef, useState } from "react";
import DocumentIcon from "@assets/initial_document_upload/document_icon.svg";
import DocumentExist from "@assets/initial_document_upload/document_exist.svg";
import { useNavigate } from "react-router-dom";

const UploadDocument = () => {
  const navigate = useNavigate();
  const inputUploadDocument = useRef(null);
  const [file, setFile] = useState(null); // Para almacenar el archivo
  const [fileName, setFileName] = useState("Esperando documento....."); // Para almacenar el nombre del archivo
  const [fileExtension, setFileExtension] = useState(""); // Para almacenar la extensión del archivo

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
    if (extension != "json" && extension != "pdf" && extension != "docx") {
      alert("Solo se permiten archivos de tipo JSON, PDF o DOCX");
      setFile(null);
      setFileName("Esperando documento.....");
    }
  };

  // Función para abrir el input de archivo cuando se hace clic en el botón
  const triggerUpload = () => {
    inputUploadDocument.current.click();
  };

  const handleUploadFile = () => {
    navigate("/academic-cycle");
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
