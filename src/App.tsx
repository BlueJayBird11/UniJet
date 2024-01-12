import Profile from "@/scenes/profile";
import NavigationBar from "@/scenes/navigationBar";
import FindRider from "@/scenes/findRider";
import FindDriver from "@/scenes/findDriver";
import History from "@/scenes/history";
import Schedule from "@/scenes/schedule";
import Settings from "@/scenes/settings";
import DeleteAccount from "./scenes/settings/deleteAccount";
import EditEmail from "./scenes/settings/editEmail";
import EditName from "./scenes/settings/editName";
import EditPaymentMethod from "./scenes/settings/editPaymentMethod";
import EditUniversity from "./scenes/settings/editUniversity";
import Logout from "./scenes/settings/logout";
import { useState } from "react";
import { SelectedPage } from "./shared/types";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Profile
  );
  
  // CHANGE THIS TO WORK ON SPECIFIC PAGE WHILE NAVBAR IS BEING FINISHED
  const page = <Profile 
                  selectedPage={selectedPage}
                  setSelectedPage={setSelectedPage}
                />;

  return (
    <div className='app bg-primary-blue'>
      <BrowserRouter>
        <NavigationBar 
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
        <Routes>
          <Route index element={page} />
          <Route path="/" element={<Profile 
                                      selectedPage={selectedPage}
                                      setSelectedPage={setSelectedPage}
                                    />}/>
          <Route path="/history" element={<History />}/>
          <Route path="/settings" element={<Settings />}/>
          <Route path="/findDriver" element={<FindDriver />}/>
          <Route path="/findRider" element={<FindRider />}/>
          <Route path="/schedule" element={<Schedule />}/>

          <Route path="/delete-account" element={<DeleteAccount />} />
          <Route path="/edit-email" element={<EditEmail />} />
          <Route path="/edit-name" element={<EditName />} />
          <Route path="/edit-payment-method" element={<EditPaymentMethod />} />
          <Route path="/edit-university" element={<EditUniversity />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
