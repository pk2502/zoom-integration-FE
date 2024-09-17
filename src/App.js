import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MeetingForm from "./pages/MeetingForm";
import ZoomMeeting from "./pages/ZoomMeeting";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/meeting" element={<MeetingForm />} />
      <Route path="/join-meeting/:id" element={<ZoomMeeting />} />
    </Routes>
  );
};
export default App;
