"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, Check, AlertCircle } from "lucide-react";
import { useInviteSupervisor } from "@/lib/hooks/mutations/use-auth";
import { useGetAllInternshipPeriods } from "@/lib/hooks/queries/use-internship-queries";
import {
  inviteSupervisorSchema,
  type InviteSupervisorValues,
} from "@/lib/validations/forms/auth";
import { InternshipPeriod } from "@/types/api/internship-period";

interface InviteSupervisorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteSupervisorDialog({
  open,
  onOpenChange,
}: InviteSupervisorDialogProps) {
  const [showSuccessState, setShowSuccessState] = useState(false);
  const [temporaryPassword, setTemporaryPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const { control, handleSubmit, reset } =
    useForm<InviteSupervisorValues>({
      resolver: zodResolver(inviteSupervisorSchema),
      defaultValues: {
        email: "",
        firstName: "",
        lastName: "",
        department: "",
        phoneNumber: "",
        specialization: "",
        internshipPeriodId: "",
      },
    });

  const inviteSupervisor = useInviteSupervisor();

  const { data: periodsData, isLoading: isLoadingPeriods } =
    useGetAllInternshipPeriods({
      page: 1,
      limit: 100,
    });

  const periods: InternshipPeriod[] = periodsData?.data || [];

  const onSubmit = async (data: InviteSupervisorValues) => {
    inviteSupervisor.mutate(data, {
      onSuccess: (response) => {
        setTemporaryPassword(response.temporaryPassword);
        setShowSuccessState(true);
      },
    });
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(temporaryPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCloseDialog = () => {
    reset();
    setShowSuccessState(false);
    setTemporaryPassword("");
    onOpenChange(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      handleCloseDialog();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        {!showSuccessState ? (
          <>
            <DialogHeader>
              <DialogTitle>Invite Supervisor</DialogTitle>
              <DialogDescription>
                Send an invitation to a new supervisor. Fill in their details to
                create their account.
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 py-4"
            >
              <FieldGroup>
                {/* Email Field */}
                <Controller
                  control={control}
                  name="email"
                  render={({ field, fieldState: emailState }) => (
                    <Field data-invalid={emailState.invalid}>
                      <FieldLabel htmlFor="email">Email Address *</FieldLabel>
                      <Input
                        {...field}
                        id="email"
                        placeholder="supervisor@example.com"
                        type="email"
                        disabled={inviteSupervisor.isPending}
                        className="h-10 rounded-lg bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all"
                      />
                      {emailState.invalid && (
                        <FieldError errors={[emailState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* First Name and Last Name - Row */}
                <div className="grid grid-cols-2 gap-3">
                  <Controller
                    control={control}
                    name="firstName"
                    render={({ field, fieldState: firstNameState }) => (
                      <Field data-invalid={firstNameState.invalid}>
                        <FieldLabel htmlFor="firstName">
                          First Name *
                        </FieldLabel>
                        <Input
                          {...field}
                          id="firstName"
                          placeholder="Jane"
                          disabled={inviteSupervisor.isPending}
                          className="h-10 rounded-lg bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all"
                        />
                        {firstNameState.invalid && (
                          <FieldError errors={[firstNameState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    control={control}
                    name="lastName"
                    render={({ field, fieldState: lastNameState }) => (
                      <Field data-invalid={lastNameState.invalid}>
                        <FieldLabel htmlFor="lastName">
                          Last Name *
                        </FieldLabel>
                        <Input
                          {...field}
                          id="lastName"
                          placeholder="Smith"
                          disabled={inviteSupervisor.isPending}
                          className="h-10 rounded-lg bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all"
                        />
                        {lastNameState.invalid && (
                          <FieldError errors={[lastNameState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                {/* Phone Number */}
                <Controller
                  control={control}
                  name="phoneNumber"
                  render={({ field, fieldState: phoneState }) => (
                    <Field data-invalid={phoneState.invalid}>
                      <FieldLabel htmlFor="phone">Phone Number *</FieldLabel>
                      <Input
                        {...field}
                        id="phone"
                        placeholder="+233501234567"
                        type="tel"
                        disabled={inviteSupervisor.isPending}
                        className="h-10 rounded-lg bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all"
                      />
                      {phoneState.invalid && (
                        <FieldError errors={[phoneState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Department */}
                <Controller
                  control={control}
                  name="department"
                  render={({ field, fieldState: deptState }) => (
                    <Field data-invalid={deptState.invalid}>
                      <FieldLabel htmlFor="department">
                        Department *
                      </FieldLabel>
                      <Input
                        {...field}
                        id="department"
                        placeholder="Computer Science"
                        disabled={inviteSupervisor.isPending}
                        className="h-10 rounded-lg bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all"
                      />
                      {deptState.invalid && (
                        <FieldError errors={[deptState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Specialization */}
                <Controller
                  control={control}
                  name="specialization"
                  render={({ field, fieldState: specState }) => (
                    <Field data-invalid={specState.invalid}>
                      <FieldLabel htmlFor="specialization">
                        Specialization *
                      </FieldLabel>
                      <Input
                        {...field}
                        id="specialization"
                        placeholder="Software Engineering, Web Development"
                        disabled={inviteSupervisor.isPending}
                        className="h-10 rounded-lg bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all"
                      />
                      {specState.invalid && (
                        <FieldError errors={[specState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Internship Period Selection */}
                <Controller
                  control={control}
                  name="internshipPeriodId"
                  render={({ field, fieldState: periodState }) => (
                    <Field data-invalid={periodState.invalid}>
                      <FieldLabel htmlFor="period">
                        Internship Period *
                      </FieldLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                        disabled={isLoadingPeriods || inviteSupervisor.isPending}
                      >
                        <SelectTrigger
                          id="period"
                          className="h-10 rounded-lg bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all"
                          data-invalid={periodState.invalid}
                        >
                          <SelectValue placeholder="Select a period" />
                        </SelectTrigger>
                        <SelectContent>
                          {periods.map((period) => (
                            <SelectItem key={period.id} value={period.id}>
                              {period.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {periodState.invalid && (
                        <FieldError errors={[periodState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseDialog}
                  disabled={inviteSupervisor.isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={inviteSupervisor.isPending}
                >
                  {inviteSupervisor.isPending
                    ? "Sending..."
                    : "Send Invitation"}
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                  <Check className="h-5 w-5 text-emerald-600" />
                </div>
                Invitation Sent Successfully
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 flex gap-3">
                <AlertCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-sm text-emerald-900">
                  Supervisor account created successfully. An invitation email
                  has been sent with login credentials.
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">
                  Temporary Password:
                </p>
                <div className="flex items-center justify-between gap-3 rounded-lg bg-slate-100 p-3 border border-slate-200">
                  <p className="text-sm font-mono text-slate-900 truncate">
                    {temporaryPassword}
                  </p>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={handleCopyPassword}
                    className="shrink-0"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span className="sr-only">Copy password</span>
                  </Button>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Share this password securely. The supervisor should change it
                  immediately after first login.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleCloseDialog} className="w-full">
                Done
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
