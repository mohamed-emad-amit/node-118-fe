import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Container } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import { VerifyOTP } from "./pages/VerifyOTP/VerifyOTP";

export default function App() {
  return (
    <div>
      {/* Global Navbar */}
      <Navbar />
      {/* Toaster */}
      <Toaster position="top-left" />

      {/* Routes */}
      <Container className="my-3 py-3">
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />

          {/* OTP Routes */}
          <Route path="/verify-otp" Component={VerifyOTP} />
        </Routes>
      </Container>
    </div>
  );
}
