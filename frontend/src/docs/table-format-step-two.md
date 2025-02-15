# Lógica del Truncamiento de Dos Filas y Colocación de Botones en la Microplanificación

## Introducción

El componente `FormatSyllabusStepTwo` renderiza una tabla de microplanificación con datos provenientes del estado global. Se debe manejar el truncamiento de las dos últimas columnas y la correcta colocación de los botones de acción, asegurando también el correcto tratamiento de filas especiales para exámenes.

---

## 1. Identificación de Filas de Examen

Las filas de examen tienen una estructura específica:

- Contienen solo dos celdas.
- La segunda celda incluye la palabra "examen".
- Se expanden en la tabla ocupando todas las columnas.

### Implementación:

```jsx
const isExamRow = row.length === 2 && row[1].toLowerCase().includes("examen");
```

Si se detecta una fila de examen, esta se renderiza con `colSpan` para abarcar todas las columnas visibles.

---

## 2. Manejo de la Altura del `textarea`

Para asegurar que los `textarea` se ajusten a su contenido:

```jsx
const adjustTextareaHeight = (textarea) => {
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
};
```

Esta función es ejecutada en un `useEffect` para recalcular la altura de los `textarea` cuando cambia la tabla:

```jsx
useEffect(() => {
  const textareas = document.querySelectorAll(".microplanning-textarea");
  textareas.forEach((textarea) => adjustTextareaHeight(textarea));
}, [microplanningTable]);
```

---

## 3. Truncamiento de las Dos Últimas Columnas

Las dos últimas columnas se ocultan y en su lugar se muestra un botón que abre un modal para editar el contenido.

### Implementación:

Se determina si una columna pertenece a las últimas cuatro:

```jsx
const isLastFourColumns = colIndex >= row.slice(0, row.length - 2).length - 4;
```

Si es así, el `textarea` se desactiva y muestra un placeholder explicativo:

```jsx
placeholder={
  isLastFourColumns && row.length > 6
    ? "Click en el botón de la esquina superior derecha para agregar elementos deseados"
    : "Click para escribir"
}
```

Además, se añade un modal de edición:

```jsx
{
  isLastFourColumns && row.length > 6 ? (
    <FormatSyllabusModal
      icon={BtnSingleModal}
      title="Editar Elemento"
      typeTitle="(unitario)"
      mode="individual"
      columnKey={ColumnCheckboxListKeys[colIndex - 3]}
      rowIndex={rowIndex}
      colIndex={colIndex}
      onConfirm={(selectedCheckboxes) => {
        const updatedTable = [...microplanningTable];
        selectedCheckboxes.forEach((checkbox) => {
          if (!updatedTable[rowIndex][colIndex].includes(checkbox)) {
            updatedTable[rowIndex][colIndex] += updatedTable[rowIndex][colIndex]
              ? `, ${checkbox}`
              : checkbox;
          }
        });
        dispatch({
          type: "UPDATE_FORMAT_SYLLABUS",
          payload: { key: "microplanningTable", value: updatedTable },
        });
      }}
    />
  ) : null;
}
```

Este modal permite seleccionar valores predefinidos y agregarlos al `textarea` sin necesidad de editarlo manualmente.

---

## 4. Sincronización con el Estado Global

Cada cambio en una celda debe reflejarse en el estado global:

```jsx
const handleCellChange = (rowIndex, colIndex, value) => {
  const updatedTable = [...microplanningTable];
  updatedTable[rowIndex][colIndex] = value;
  dispatch({
    type: "UPDATE_FORMAT_SYLLABUS",
    payload: { key: "microplanningTable", value: updatedTable },
  });
};
```

Esto permite que los datos persistan entre cambios de vista y recargas de la página.

---
