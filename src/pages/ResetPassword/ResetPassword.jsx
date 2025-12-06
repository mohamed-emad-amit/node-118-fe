import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { errorHandler } from "../../utils/errorHandler";
import { api } from "../../apis/api";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";

export const ResetPassword = () => {
  // States
  const [loading, setLoading] = useState(false);
  // Ref
  const newPasswordRef = useRef();
  // Navigation
  const go = useNavigate();

  // Params
  const { token } = useParams();

  // Handlers
  async function handleResetPassword(ev) {
    ev.preventDefault();
    setLoading(true);
    try {
      // Prepare Data
      const data = { token, newPassword: newPasswordRef.current.value };
      // Call EndPoint
      const response = await api.post("/api/v1/auth/reset-password", data);
      toast.success(response.data.message);

      // Redirect Login
      go("/login");
    } catch (error) {
      console.log(error);
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <h1>Reset Password</h1>
      <Form onSubmit={handleResetPassword}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">New Password</Form.Label>
          <Form.Control
            ref={newPasswordRef}
            type="password"
            name="password"
            placeholder="Type New Password"
            id="password"
          />
        </Form.Group>

        <Button disabled={loading} type="submit">
          {loading ? "Loading..." : "Reset Password"}
        </Button>
      </Form>
    </div>
  );
};
