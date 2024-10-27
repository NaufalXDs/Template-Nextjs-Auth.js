import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (token, email) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: "Example <no-reply@navtech.my.id>",
    to: email,
    subject: "Email Verification Required",
    html: `
      <p>Dear User,</p>
      <p>Thank you for registering with us. Please click the link below to verify your email address:</p>
      <p><a href="${confirmLink}">Verify your email</a></p>
      <p>If you did not create an account, please ignore this email.</p>
      <p>Best regards,<br/>Attendance Elin</p>
    `,
  });
};

export const sendPasswordResetEmail = async (token, email) => {
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/new-password?token=${token}`;
    await resend.emails.send({
        from: "Example <no-reply@navtech.my.id>",
        to: email,
        subject: "Reset your password",
        html: `
            <p>Dear User,</p>
            <p>You have requested to reset your password. Please click the link below to reset your password:</p>
            <p><a href="${resetLink}">Reset your password</a></p>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>Best regards,<br/>Attendance Elin</p>
        `,
    });
};

export default resend;
