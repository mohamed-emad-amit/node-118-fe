import React, { useRef, useState } from "react";
import { errorHandler } from "../../utils/errorHandler";
import { Button, Form } from "react-bootstrap";
import { api } from "../../apis/api";
import toast from "react-hot-toast";

export const ForgotPassword = () => {
  // States
  const [loading, setLoading] = useState(false);
  // Ref
  const emailRef = useRef();

  // Handlers
  async function handleForgotPassword(ev) {
    ev.preventDefault();

    setLoading(true);

    try {
      // Prepare Data
      const data = {
        email: emailRef.current.value,
      };

      // Call EndPoint
      const response = await api.post("/api/v1/auth/forgot-password", data);
      toast.success(response.data.message);

      // Reset Email
      emailRef.current.value = "";
    } catch (error) {
      console.log(error);
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>ForgotPassword</h1>
      <Form onClick={handleForgotPassword}>
        <Form.Group className="mb-4">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email"
            ref={emailRef}
          />
        </Form.Group>

        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Reset Password"}
        </Button>
      </Form>
    </div>
  );
};
