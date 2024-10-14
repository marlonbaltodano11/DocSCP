import "@fonts/font-import.css";
import "@styles/base-styles.css";
import InitialLoadingAnimation from "@components/animations/InitialLoadingAnimation.jsx";
import DataLoadingAnimation from "@components/animations/DataLoadingAnimation";

function App() {
  return (
    <>
      <DataLoadingAnimation></DataLoadingAnimation>
    </>
  );
}

export default App;
