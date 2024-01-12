import Profile from "@/scenes/profile";
import NavigationBar from "@/scenes/navigationBar";
import FindRider from "@/scenes/findRider";
import FindDriver from "@/scenes/findDriver";
import History from "@/scenes/history";
import Schedule from "@/scenes/schedule";
import Settings from "@/scenes/settings";
import { useState } from "react";
import { SelectedPage } from "./shared/types";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Profile
  );

  // CHANGE THIS TO WORK ON SPECIFIC PAGE WHILE NAVBAR IS BEING FINISHED
  const page = <Profile />;

  return (
    <div className='app bg-primary-blue'>
      <BrowserRouter>
        <NavigationBar 
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          page = {page}
        />
        <Routes>
          <Route index element={page} />
          <Route path="/" element={<Profile />}/>
          <Route path="/history" element={<History userRole="driver" />} /> {/* "driver" or "passenger" */}
          <Route path="/settings" element={<Settings />}/>
          <Route path="/findDriver" element={<FindDriver />}/>
          <Route path="/findRider" element={<FindRider />}/>
          <Route path="/schedule" element={<Schedule />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
