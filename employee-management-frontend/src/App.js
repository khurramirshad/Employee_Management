import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/AppTheme";
import { CssBaseline } from "@mui/material";

import { Routes, Route, useLocation } from "react-router-dom";

import SignUp from "./components/login-signup/SignUp";
import Login from "./components/login-signup/Login";
import NavBar from "./components/navigation-bar/NavBar";
import LandingPage from "./pages/LandingPage";
import EmployeeForm from "./components/form/EmployeeForm";

function App() {
  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {location.pathname === "/" || location.pathname === "/signup" ? null : (
        <NavBar />
      )}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/landingPage" element={<LandingPage />} />
        <Route path="/employeeForm" element={<EmployeeForm />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
