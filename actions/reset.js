"use server"

import { resetSchema } from "@/schema/resetSchema";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/token";
import { sendPasswordResetEmail } from "@/lib/mail";

export const reset = async (data) => {
    const validatedFields = resetSchema.safeParse(data)

    if (!validatedFields.success) {
        return {
            error: "Invalid email!",
        }
    }

    const { email } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
        return {
            error: "Email not found!",
        }
    }

    const passwordResetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail(passwordResetToken.token, passwordResetToken.email)
    
    return {
        success: "Reset email sent!",
    }
}


