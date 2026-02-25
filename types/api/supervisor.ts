import { ApiPaginatedResponse } from "../common/pagination";

export interface SupervisorProfile {
  id: string;
  userProfileId: string;
  department: string;
  phoneNumber: string | null;
  specialization: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SupervisorAuth {
  email: string;
  isActive: boolean;
  verifiedAt: string | null;
  lastLoginAt: string | null;
}

export interface Supervisor {
  id: string;
  authId: string;
  firstName: string;
  lastName: string;
  role: "SUPERVISOR";
  staffId: string;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
  auth: SupervisorAuth;
  supervisorProfile: SupervisorProfile;
}

export type SupervisorsResponse = ApiPaginatedResponse<Supervisor[]>;
