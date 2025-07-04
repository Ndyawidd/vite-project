import HomePage from "../pages/home/home-page";
import AboutPage from "../pages/about/about-page";
import RegisterPage from "../pages/auth/register-page";
import LoginPage from "../pages/auth/login-page";
import AddPage from "../pages/add/add-page.js";

const routes = {
  "/": new HomePage(),
  "/about": new AboutPage(),
  "/login": new LoginPage(),
  "/register": new RegisterPage(),
  "/add": new AddPage(),
};

export default routes;
