import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CreateStudent from "./pages/Student/CreateStudent";
import CreateTeacher from "./pages/Teacher/CreateTeacher";
import Home from './pages/Home'


function App() {
  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student/create" element={<CreateStudent />} />
          <Route path="/teacher/create" element={<CreateTeacher />} />
        </Routes>
      </BrowserRouter>
    
    </>

    
  );
}

export default App;
