import { Route, Routes } from "react-router-dom";

import CoursePage from "@/pages/course/CoursePage";

function App() {
  return (
    <Routes>
      <Route element={<CoursePage />} path="/" />
    </Routes>
  );
}

export default App;
