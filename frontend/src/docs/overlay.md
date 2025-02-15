# Documentación del Componente NotificationOverlay

## Descripción

El componente `NotificationOverlay` es un modal de notificaciones que permite mostrar mensajes de error, advertencias y confirmaciones dentro de la aplicación. Utiliza un `dialog` HTML para manejar su visibilidad y se configura mediante propiedades para definir su tipo y acciones disponibles.

## Instalación y Uso

### Importación

```jsx
import NotificationOverlay from "@components/notification_overlay/NotificationOverlay";
```

### Props

| Propiedad        | Tipo     | Requerido | Descripción                                                     |
| ---------------- | -------- | --------- | --------------------------------------------------------------- |
| `OverlayType`    | `number` | No        | Define el tipo de overlay a mostrar, basado en `OverlayDataMap` |
| `IsModalOpen`    | `bool`   | Sí        | Controla si el modal está abierto o cerrado                     |
| `overlayActions` | `object` | No        | Objeto con funciones para manejar las acciones de los botones   |

## Ejemplo de Uso

```jsx
import { useState } from "react";
import NotificationOverlay from "@components/notification_overlay/NotificationOverlay";

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [overlayType, setOverlayType] = useState(0);

  const overlayActions = {
    closeOverlay: () => setModalOpen(false),
  };

  return (
    <div>
      <button
        onClick={() => {
          setOverlayType(0);
          setModalOpen(true);
        }}
      >
        Mostrar Notificación
      </button>

      {overlayType !== null && (
        <NotificationOverlay
          OverlayType={overlayType}
          IsModalOpen={isModalOpen}
          overlayActions={overlayActions}
        />
      )}
    </div>
  );
};

export default App;
```

## Configuración de Tipos de Overlay

El componente obtiene su configuración de `OverlayDataMap`, donde cada `OverlayType` tiene una estructura con un icono, título, subtítulo y botones.

Ejemplo de una configuración dentro de `OverlayDataMap`:

```javascript
const OverlayDataMap = {
  0: {
    Icon: FailApiIcon,
    Title: "Error Al Realizar La Petición",
    Subtitle:
      "Validar la integridad de los datos ingresados o el archivo subido.",
    ButtonsArray: [
      {
        title: "Aceptar",
        actionKey: "closeOverlay",
        className: "close-overlay-btn",
      },
    ],
  },
};
```

## Estilos

Los estilos del componente están definidos en `@styles/notification_overlay/notification-overlay.css`. Puedes personalizar los estilos modificando las clases asignadas en `ClassNameList`.

## Consideraciones

- Se recomienda gestionar el estado de `IsModalOpen` desde el componente padre.
- `OverlayType` debe estar mapeado dentro de `OverlayDataMap` para garantizar que el contenido se renderice correctamente.
