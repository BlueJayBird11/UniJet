import Profile from "@/scenes/profile";
import NavigationBar from "@/scenes/navigationBar";
import FindRider from "@/scenes/findRider";
import FindDriver from "@/scenes/findDriver";
import History from "@/scenes/history";
import Schedule from "@/scenes/schedule";
import { useState } from "react";
import { SelectedPage } from "./shared/types";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Profile
  );
  const Page = <Profile />;
  return (
    <div className='app bg-primary-blue'>
      <NavigationBar 
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
      <BrowserRouter>
        <Routes>
          <Route index element={Page} />
          <Route path="@/scenes/profile" element={<Profile />}/>
          <Route path="@/scenes/history" element={<History />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
