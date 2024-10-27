"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { CardWarp } from "@/components/auth/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form_error";
import { FormSuccess } from "@/components/form_success";
import { useState, useTransition } from "react";
import { newPasswordSchema } from "@/schema/newPasswordSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (data) => {
    setError(null);
    setSuccess(null);

    startTransition(() => {
      newPassword(data, token)
        .then((res) => {
          setError(res.error);
          setSuccess(res.success);
        })
        .catch((err) => {
          setError("An unexpected error occurred");
        });
    });
  };

  return (
    <CardWarp
      header="Enter your new password"
      backhref="/auth/login"
      backlabel="Back to login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-background">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      className="bg-background/80"
                      placeholder="********"
                      type={showPassword ? "text" : "password"}
                      disabled={isPending}
                    />
                    <Button
                        type="button"
                        variant="warning"
                        className="rounded-l-none rounded-r-2xl absolute inset-y-0 text-input-foreground right-0 px-3 py-1"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isPending}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-destructive-foreground" />
              </FormItem>
            )}
          />
          <FormError error={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Reset password
          </Button>
        </form>
      </Form>
    </CardWarp>
  );
};
