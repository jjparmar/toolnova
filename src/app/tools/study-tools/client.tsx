'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
    GraduationCap,
    ArrowRight,
    BookOpen,
    Brain,
    FileQuestion,
    Lightbulb,
    Calculator,
    ClipboardList,
    Calendar,
    HelpCircle,
    FlaskConical,
    Search,
    Zap,
    Star,
} from 'lucide-react';

const iconMap: Record<string, any> = {
    BookOpen,
    ClipboardList,
    FileQuestion,
    Brain,
    Lightbulb,
    HelpCircle,
    Calculator,
    FlaskConical,
    Calendar,
};

interface Tool {
    name: string;
    slug: string;
    description: string;
    icon: string;
    badge?: string;
    badgeColor?: string;
}

interface StudyToolsClientProps {
    tools: Tool[];
}

export function StudyToolsClient({ tools }: StudyToolsClientProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTools = tools.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {/* Hero Section */}
            <div className="relative overflow-hidden mb-12">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 dark:from-teal-950/20 dark:via-emerald-950/20 dark:to-cyan-950/20"></div>
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                <div className="relative text-center py-16 px-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-teal-500/10 border border-primary/20 text-primary text-sm font-semibold mb-6 backdrop-blur-sm">
                        <GraduationCap className="h-4 w-4" />
                        {tools.length} AI-Powered Study Tools
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6 bg-gradient-to-r from-primary via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                        Study Tools Library
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
                        Supercharge your learning with AI-powered tools for homework, notes, quizzes, and more. All free, always.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-teal-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                            <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                                <Search className="text-slate-400 h-5 w-5 ml-5" />
                                <input
                                    type="text"
                                    placeholder="Search study tools..."
                                    className="flex-1 px-4 py-4 bg-transparent border-none text-foreground placeholder:text-slate-400 focus:outline-none text-base"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button className="px-6 py-4 bg-gradient-to-r from-primary to-teal-600 text-white font-semibold hover:from-primary/90 hover:to-teal-600/90 transition-all">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Features */}
                    <div className="flex flex-wrap justify-center gap-3 mt-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full text-sm font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                            <Zap className="h-4 w-4 text-yellow-500" /> Instant Results
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full text-sm font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                            <Star className="h-4 w-4 text-primary" /> Student Favorite
                        </div>
                    </div>
                </div>
            </div>

            {/* Tools Grid */}
            {filteredTools.length === 0 ? (
                <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                        <Search className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No tools found</h3>
                    <p className="text-slate-600 dark:text-slate-400">Try adjusting your search terms</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTools.map((tool, index) => {
                        const Icon = iconMap[tool.icon] || BookOpen;
                        return (
                            <Link
                                key={tool.slug}
                                href={`/tools/${tool.slug}`}
                                className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl`}
                                style={{
                                    background: 'linear-gradient(135deg, from-blue-50 0%, to-indigo-50/50 100%)',
                                    animationDelay: `${index * 50}ms`
                                }}
                            >
                                {/* Glassmorphism overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 dark:from-slate-800/40 dark:to-slate-900/10 backdrop-blur-sm"></div>
                                
                                {/* Animated gradient border */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-teal-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                                
                                {/* Decorative elements */}
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary to-teal-600 opacity-10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                                
                                {/* Badge */}
                                {tool.badge && (
                                    <div className={`absolute top-4 right-4 ${tool.badgeColor} text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg`}>
                                        {tool.badge}
                                    </div>
                                )}

                                <div className="relative">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-teal-600 text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                            <Icon className="h-7 w-7" strokeWidth={2} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                                                {tool.name}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                                {tool.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center justify-between">
                                        <span className="text-xs text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1">
                                            <Zap className="h-3 w-3" /> Instant Results
                                        </span>
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-blue-600 shadow-lg group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                                            <ArrowRight className="h-5 w-5" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </>
    );
}
