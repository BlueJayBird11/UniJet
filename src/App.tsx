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
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Profile
  );

  // CHANGE THIS TO WORK ON SPECIFIC PAGE WHILE NAVBAR IS BEING FINISHED
  const page = <Profile />;
  
  return (
    <div className='app bg-primary-blue'>
      <NavigationBar 
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        page = {page}
      />
      
      <BrowserRouter>
        <Routes>
          <Route index element={page} />
          <Route path="/" element={<Profile />}/>
          <Route path="/history" element={<History />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
