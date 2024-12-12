import { useState, useEffect, useCallback } from 'react';
import apiClient from '../Config/AxiosConfig';
import { convertToFormData } from '../Utils/FormDataUtils';
import { useAuth0 } from "@auth0/auth0-react";

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
function useApi({
    endpoint = '',
    method = 'GET',
    data = null,
    params = null,
    autoFetch = true
} = {}) {
    const [apiEndpoint, setApiEndpoint] = useState(endpoint);
    const [httpMethod, setHttpMethod] = useState(method);
    const [requestData, setRequestData] = useState(data);
    const [queryParams, setQueryParams] = useState(params);
    const [response, setResponse] = useState(null);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { getAccessTokenSilently } = useAuth0();

    const makeRequest = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const token = await getAccessTokenSilently();
            const authHeader = { Authorization: `Bearer ${token}` };

            let result;
            let finalData = requestData;

            if (['POST', 'PUT'].includes(httpMethod.toUpperCase())) {
                finalData = convertToFormData(requestData);
            }

            const config = {
                headers: authHeader,
                params: queryParams,
            };

            switch (httpMethod.toUpperCase()) {
                case 'GET':
                    result = await apiClient.get(apiEndpoint, config);
                    break;
                case 'POST':
                    result = await apiClient.post(apiEndpoint, finalData, config);
                    break;
                case 'PUT':
                    result = await apiClient.put(apiEndpoint, finalData, config);
                    break;
                case 'DELETE':
                    result = await apiClient.delete(apiEndpoint, config);
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
    }, [apiEndpoint, httpMethod, requestData, queryParams, getAccessTokenSilently]);

    useEffect(() => {
        if (autoFetch && apiEndpoint) {
            makeRequest();
        }
    }, [apiEndpoint, httpMethod, requestData, queryParams, autoFetch, makeRequest]);

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
