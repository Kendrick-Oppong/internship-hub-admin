import { useMutation } from "@tanstack/react-query";
import { authMutationsApi } from "@/lib/api/mutations/auth";
import { toast } from "@/lib/providers/toaster";
import { useRouter } from "next/navigation";
import {
  ForgotPasswordValues,
  LoginValues,
  RegisterStudentValues,
  ResendVerificationValues,
  VerifyEmailValues,
} from "@/lib/validations/forms/auth";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginValues) => authMutationsApi.login(data),
    onSuccess: (data) => {
      toast.success(data.message || "Logged in successfully");
      router.push("/dashboard"); // Adjust destination as needed
    },
    onError: (error) => {
      console.error("Login error:", error);
      toast.error(error.message || "Failed to login");
    },
  });
};

export const useRegisterStudent = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterStudentValues) =>
      authMutationsApi.registerStudent(data),
    onSuccess: (data, variables) => {
      toast.success(data.message || "Registration successful");
      // Pass email to verify page via query param
      const params = new URLSearchParams();
      params.set("email", variables.email);
      router.push(`/auth/verify-email?${params.toString()}`);
    },
    onError: (error) => {
      console.error("Registration error:", error);
      toast.error(error.message || "Failed to register");
    },
  });
};

export const useVerifyEmail = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: VerifyEmailValues) => authMutationsApi.verifyEmail(data),
    onSuccess: (data) => {
      toast.success(data.message || "Email verified successfully");
      router.push("/auth/login");
    },
    onError: (error) => {
      console.error("Verification error:", error);
      toast.error(error.message || "Failed to verify email");
    },
  });
};

export const useResendVerification = () => {
  return useMutation({
    mutationFn: (data: ResendVerificationValues) =>
      authMutationsApi.resendVerification(data),
    onSuccess: (data) => {
      toast.success(data.message || "Verification code sent");
    },
    onError: (error) => {
      console.error("Resend verification error:", error);
      toast.error(error.message || "Failed to resend code");
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordValues) =>
      authMutationsApi.forgotPassword(data),
    onSuccess: (data) => {
      toast.success(data.message || "Password reset link sent to your email");
    },
    onError: (error) => {
      console.error("Forgot password error:", error);
      toast.error(error.message || "Failed to send reset link");
    },
  });
};
