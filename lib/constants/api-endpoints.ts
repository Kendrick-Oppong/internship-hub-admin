export const API_ENDPOINTS = {
  AUTH: {
    REGISTER_STUDENT: "/auth/student/register",
    VERIFY_EMAIL: "/auth/verify-email",
    RESEND_VERIFICATION: "/auth/resend-verification",
    LOGIN: "/auth/login",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    REFRESH_TOKEN: "/auth/refresh",
    SESSION: "/auth/session",
    LOGOUT: "/auth/logout",
    CHANGE_PASSWORD: "/auth/change-password",

    SUPERVISOR: {
      INVITE: "/auth/supervisor/invite",
      LIST: "/auth/supervisors",
      GET_BY_ID: (id: string | number) => `/auth/supervisor/${id}`,
      UPDATE_STATUS: (id: string | number) => `/auth/supervisor/${id}/status`,
    },
  },
  PROFILE: {
    GET_PROFILE: "/profile",
    UPDATE_PROFILE: (id: string | number) => `/profile/admin/${id}`,
    UPLOAD_PROFILE_PICTURE: "/profile/upload",
    STUDENTS: "/profile/students",
    STUDENT_DETAIL: (id: string) => `/profile/students/${id}`,
  },
  INTERNSHIP: {
    PERIODS: "/internship-periods",
  },
  SUPERVISION: {
    STATS_OVERALL: "/supervision/stats/overall",
    PROGRESS_CHART: "/supervision/stats/progress-chart",
    PIE_CHART: "/supervision/stats/pie-chart",
    ACTIVITIES: "/supervision/stats/activities",
    MAP_MARKERS: "/supervision/stats/map-markers",
  },
  ZONES: {
    BASE: "/zones",
    BY_ID: (id: string) => `/zones/${id}`,
  },
};

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
