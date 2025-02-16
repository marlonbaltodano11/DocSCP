# Aquitectura de carpetas:

## Arbol de carpetas

```javascript
src/
│
├── assets/
│   ├── components/ //Carpetas de los componentes
│   └── fonts/ // Carpeta para almacenar fuentes
│
├── components/ // Componentes de la aplicación
│   ├── academic_cycle/ // Componentes del ciclo académico
│   ├── analytical_plan/ // Componentes del plan analítico
│   ├── animations/ // Animaciones utilizadas en la aplicación
│   ├── common/ // Componentes compartidos
│   │   ├── academic_preparation_container/ // Contenedor presente en los tres planes
│   │   ├── date_input/ // Componente para entrada de fechas
│   │   ├── footer/ // Pie de página compartido
│   │   ├── format_syllabus/ // Componentes compartidos en la elaboración del syllabus
│   │   ├── header/ // Encabezado compartido
│   │   ├── main/ // Contenedor principal
│   │   ├── navigation_buttons/ // Botones de navegación
│   │   ├── notification_overlay/ // Superposición de notificaciones
│   │   ├── wizard_design/ // Diseño del asistente
│   ├── format_syllabus/ // Componentes para la elaboración del syllabus
│   ├── initial_document_upload/ // Componente para la carga inicial de documentos
│   ├── thematic_plan/ // Componentes del plan temático
│
├── config/ // Configuraciones de la aplicación
│
├── docs/ // Documentación del proyecto
│
├── global_context/ // Contexto de la aplicación
│
├── hooks/ // Custom hooks de React
│
├── json/ // Archivos JSON utilizados en la aplicación
│
├── pages/ // Páginas de la aplicación
│   ├── academic_cycle/ // Páginas del ciclo académico
│   ├── analytical_plan/ // Páginas del plan analítico
│   ├── format_syllabus_step_one/ // Primer paso del sílabo
│   ├── format_syllabus_step_two/ // Segundo paso del sílabo
│   ├── format_syllabus_step_three/ // Tercer paso del sílabo
│   ├── initial_document_upload/ // Página de carga inicial de documentos
│   ├── thematic_plan/ // Páginas del plan temático
│
├── router/ // Configuración de las rutas
│
├── styles/ // Estilos de la aplicación
│   ├── academic_cycle_form/ // Estilos del formulario del ciclo académico
│   ├── academic_preparation_container/ // Estilos del contenedor de preparación académica
│   ├── analytical_plan/ // Estilos del plan analítico
│   ├── date_input/ // Estilos del input de fecha
│   ├── footer/ // Estilos del pie de página
│   ├── format_syllabus/ // Estilos del sílabo
│   ├── header/ // Estilos del encabezado
│   ├── initial_document_upload/ // Estilos de la carga inicial de documentos
│   ├── navigation_buttons/ // Estilos de los botones de navegación
│
└── utils/ // Funciones utilitarias
```

## Aclaración de secciones

### components/

En esta carpeta se encuentran los diferentes componentes de la aplicación organizados en subcarpetas según su funcionalidad:

- **academic_cycle/:** Contiene los componentes relacionados con el ciclo académico.

- **analytical_plan/:** Componentes específicos para el procesamiento del plan analítico.

- **thematic_plan/:** Incluye los componentes usados en la etapa de procesamiento del plan temático.

### common/

En esta carpeta se encuentran los componentes compartidos entre diferentes secciones de la aplicación. Estos componentes pueden ser reutilizados dentro de varios contextos para evitar la redundancia y mejorar la mantenibilidad del código.

**Caso especial: academic_preparation_container**

Este componente está presente en las tres secciones anteriores **(academic_cycle, analytical_plan y thematic_plan)**, ya que es un contenedor que organiza la preparación académica dentro de los diferentes planes.

### format_syllabus/

Esta carpeta contiene los componentes necesarios para la fase posterior de la elaboración del sílabo, donde el usuario puede descargar el documento final. La sección de **"format_syllabus"** corresponde a los tres pasos de elaboración del syllabus.
