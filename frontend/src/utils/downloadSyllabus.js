import axios from "axios";

const downloadSyllabus = async (data, filename) => {
  try {
    const response = await axios.post(
      "https://syllabus.hqcoders.com/api/v1/syllabus/export",
      data,
      {
        responseType: "blob", // Para manejar archivos
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename || "Syllabus"}.docx`;
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);


  } catch (error) {
    console.error("Error al descargar el archivo:", error);
    throw error;
  }
};

export default downloadSyllabus;
