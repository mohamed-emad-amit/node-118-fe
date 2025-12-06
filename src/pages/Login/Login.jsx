import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Loading } from "../../components/Loading/Loading";
import { errorHandler } from "../../utils/errorHandler";
import { api } from "../../apis/api";
import toast from "react-hot-toast";
import { setUser } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  // State
  const [loading, setLoading] = useState(false);
  // Refs
  const emailRef = useRef();
  const passwordRef = useRef();

  // Dispatch
  const dispatch = useDispatch();

  // Navigation
  const go = useNavigate();

  // Handlers
  async function handleLogin(ev) {
    ev.preventDefault();

    setLoading(true);

    try {
      // Prepare Data
      const data = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      // Call EndPoint
      const response = await api.post("/api/v1/auth/login", data);
      const { token, message, user } = response.data;

      // Store Token LocalStorage
      localStorage.setItem("token", token);

      // Store User Data
      dispatch(setUser(user));

      toast.success(message);

      // Redirect Home
      go("/");
    } catch (error) {
      if (error.response?.data?.isVerified === false) {
        // Save Email LocalStorage
        localStorage.setItem("email", error.response.data.email);

        // Redirect Verify OTP
        go("/verify-otp");
      }

      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading />;

  return (
    <div>
      <h1>Login</h1>

      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-4">
          <Form.Label htmlFor="email">Email address</Form.Label>
          <Form.Control
            type="email"
            id="email"
            placeholder="Enter email"
            name="email"
            ref={emailRef}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            placeholder="Enter password"
            name="password"
            ref={passwordRef}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Link to="/register">Don't have an account? Register</Link>
        </Form.Group>
        
        <Form.Group className="mb-4">
          <Link to="/forgot-password">Forgot Password</Link>
        </Form.Group>

        <Button type="submit" variant="outline-primary">
          Login
        </Button>
      </Form>
    </div>
  );
};
