"use server";

import bcrypt from "bcrypt";
import { registerSchema } from "@/schema/registerSchema";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values) => {
  const validate = registerSchema.safeParse(values);

  if (!validate.success) {
    return {
      error: "Invalid fields",
    };
  }

  const validateEmail =
    validate.data.email.endsWith("@gmail.com") ||
    validate.data.email.endsWith("@elin.id");

  if (!validateEmail) {
    return {
      error: "Domain email not supported",
    };
  }

  const { email, password, name } = validate.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const checkUser = await getUserByEmail(email);

  if (checkUser) {
    return {
      error: "Email already in use!",
    };
  }

  
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.token, verificationToken.email);

  return { success: "Confirmation email sent!" };
};
