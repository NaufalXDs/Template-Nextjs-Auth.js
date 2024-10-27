"use client";

import { CardWarp } from "@/components/auth/card";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form_error";
import { FormSuccess } from "@/components/form_success";

export const NewVerificationForm = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const submit = useCallback(() => {
    if (success || error) return;
    if (!token) return setError("Missing token");
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    submit();
  }, [submit]);

  return (
    <CardWarp
      header="Confirm Your Verification"
      backlabel="Back to Login"
      backhref="/auth/login"
    >
      <div className="flex flex-col items-center justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError error={error} />}
      </div>
    </CardWarp>
  );
};
