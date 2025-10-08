
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

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

            try {
                const response = await fetch(
                    `${process.env.BASE_URL}/user/googleLogin`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: user.name,
                            email: user.email,
                        }),
                    });
                if (!response.ok) {
                    return false;
                }

                const result = await response.json();
                (await cookies()).set("token", result.data);

            } catch (error) {
                return false;
            }

            return true;
        },
    }

};


const handler = NextAuth(options);
export { handler as GET, handler as POST };