import { useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// EndPoint => accept email and password

export const Register = () => {
  // State
  const [showPassword, setShowPassword] = useState(false);

  // Refs
  const emailRef = useRef();
  const passwordRef = useRef();

  // Handlers
  async function handleRegister(ev) {
    ev.preventDefault();

    try {
      // Data
      const data = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      // [TODO]: Not Implement Yet
      // Call EndPoint
    } catch (error) {
      console.log(error);
    }
  }

  function handleTogglePassword() {
    setShowPassword((prev) => !prev);
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
