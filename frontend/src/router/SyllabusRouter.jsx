import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import InitialDocumentUpload from "@pages/initial_document_upload/InitialDocumentUpload";

const SyllabusRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/upload-document" />}></Route>
        <Route path="/upload-document" element={<InitialDocumentUpload />} />
      </Routes>
    </Router>
  );
};

export default SyllabusRouter;
