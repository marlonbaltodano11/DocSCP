import { useState, useEffect, useCallback } from "react";
import { convertToFormData } from "../Utils/FormDataUtils";
import axios from "axios";
/**
 * Custom hook to make API requests using Axios.
 *
 * @param {Object} options - Options to configure the API request.
 * @param {string} options.endpoint - The API endpoint to be requested.
 * @param {string} [options.method='GET'] - HTTP method to use for the request. Defaults to 'GET'.
 * @param {Object|null} [options.data=null] - Data to be sent in the request body for POST/PUT requests.
 * @param {Object|null} [options.params=null] - Query parameters to be sent with the request.
 * @param {boolean} [options.autoFetch=true] - Whether to automatically fetch the data when the component mounts. Defaults to true.
 *
 * @returns {Object} An object containing the API response, loading state, error, and setters to update the request.
 * @returns {any} response - The API response data.
 * @returns {number} status - The API response status.
 * @returns {Error|null} error - Any error that occurred during the request.
 * @returns {boolean} loading - A boolean indicating whether the request is in progress.
 * @returns {function} setApiEndpoint - Function to update the API endpoint.
 * @returns {function} setHttpMethod - Function to update the HTTP method.
 * @returns {function} setRequestData - Function to update the data for the request.
 * @returns {function} setQueryParams - Function to update the query parameters.
 * @returns {function} makeRequest - Function to manually trigger the API request.
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

      console.log(finalData);

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
      console.log(err);
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
