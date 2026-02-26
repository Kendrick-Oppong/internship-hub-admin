import { api } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/constants/api-endpoints";
import {
  ForgotPasswordValues,
  LoginValues,
  RegisterStudentValues,
  ResendVerificationValues,
  ResetPasswordValues,
  VerifyEmailValues,
  ChangePasswordValues,
  InviteSupervisorValues,
} from "@/lib/validations/forms/auth";
import { LoginResponse } from "@/types/api/auth";
import { InviteSupervisorResponse } from "@/types/api/supervisor";

export const authMutationsApi = {
  login: async (data: LoginValues) => {
    const response = await api.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
    return response.data;
  },

  registerStudent: async (data: RegisterStudentValues) => {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER_STUDENT, data);
    return response.data;
  },

  verifyEmail: async (data: VerifyEmailValues) => {
    const response = await api.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, data);
    return response.data;
  },

  resendVerification: async (data: ResendVerificationValues) => {
    const response = await api.post(
      API_ENDPOINTS.AUTH.RESEND_VERIFICATION,
      data
    );
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordValues) => {
    const response = await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...payload } = data;
    const response = await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, payload);
    return response.data;
  },

  changePassword: async (data: ChangePasswordValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...payload } = data;
    const response = await api.post(
      API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
      payload
    );
    return response.data;
  },

  logout: async () => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  },

  inviteSupervisor: async (data: InviteSupervisorValues) => {
    const response = await api.post<InviteSupervisorResponse>(
      API_ENDPOINTS.AUTH.SUPERVISOR.INVITE,
      data
    );
    return response.data;
  },
};
