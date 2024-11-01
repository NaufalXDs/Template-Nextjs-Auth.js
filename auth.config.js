import bcrypt from "bcryptjs";

import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { loginSchema } from "@/schema/loginSchema";
import { getUserByEmail } from "@/data/user";

const authConfig = {
  signIn: {
    email: {
      validate: (email) => {
        return email.endsWith("@gmail.com") || email.endsWith("@elin.id");
      },
    },
  },
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const Validate = loginSchema.safeParse(credentials);

        if (Validate.success) {
          const { email, password } = Validate.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;

          return null;
        }
      },
    }),
  ],
};

export default authConfig;
