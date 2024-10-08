import { BrowserRouter, useNavigate } from "react-router-dom"
import SignIn from "../login/login"
import SignUp2 from "../login/register"
import { Route, Routes } from "react-router-dom";
import Header from "../header/header";
import ProfileComponent from "../profile/profile";
import SettingComponent from "../secureapplication/secureapplication";
import WellBeingPage from "../wellbeing/weelbeing";
import HeaCommunityPageder from "../community/community";
import CommunityPage from "../community/community";
import SafeZonePage from "../safezone/safezone";
import ProfileSettingsComponent from "../profilesettings/profileSettings";
import SafeZoneDetails from "../safezonedetails/safezone";
import MyProfileAlerts from "../profile/myprofilealerts";
const Home = ()=>{
   
   
return (
<>
{/* <Header/> */}
    <Routes>
    
  <Route path='/' element={<Header />}></Route>
  <Route path='/home' element={<h1>Home</h1>}></Route>
<Route path='/login' element={<SignIn />}></Route>
<Route path='/register' element={<SignUp2 />}></Route>
<Route path='/profile' element={<ProfileComponent />}></Route>
<Route path='/myalerts' element={<MyProfileAlerts />}></Route>
<Route path='/wellbeing' element={<WellBeingPage />}></Route>
<Route path='/community' element={<CommunityPage />}></Route>
<Route path='/safezones' element={<SafeZonePage />}></Route>
<Route path='/safezone/:id' element={<h1>Safe zone details</h1>}></Route>  {/* /products/:id */}
<Route path='/settings' element={<ProfileSettingsComponent />}></Route>
{/* <Route path='/settings1' element={<SettingComponent  middleContent={<CommunityPage />} />}></Route> */}
</Routes>
</>
   
)
}
export default Home