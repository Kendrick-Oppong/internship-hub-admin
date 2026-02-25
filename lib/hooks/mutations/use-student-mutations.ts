import { useMutation, useQueryClient } from "@tanstack/react-query";
import { studentApi } from "@/lib/api/queries/student";
import { toast } from "@/lib/providers/toaster-provider";
import { StudentUpdateValues } from "@/lib/validations/forms/student-update";
import { Query_Keys } from "@/lib/constants/query-keys";

export const useUpdateStudentProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: string;
      data: StudentUpdateValues;
    }) => {
      return studentApi.updateStudentProfile(userId, data);
    },

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: Query_Keys.students.byId(variables.userId),
      });
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Student profile updated successfully");
    },

    onError: (err) => {
      toast.error(err.message || "Failed to update student profile");
    },
  });
};
