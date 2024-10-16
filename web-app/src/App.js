import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Home from "./components/home/home";
import { Route, Routes } from "react-router-dom";
import SettingComponent from "./components/secureapplication/secureapplication";
import SignIn from "./components/login/login";
import SignUp2 from "./components/login/register";
import ProfileComponent from "./components/profile/profile";
import WellBeingPage from "./components/wellbeing/wellbeing2";
import CommunityPage from "./components/community/community";
import SafeZonePage from "./components/safezone/safezone";
import ProfileSettingsComponent from "./components/profilesettings/profileSettings";
import Header from "./components/header/header";
import DashBoardComponent from "./components/dashboard/dashboard";
import AlertsComponent from "./components/alerts/alerts";
import SafeZoneDetails from "./components/safezonedetails/safezone";
import AddNewSafeZone from "./components/safezonedetails/addSafeZone";
import MyProfileAlerts from "./components/profile/myprofilealerts";
import ForgetPassword from "./components/login/ForgetPassword";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<SignIn />}></Route>
                <Route path="/register" element={<SignUp2 />}></Route>
                <Route
                    path="/forgotPassword"
                    element={<ForgetPassword />}
                ></Route>
                <Route path="/*" element={<SettingComponent />}>
                    <Route path="" element={<DashBoardComponent />}></Route>
                    <Route path="home" element={<DashBoardComponent />}></Route>
                    <Route path="alerts" element={<AlertsComponent />}></Route>
                    <Route
                        path="myalerts"
                        element={<MyProfileAlerts />}
                    ></Route>
                    {/* <Route path='profile' element={<ProfileCo mponent />}></Route> */}
                    <Route
                        path="profile"
                        element={<ProfileSettingsComponent />}
                    ></Route>
                    <Route path="wellbeing" element={<WellBeingPage />}></Route>
                    <Route path="community" element={<CommunityPage />}></Route>
                    <Route path="safezones" element={<SafeZonePage />}></Route>
                    <Route
                        path="add-safeozne"
                        element={<AddNewSafeZone />}
                    ></Route>
                    <Route
                        path="safezone/:id"
                        element={<SafeZoneDetails />}
                    ></Route>
                    <Route
                        path="settings"
                        element={<ProfileSettingsComponent />}
                    ></Route>
                </Route>
            </Routes>

            {/* <SettingComponent /> */}
        </BrowserRouter>
    );
}

export default App;
