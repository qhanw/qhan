import NextAuth from "next-auth";
import { getCsrfToken } from "next-auth/react";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { signInSchema } from "@/lib/zod";
import { SigninMessage } from "@/utils/SigninMessage";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: { message: {}, signature: {} },
      authorize: async (credentials, req) => {
        try {
          // const { email, password } = await signInSchema.parseAsync(credentials)

          // // logic to salt and hash password
          // const pwHash = saltAndHashPassword(password)

          // // logic to verify if the user exists
          // user = await getUserFromDb(email, pwHash)

          // if (!user) {
          //   throw new Error("Invalid credentials.")
          // }

          // // return JSON object with the user data
          // return user

          const { message, signature } = await signInSchema.parseAsync(
            credentials
          );

          // const json: {
          //   domain: string;
          //   publicKey: string;
          //   nonce: string;
          //   statement: string;
          // } = JSON.parse(message);

          // return {
          //   id: json.publicKey,
          //   name: json.publicKey,
          //   image: json.publicKey,
          //   email: json.publicKey,
          // };
          const signinMessage = new SigninMessage(JSON.parse(message));
          const nextAuthUrl = new URL(process.env.AUTH_URL!);
          if (signinMessage.domain !== nextAuthUrl.host) return null;

          // const csrfToken = await getCsrfToken();
          // if (signinMessage.nonce !== csrfToken) {
          //   return null;
          // }

          const validationResult = await signinMessage.validate(signature);

          if (!validationResult)
            throw new Error("Could not validate the signed message");

          return { id: signinMessage.publicKey };
        } catch (e) {
          if (e instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
        return null;
      },
    }),
  ],

  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      // @ts-ignore
      session.publicKey = token.sub;
      if (session.user) {
        session.user.name = token.sub;
        session.user.image = `https://ui-avatars.com/api/?name=${token.sub}&background=random`;
        //session.user.email = token.sub!;
      }
      return session;
    },
  },
});
