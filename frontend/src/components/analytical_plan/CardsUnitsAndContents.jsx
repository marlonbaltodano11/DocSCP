import PropTypes from "prop-types";
import { romanNumber } from "../../json/RomansNumbers";

const CardsUnitsAndContents = ({ UnitsData, onDeleteUnit, onEditUnit }) => {
  return (
    <>
      {UnitsData.map((unit, index) => (
        <article className="card-units-content-container" key={index}>
          <section className="unit-input-container">
            <h3>Nombre de la Unidad: </h3>
            <input
              value={`${romanNumber[index]}. ${unit.unitName.replace(
                new RegExp(`^${romanNumber[index]}\\.\\s*`),
                ""
              )}`}
              placeholder="Escribe aquí..."
              type="text"
              onChange={(e) => {
                const updatedValue = e.target.value.replace(
                  new RegExp(`^${romanNumber[index]}\\.\\s*`),
                  ""
                );
                onEditUnit(index, "unitName", updatedValue);
              }}
            />
          </section>
          <section className="unit-input-container with-textarea">
            <h3>Temas en la Unidad:</h3>
            <textarea
              placeholder="Escribe aquí..."
              value={unit.topics
                .map((topic, i) => `${i + 1}. ${topic}`) // Añadir numeración visualmente
                .join("\n")}
              onChange={(e) => {
                // Eliminar numeración y actualizar el estado solo con el contenido de cada línea
                const updatedTopics = e.target.value
                  .split("\n")
                  .map((line) => line.replace(/^\d+\.\s*/, "")); // Eliminar prefijo de numeración
                onEditUnit(index, "topics", updatedTopics);
              }}
            />
          </section>
          <button
            className="delete-unit-button"
            onClick={() => onDeleteUnit(index)}
          >
            <i className="icon-delete-button"></i>
          </button>
        </article>
      ))}
    </>
  );
};

export default CardsUnitsAndContents;

CardsUnitsAndContents.propTypes = {
  UnitsData: PropTypes.arrayOf(
    PropTypes.shape({
      unitName: PropTypes.string,
      topics: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  onDeleteUnit: PropTypes.func.isRequired,
  onEditUnit: PropTypes.func.isRequired,
};

CardsUnitsAndContents.defaultProps = {
  UnitsData: [
    {
      unitName: "",
      topics: [""],
    },
  ],
  onDeleteUnit: () => {},
  onEditUnit: () => {},
};
