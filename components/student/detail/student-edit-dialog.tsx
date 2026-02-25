import { ReactNode, useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Calendar as CalendarIcon,
  Loader,
  User,
  GraduationCap,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Student } from "@/types/api/student";
import {
  studentUpdateSchema,
  StudentUpdateValues,
} from "@/lib/validations/forms/student-update";
import { useUpdateStudentProfile } from "@/lib/hooks/mutations/use-student-mutations";

interface StudentEditDialogProps {
  children: ReactNode;
  student: Student;
  onCloseDialog?: () => void;
}

export const StudentEditDialog = ({
  children,
  student,
  onCloseDialog,
}: StudentEditDialogProps) => {
  const [open, setOpen] = useState(false);
  const updateMutation = useUpdateStudentProfile();

  const isProcessing = updateMutation.isPending;

  const getFormValues = useCallback(() => {
    const profile = student.studentProfile;
    return {
      profile: {
        firstName: student.firstName,
        lastName: student.lastName,
      },
      studentProfile: {
        faculty: profile.faculty,
        department: profile.department,
        programme: profile.programme,
        level: profile.level || "",
        gender: profile.gender,
        dateOfBirth: profile.dateOfBirth
          ? new Date(profile.dateOfBirth)
          : undefined,
        phoneNumber: profile.phoneNumber,
      },
    };
  }, [student]);

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(studentUpdateSchema),
    defaultValues: getFormValues(),
  });

  useEffect(() => {
    if (open) {
      reset(getFormValues());
    }
  }, [open, reset, getFormValues]);

  const onSubmit = async (data: StudentUpdateValues) => {
    console.log("Transformed Submit Data:", data);

    updateMutation.mutate(
      { userId: student.id, data: data as StudentUpdateValues },
      {
        onSuccess: () => {
          setOpen(false);
          if (onCloseDialog) onCloseDialog();
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (isProcessing) return;
        setOpen(isOpen);
        if (!isOpen && onCloseDialog) onCloseDialog();
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent disableClose={isProcessing} className="max-w-2xl p-4">
        <DialogHeader>
          <DialogTitle>Edit Student Profile</DialogTitle>
          <DialogDescription>
            Update the student's personal and academic information.
          </DialogDescription>
        </DialogHeader>

        <form
          id="student-edit-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 py-4 max-h-[55vh] overflow-y-auto px-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Info Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold flex items-center gap-2 text-slate-900 pb-2 border-b">
                <User size={16} className="text-primary" /> Personal Information
              </h4>
              <FieldGroup>
                <Controller
                  control={control}
                  name="profile.firstName"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="flex items-center gap-1">
                        First Name
                      </FieldLabel>
                      <Input
                        {...field}
                        disabled={isProcessing}
                        className="h-11 rounded-xl border border-gray-400"
                      />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name="profile.lastName"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="flex items-center gap-1">
                        Last Name
                      </FieldLabel>
                      <Input
                        {...field}
                        disabled={isProcessing}
                        className="h-11 rounded-xl border border-gray-400"
                      />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name="studentProfile.gender"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="flex items-center gap-1">
                        Gender
                      </FieldLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value ?? undefined}
                        disabled={isProcessing}
                      >
                        <SelectTrigger className="h-11! rounded-xl border border-gray-400">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MALE">Male</SelectItem>
                          <SelectSeparator />
                          <SelectItem value="FEMALE">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name="studentProfile.dateOfBirth"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="flex items-center gap-1">
                        Date of Birth
                      </FieldLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full h-11 justify-start text-left font-normal rounded-xl border border-gray-400",
                              !field.value && "text-muted-foreground"
                            )}
                            disabled={isProcessing}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value instanceof Date ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value as Date}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name="studentProfile.phoneNumber"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="flex items-center gap-1">
                        Phone Number
                      </FieldLabel>
                      <Input
                        {...field}
                        disabled={isProcessing}
                        className="h-11 rounded-xl border border-gray-400"
                      />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
              </FieldGroup>
            </div>

            {/* Academic Info Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold flex items-center gap-2 text-slate-900 pb-2 border-b">
                <GraduationCap size={16} className="text-primary" /> Academic
                Information
              </h4>
              <FieldGroup>
                <Controller
                  control={control}
                  name="studentProfile.faculty"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="flex items-center gap-1">
                        Faculty
                      </FieldLabel>
                      <Input
                        {...field}
                        disabled={isProcessing}
                        className="h-11 rounded-xl border border-gray-400"
                      />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name="studentProfile.department"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="flex items-center gap-1">
                        Department
                      </FieldLabel>
                      <Input
                        {...field}
                        disabled={isProcessing}
                        className="h-11 rounded-xl border border-gray-400"
                      />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name="studentProfile.programme"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="flex items-center gap-1">
                        Programme
                      </FieldLabel>
                      <Input
                        {...field}
                        disabled={isProcessing}
                        className="h-11 rounded-xl border border-gray-400"
                      />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name="studentProfile.level"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Level</FieldLabel>
                      <Input
                        {...field}
                        value={field.value || ""}
                        disabled={isProcessing}
                        className="h-11 rounded-xl border border-gray-400"
                      />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
              </FieldGroup>
            </div>
          </div>
        </form>

        <DialogFooter className="flex gap-4 sm:gap-x-12 px-2 pb-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isProcessing}
            className="rounded-full flex-1 h-11 px-8"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="student-edit-form"
            disabled={isProcessing}
            className="rounded-full flex-1 h-11 px-8"
          >
            {isProcessing ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Updating
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
