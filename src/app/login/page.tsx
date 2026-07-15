"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Sparkles, Shield, Zap, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await signIn("google", { callbackUrl: "/dashboard" });
        } catch (error) {
            toast.error("Failed to login with Google");
            setLoading(false);
        }
    };

    const benefits = [
        { icon: Zap, text: "5 Free AI generations daily" },
        { icon: Shield, text: "Your data stays private" },
        { icon: Sparkles, text: "Access 30+ AI-powered tools" },
    ];

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary via-blue-600 to-indigo-700 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
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
                        <span className="text-2xl font-black tracking-tight">ToolNova</span>
                    </Link>

                    <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-6">
                        Unlock the Power of
                        <span className="block mt-2 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                            ToolNova
                        </span>
                    </h1>

                    <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-md">
                        Join thousands of students using AI to write better essays, solve problems, and study smarter.
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
            <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-gradient-to-b from-slate-50 to-white dark:from-[#0f1419] dark:to-background">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-10">
                        <Link href="/" className="inline-flex items-center gap-3 group">
                            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl shadow-primary/30">
                                <Sparkles className="h-7 w-7 text-white" />
                            </div>
                            <span className="text-2xl font-black tracking-tight text-foreground">ToolNova</span>
                        </Link>
                    </div>

                    {/* Card */}
                    <div className="bg-white dark:bg-[#1a1f2e] rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 sm:p-10">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-2">
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
                            className="w-full h-14 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-foreground border-2 border-slate-200 dark:border-slate-700 hover:border-primary/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 text-base font-semibold group"
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
                                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-white dark:bg-[#1a1f2e] px-4 text-sm text-muted-foreground">
                                    Quick & Secure
                                </span>
                            </div>
                        </div>

                        {/* Benefits List */}
                        <div className="space-y-3">
                            {[
                                "One-click sign in with Google",
                                "No password to remember",
                                "Your activity stays private"
                            ].map((text, index) => (
                                <div key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                                        <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                                    </div>
                                    <span>{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-muted-foreground mb-4">
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-primary hover:underline font-bold">
                                Sign up
                            </Link>
                        </p>
                        <p className="text-sm text-muted-foreground">
                            By signing in, you agree to our{" "}
                            <Link href="/terms" className="text-primary hover:underline font-medium">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
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
