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
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { loginSchema } from "@/schema/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : null;

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    setError(null);
    setSuccess(null);
    startTransition(() => {
      login(data)
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
      header="Welcome Back"
      backhref="/auth/register"
      backlabel="Don't have an account?"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="text-card-foreground">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-foreground">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-input rounded-2xl"
                    placeholder="kang_galon09@ml.id"
                    type="email"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage className="text-destructive-foreground" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              const [showPassword, setShowPassword] = useState(false);
              return (
                <FormItem className="mb-4">
                  <FormLabel className="text-foreground">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        className="bg-input rounded-2xl"
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
                  <Button variant="link" size="sm" asChild className="w-full justify-start">
                    <Link href="/auth/reset">Forgot Password?</Link>
                  </Button>
                </FormItem>
              );
            }}
          />
          <FormError error={error || urlError} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            className="rounded-2xl w-full bg-primary"
            disabled={isPending}
          >
            Login
          </Button>
        </form>
      </Form>
    </CardWarp>
  );
};
