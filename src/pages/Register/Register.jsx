import { useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { api } from "../../apis/api";
import toast from "react-hot-toast";
import { Loading } from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

// EndPoint => accept email and password

export const Register = () => {
  // State
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Navigation
  const go = useNavigate();

  // Refs
  const emailRef = useRef();
  const passwordRef = useRef();

  // Handlers
  async function handleRegister(ev) {
    ev.preventDefault();

    setLoading(true);

    try {
      // Data
      const data = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      // [TODO]: Not Implement Yet
      // Call EndPoint
      const response = await api.post("/api/v1/auth/register", data);
      toast.success(response.data.message);

      // Redirect Verify Email
      go("/verify-otp");
    } catch (error) {
      // Handle Error Messages []
      if (error.response?.data?.messages) {
        error.response?.data?.messages.forEach((message) => {
          toast.error(message);
        });
      }
      // Handle Error Message
      else if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
      // Default Message
      else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleTogglePassword() {
    setShowPassword((prev) => !prev);
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <h1>Register</h1>

      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-4">
          <Form.Label htmlFor="email">Email</Form.Label>

          <Form.Control
            type="email"
            id="email"
            name="email"
            placeholder="Type Email"
            ref={emailRef}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label htmlFor="password">Password</Form.Label>

          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Type Strong Password"
              ref={passwordRef}
            />
            <InputGroup.Text
              style={{ cursor: "pointer" }}
              onClick={handleTogglePassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Button type="submit">Register</Button>
      </Form>
    </>
  );
};
