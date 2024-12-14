import axios from 'axios';

// Centraliza la configuración de axios
const ApiUrlSyllabus = axios.create({
    baseURL:  "https://syllabus.hqcoders.com",
    headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
    },
});

export default ApiUrlSyllabus;