import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import InitialDocumentUpload from "@pages/initial_document_upload/InitialDocumentUpload";
import DataLoadingAnimation from "../components/animations/DataLoadingAnimation";
import InitialLoadingAnimation from "../components/animations/InitialLoadingAnimation";
import AcademicCycle from "@pages/academic_cycle/AcademicCycle";
import AnalyticalPlan from "@pages/analytical_plan/AnalyticalPlan";
import { ThematicPlan } from "@pages/thematic_plan/ThematicPlan";
import FormatSyllabusStepOne from "@pages/format_syllabus_step_one/FormatSyllabusStepOne";
import FormatSyllabusStepTwo from "@pages/format_syllabus_step_two/FormatSyllabusStepTwo";
import FormatSyllabusStepThree from "@pages/format_syllabus_step_three/FormatSyllabusStepThree";

const SyllabusRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<InitialLoadingAnimation></InitialLoadingAnimation>}
        ></Route>
        <Route path="/upload-document" element={<InitialDocumentUpload />} />
        <Route path="/academic-cycle" element={<AcademicCycle />} />
        <Route path="/analytical-plan" element={<AnalyticalPlan />} />
        <Route path="/thematic-plan" element={<ThematicPlan />} />
        <Route
          path="/format-syllabus/step_1"
          element={<FormatSyllabusStepOne />}
        />
        <Route
          path="/format-syllabus/step_2"
          element={<FormatSyllabusStepTwo />}
        />
        <Route
          path="/format-syllabus/step_3"
          element={<FormatSyllabusStepThree />}
        />
        <Route
          path="/anim"
          element={<DataLoadingAnimation></DataLoadingAnimation>}
        ></Route>
        <Route
          path="/anim2"
          element={<InitialLoadingAnimation></InitialLoadingAnimation>}
        ></Route>
        <Route path="*" element={<Navigate to="/upload-document" replace />} />
      </Routes>
    </Router>
  );
};

export default SyllabusRouter;
