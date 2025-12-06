import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Container } from "react-bootstrap";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div>
      {/* Global Navbar */}
      <Navbar />
      {/* Toaster */}
      <Toaster position="top-right" />

      {/* Routes */}
      <Container className="my-3 py-3">
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
        </Routes>
      </Container>
    </div>
  );
}
