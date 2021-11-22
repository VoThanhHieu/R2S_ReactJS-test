import Home from "./pages/Home";
import Major from "./pages/Major";
import Student from "./pages/Student";
import MajorEdit from "./pages/MajorEdit";
import StudentEdit from "./pages/StudentEdit";

const routes = [
  { path: "/", component: <Home /> },
  { path: "/home", component: <Home /> },
  { path: "/major", component: <Major /> },
  { path: "/major/:id", component: <MajorEdit /> },
  { path: "/student", component: <Student /> },
  { path: "/student/:id", component: <StudentEdit /> },
];
export default routes;
