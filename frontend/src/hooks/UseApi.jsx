import { useState, useEffect, useCallback } from "react";
import { convertToFormData } from "@utils/FormDataUtils";
import axios from "axios";
/**
 * Hook personalizado para realizar solicitudes a una API utilizando Axios.
 *
 * @param {Object} opciones - Configuración de la solicitud API.
 * @param {string} opciones.endpoint - El endpoint de la API a solicitar.
 * @param {string} [opciones.method='GET'] - Método HTTP a utilizar en la solicitud. Por defecto es 'GET'.
 * @param {Object|null} [opciones.data=null] - Datos que se enviarán en el cuerpo de la solicitud para métodos POST/PUT.
 * @param {Object|null} [opciones.params=null] - Parámetros de consulta (query params) que se enviarán con la solicitud.
 * @param {boolean} [opciones.autoFetch=true] - Indica si la solicitud debe ejecutarse automáticamente al montar el componente. Por defecto es true.
 * @param {boolean} [opciones.sendJson=false] - Define si los datos se enviarán en formato JSON o como FormData.
 *
 * @returns {Object} Un objeto con la respuesta de la API, estado de carga, error y funciones para actualizar la solicitud.
 * @returns {any} response - Datos obtenidos de la API tras la solicitud.
 * @returns {number} status - Código de estado HTTP de la respuesta.
 * @returns {Error|null} error - Error capturado durante la solicitud, si ocurre alguno.
 * @returns {boolean} loading - Indica si la solicitud está en curso.
 * @returns {function} setApiEndpoint - Función para actualizar el endpoint de la API.
 * @returns {function} setHttpMethod - Función para actualizar el método HTTP de la solicitud.
 * @returns {function} setRequestData - Función para actualizar los datos de la solicitud.
 * @returns {function} setQueryParams - Función para actualizar los parámetros de consulta.
 * @returns {function} makeRequest - Función para ejecutar manualmente la solicitud API.
 */

// Centraliza la configuración de axios

function useApi({
  endpoint = "",
  method = "GET",
  data = null,
  params = null,
  autoFetch = true,
  sendJson = false,
} = {}) {
  const [apiEndpoint, setApiEndpoint] = useState(endpoint);
  const [httpMethod, setHttpMethod] = useState(method);
  const [requestData, setRequestData] = useState(data);
  const [queryParams, setQueryParams] = useState(params);
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const ApiUrlSyllabus = axios.create({
    baseURL: "https://syllabus.hqcoders.com",
    headers: {
      "Content-Type": sendJson ? "application/json" : "multipart/form-data",
      Accept: "*/*",
    },
  });

  const makeRequest = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let result;
      let finalData = requestData;

      if (["POST", "PUT"].includes(httpMethod.toUpperCase()) && !sendJson) {
        finalData = convertToFormData(requestData);
      }

      const config = {
        params: queryParams,
      };

      switch (httpMethod.toUpperCase()) {
        case "GET":
          result = await ApiUrlSyllabus.get(apiEndpoint, config);
          break;
        case "POST":
          result = await ApiUrlSyllabus.post(apiEndpoint, finalData, config);
          break;
        case "PUT":
          result = await ApiUrlSyllabus.put(apiEndpoint, finalData, config);
          break;
        case "DELETE":
          result = await ApiUrlSyllabus.delete(apiEndpoint, config);
          break;
        default:
          throw new Error(`Unsupported method: ${httpMethod}`);
      }

      setResponse(result.data);
      setStatus(result.status);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [apiEndpoint, httpMethod, requestData, queryParams]);

  useEffect(() => {
    if (autoFetch && apiEndpoint) {
      makeRequest();
    }
  }, [
    apiEndpoint,
    httpMethod,
    requestData,
    queryParams,
    autoFetch,
    makeRequest,
  ]);

  return {
    response,
    status,
    error,
    loading,
    setApiEndpoint,
    setHttpMethod,
    setRequestData,
    setQueryParams,
    makeRequest,
  };
}

export default useApi;
