import { BrowserRouter, Link } from "react-router-dom"

const Header = ()=>{
return (

<div>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
    <Link to="/profile">Profile</Link>

</div>
)
}
export default Header