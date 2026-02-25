import { api } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/constants/api-endpoints";
import { StudentUpdateValues } from "@/lib/validations/forms/student-update";
import { StudentsResponse, Student } from "@/types/api/student";
import { ApiQueryParams } from "@/types/common/filter-config";

export const studentApi = {
  getAllStudents: async (params: ApiQueryParams) => {
    const response = await api.get<StudentsResponse>(
      API_ENDPOINTS.PROFILE.STUDENTS,
      { params }
    );
    return response.data;
  },
  getStudentById: async (id: string) => {
    const response = await api.get<Student>(
      API_ENDPOINTS.PROFILE.STUDENT_DETAIL(id)
    );
    return response.data;
  },
  updateStudentProfile: async (userId: string, data: StudentUpdateValues) => {
    const response = await api.patch(
      API_ENDPOINTS.PROFILE.UPDATE_PROFILE(userId),
      data
    );
    return response.data;
  },
};
