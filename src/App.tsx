import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import CoursePage from "@/pages/course/CoursePage";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<CoursePage />} path="/course" />
    </Routes>
  );
}

export default App;
