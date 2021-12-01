import Home from "./pages/Home";
import Major from "./pages/Major";
import Student from "./pages/Student";
import MajorEdit from "./pages/MajorEdit";
import StudentEdit from "./pages/StudentEdit";
// import { Instructor } from "./pages/Instructor";
import { Instructor2 } from "./pages/Instructor2";
import { InstructorEdit } from "./pages/InstructorEdit";

const routes = [
  { path: "/", component: <Home /> },
  { path: "/home", component: <Home /> },
  { path: "/major", component: <Major /> },
  { path: "/major/:id", component: <MajorEdit /> },
  { path: "/student", component: <Student /> },
  { path: "/student/:id", component: <StudentEdit /> },
  // { path: "/instructor/", component: <Instructor /> },
  { path: "/instructor/", component: <Instructor2 /> },
  { path: "/instructor/:id", component: <InstructorEdit /> },
];
export default routes;
