import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { api } from "../../apis/api";
import { errorHandler } from "../../utils/errorHandler";
import { Loading } from "../../components/Loading/Loading";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { ResendOTP } from "../../components/ResendOTP/ResendOTP";

// EndPoint => accept
export const VerifyOTP = () => {
  // States
  const [loading, setLoading] = useState(false);
  // Navigation
  const go = useNavigate();

  // Dispatch
  const dispatch = useDispatch();

  // Ref
  const otpRef = useRef();
  // Handlers
  async function handleVerifyOTP(ev) {
    ev.preventDefault();

    setLoading(true);

    try {
      const email = localStorage.getItem("email");

      if (!email) {
        toast.error("Invalid Code or Expired  ");
        // Redirect Login
        go("/login");

        return;
      }

      // Prepare Data
      const data = { otp: otpRef.current.value, email };

      // Call Endpoint
      const response = await api.post("/api/v1/auth/verify-otp", data);
      toast.success(response.data.message);

      // Store Token LocalStorage
      localStorage.setItem("token", response.data.token);

      // Store User Data
      dispatch(setUser(response.data.user));

      toast.success(response.data.message);

      // Redirect Home
      go("/");
    } catch (error) {
      // Handle Error
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <Form onSubmit={handleVerifyOTP}>
        <Form.Group className="mb-4">
          <Form.Label htmlFor="otp-code">Enter OTP Code</Form.Label>
          <Form.Control
            type="text"
            id="otp-code"
            name="otp-code"
            placeholder="CODE"
            maxLength={6}
            ref={otpRef}
          />
        </Form.Group>

        <div className="d-flex align-items-center gap-2">
          <Button type="submit">Verfiy</Button>
          <ResendOTP />
        </div>
      </Form>
    </div>
  );
};
