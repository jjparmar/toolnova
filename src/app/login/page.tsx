"use client";

import { signIn } from"next-auth/react";
import { Button } from"@/components/ui/button";
import { useState } from"react";
import { toast } from"sonner";
import { Sparkles, Shield, Zap, ArrowRight, Check } from"lucide-react";
import Link from"next/link";
import { DAILY_FREE_LIMIT } from"@/lib/limits";
import { TOOL_COUNT_LABEL } from"@/data/tools";
import { getClientCallbackUrl } from"@/lib/auth-callback";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const callbackUrl = getClientCallbackUrl("/dashboard");
            await signIn("google", { callbackUrl });
        } catch {
            toast.error("Failed to login with Google");
            setLoading(false);
        }
    };

    const benefits = [
        { icon: Zap, text:`${DAILY_FREE_LIMIT} free AI generations daily` },
        { icon: Shield, text:"Your data stays private" },
        { icon: Sparkles, text:`Access ${TOOL_COUNT_LABEL} tools` },
    ];

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-brand overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl"></div>
                </div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center px-12 lg:px-16 text-white">
                    <Link href="/" className="flex items-center gap-3 mb-12 group">
                        <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Sparkles className="h-7 w-7 text-white" />
                        </div>
                        <span className="font-heading text-2xl font-semibold tracking-tight">ToolNova</span>
                    </Link>

                    <h1 className="font-heading mb-6 text-4xl font-bold leading-tight lg:text-5xl">
                        Unlock the power of
                        <span className="mt-2 block text-white">
                            ToolNova
                        </span>
                    </h1>

                    <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-md">
                        Sign in for extra free AI uses, history, and Pro upgrades — or keep using tools without an account.
                    </p>

                    {/* Benefits */}
                    <div className="space-y-4">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-4 group">
                                <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                    <benefit.icon className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-white/90 font-medium">{benefit.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* Social Proof */}
                    <div className="mt-16 pt-8 border-t border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {['bg-pink-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400'].map((color, i) => (
                                    <div key={i} className={`h-10 w-10 rounded-full ${color} border-2 border-white/20 flex items-center justify-center text-white font-bold text-sm`}>
                                        {String.fromCharCode(65 + i)}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p className="font-semibold text-white">10,000+ Students</p>
                                <p className="text-sm text-white/60">Already using ToolNova</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="flex flex-1 items-center justify-center bg-background p-6 sm:p-10">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="mb-10 text-center lg:hidden">
                        <Link href="/" className="group inline-flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand shadow-xl shadow-primary/30 transition-transform group-hover:scale-105">
                                <Sparkles className="h-7 w-7 text-white" />
                            </div>
                            <span className="font-heading text-2xl font-bold tracking-tight text-foreground">
                              Tool<span className="text-primary">Nova</span>
                            </span>
                        </Link>
                    </div>

                    {/* Card */}
                    <div className="content-panel p-8 sm:p-10">
                        <div className="text-center mb-8">
                            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
                                Welcome to ToolNova
                            </h2>
                            <p className="text-muted-foreground">
                                Sign in for more free AI uses, history, and Pro upgrades. Tools also work without an account.
                            </p>
                        </div>

                        {/* Google Sign In Button */}
                        <Button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full h-14 bg-card hover:bg-muted text-foreground border-2 border-border hover:border-primary/50 rounded-2xl shadow-soft hover:shadow-elevated transition-all duration-300 flex items-center justify-center gap-3 text-base font-semibold group"
                        >
                            {loading ? (
                                <div className="h-5 w-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    {/* Google Icon */}
                                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                                        <path
                                            fill="#4285F4"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    <span>Continue with Google</span>
                                    <ArrowRight className="h-4 w-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                </>
                            )}
                        </Button>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-card px-4 text-sm text-muted-foreground">
                                    Quick & Secure
                                </span>
                            </div>
                        </div>

                        {/* Benefits List */}
                        <div className="space-y-3">
                            {["One-click sign in with Google","No password to remember","Your activity stays private"
                            ].map((text, index) => (
                                <div key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                        <Check className="h-3 w-3 text-green-600" />
                                    </div>
                                    <span>{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-muted-foreground mb-4">
                            Don't have an account?{""}
                            <Link href="/signup" className="text-primary hover:underline font-bold">
                                Sign up
                            </Link>
                        </p>
                        <p className="text-sm text-muted-foreground">
                            By signing in, you agree to our{""}
                            <Link href="/terms" className="text-primary hover:underline font-medium">
                                Terms of Service
                            </Link>{""}
                            and{""}
                            <Link href="/privacy" className="text-primary hover:underline font-medium">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
