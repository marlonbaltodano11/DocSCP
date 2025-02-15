# useApi Hook

## Descripción

`useApi` es un hook personalizado que facilita la realización de solicitudes HTTP utilizando Axios. Permite realizar peticiones GET, POST, PUT y DELETE de manera flexible y configurable.

## Uso

```javascript
import useApi from "@hooks/useApi";

const { response, loading, error, makeRequest } = useApi({
  endpoint: "/api/data",
  method: "GET",
  autoFetch: true,
});

if (loading) return <p>Cargando...</p>;
if (error) return <p>Error: {error.message}</p>;

return <pre>{JSON.stringify(response, null, 2)}</pre>;
```

## Parámetros

El hook acepta un objeto de opciones con los siguientes parámetros:

| Propiedad   | Tipo               | Descripción                                                                                                                      |
| ----------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `endpoint`  | `string`           | URL del endpoint de la API.                                                                                                      |
| `method`    | `string`           | Método HTTP (`GET`, `POST`, `PUT`, `DELETE`). Valor por defecto: `GET`.                                                          |
| `data`      | `object` \/ `null` | Datos a enviar en `POST` o `PUT`.                                                                                                |
| `params`    | `object` \/ `null` | Parámetros de consulta para la petición.                                                                                         |
| `autoFetch` | `boolean`          | Si es `true`, ejecuta la petición al montar el componente. Valor por defecto: `true`.                                            |
| `sendJson`  | `boolean`          | Si es `true`, envía la petición como `application/json`; de lo contrario, usa `multipart/form-data`. Valor por defecto: `false`. |

## Retorno

El hook devuelve un objeto con los siguientes valores:

| Propiedad        | Tipo               | Descripción                            |
| ---------------- | ------------------ | -------------------------------------- |
| `response`       | `any`              | Datos de la respuesta de la API.       |
| `status`         | `number` \/ `null` | Código de estado HTTP de la respuesta. |
| `error`          | `Error` \/ `null`  | Error en la petición (si ocurre).      |
| `loading`        | `boolean`          | Indica si la petición está en proceso. |
| `setApiEndpoint` | `function`         | Actualiza el endpoint.                 |
| `setHttpMethod`  | `function`         | Actualiza el método HTTP.              |
| `setRequestData` | `function`         | Actualiza los datos de la petición.    |
| `setQueryParams` | `function`         | Actualiza los parámetros de consulta.  |
| `makeRequest`    | `function`         | Ejecuta manualmente la petición.       |

## Ejemplo de Uso con `POST`

```javascript
const { response, loading, error, makeRequest, setRequestData } = useApi({
  endpoint: "/api/create",
  method: "POST",
  autoFetch: false,
  sendJson: true,
});

const handleSubmit = () => {
  setRequestData({ name: "John Doe", age: 30 });
  makeRequest();
};

return (
  <>
    <button onClick={handleSubmit} disabled={loading}>
      Enviar
    </button>
    {loading && <p>Enviando...</p>}
    {error && <p>Error: {error.message}</p>}
    {response && <p>Respuesta: {JSON.stringify(response)}</p>}
  </>
);
```

## Notas

- Si `autoFetch` es `true`, la petición se ejecuta automáticamente al montar el componente.
- Para solicitudes `POST` y `PUT`, si `sendJson` es `false`, los datos se convierten en `FormData` automáticamente usando `convertToFormData`.
- La base URL de la API está preconfigurada en `https://syllabus.hqcoders.com`.
