import "@fonts/font-import.css";
import "@styles/base-styles.css";
import SyllabusRouter from "@router/SyllabusRouter";
import GlobalProvider from "./global_context/GlobalProvider";

function App() {
  return (
    <>
      <GlobalProvider>
        <SyllabusRouter></SyllabusRouter>
      </GlobalProvider>
    </>
  );
}

export default App;
