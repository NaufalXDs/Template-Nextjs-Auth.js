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
import { register } from "@/actions/register";
import { useState, useTransition } from "react";

import { registerSchema } from "@/schema/registerSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (data) => {
    setError(null)
    setSuccess(null)
    startTransition(() => {
      register(data).then((res) => {
        if (res.error) {
          setError(res.error)
        } else {
          setSuccess(res.success)
        }
      })
    })  
  };

  return (
    <CardWarp
      header="Create an account"
      backhref="/auth/login"
      backlabel="Already have an account?"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-foreground">Name</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-input rounded-2xl" placeholder="John Doe" type="name" disabled={isPending} />
                </FormControl>
                <FormMessage className="text-destructive-foreground" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-foreground">Email</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-input rounded-2xl" placeholder="kang_galon09@ml.id" type="email" disabled={isPending} />
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
                      <Input {...field} className="bg-input rounded-2xl" placeholder="********" type={showPassword ? "text" : "password"} disabled={isPending} />
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
              );
            }}
          />
          <FormError error={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full rounded-2xl bg-primary" disabled={isPending}>Register</Button>
        </form>
      </Form>
    </CardWarp>
  );
};
