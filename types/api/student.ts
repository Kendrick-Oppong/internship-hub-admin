import { ApiPaginatedResponse } from "../common/pagination";

export interface StudentProfile {
  id: string;
  userProfileId: string;
  indexNumber: string;
  faculty: string;
  department: string;
  programme: string;
  level: string | null;
  session: string;
  certificateType: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentAuth {
  email: string;
  verifiedAt: string | null;
  isActive: boolean;
}

export interface Student {
  id: string;
  authId: string;
  firstName: string;
  lastName: string;
  role: string;
  staffId: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
  studentProfile: StudentProfile;
  auth: StudentAuth;
}

export type StudentsResponse = ApiPaginatedResponse<Student[]>;
