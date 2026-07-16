import { NextAuthOptions } from"next-auth";
import GoogleProvider from"next-auth/providers/google";
import { db } from"@/lib/db";

export const authOptions: NextAuthOptions = {
    // NOTE: Removed PrismaAdapter — it was causing`error=Callback` because
    // the adapter tries to write to MySQL during OAuth and fails silently.
    // User records are created via upsert in API routes instead.
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    session: {
        strategy:"jwt",
        maxAge: 2 * 60 * 60, // 2 hours
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            console.log("NextAuth signIn callback:", {
                email: user?.email,
                provider: account?.provider,
            });

            // Create/update user in our DB during sign-in
            if (user?.email) {
                try {
                    await db.user.upsert({
                        where: { email: user.email },
                        create: {
                            email: user.email,
                            name: user.name || null,
                            image: user.image || null,
                        },
                        update: {
                            name: user.name || null,
                            image: user.image || null,
                        },
                    });
                } catch (error) {
                    console.error("Error upserting user during signIn:", error);
                    // Don't block sign-in if DB fails — user can still use JWT session
                }
            }
            return true;
        },
        async redirect({ url, baseUrl }) {
            const canonicalBase = (process.env.NEXTAUTH_URL || baseUrl).replace(/\/$/,"");

            // Relative URLs
            if (url.startsWith("/")) {
                return`${canonicalBase}${url}`;
            }

            // URLs on our domain (handles www vs non-www)
            try {
                const parsedUrl = new URL(url);
                if (
                    parsedUrl.hostname ==="toolnovahub.com" ||
                    parsedUrl.hostname ==="www.toolnovahub.com"
                ) {
                    parsedUrl.protocol ="https:";
                    parsedUrl.hostname ="www.toolnovahub.com";
                    return parsedUrl.toString();
                }
            } catch {
                return canonicalBase;
            }

            // Same origin
            if (url.startsWith(baseUrl)) {
                return url.replace(baseUrl, canonicalBase);
            }

            return canonicalBase;
        },
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            if (session.user && token.email) {
                session.user.email = token.email as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
                token.email = user.email;
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn:"/login",
    },
    debug: process.env.NODE_ENV ==="development",
};
