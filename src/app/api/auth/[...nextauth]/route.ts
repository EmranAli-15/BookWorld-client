import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],

    callbacks: {
        async signIn({ user, account, profile }: any) {
            if (!profile?.email) return false;

            console.log(user)

            return true;
        },
    }

};


const handler = NextAuth(options);
export { handler as GET, handler as POST };