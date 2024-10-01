import User from "@models/user";
import { connectToDb } from "@utils/database";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();

      return session;
    },

    async signIn(profile: any) {
      try {
        await connectToDb();
        console.log("Connected to DB now checking for user in DB");

        //check if user exists
        const userExists = await User.findOne({
          email: profile.user.email,
        });

        //if user does not exists
        if (!userExists) {
          console.log(profile);
          await User.create({
            email: profile.user.email,
            username: profile.user.name.replaceAll(" ", "").toLowerCase(),
            image: profile.user.image,
          });
        }
        return true;
      } catch (error) {
        console.log(false);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
