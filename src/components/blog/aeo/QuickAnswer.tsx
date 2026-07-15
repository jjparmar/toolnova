import React from "react";
import { FaBolt } from "react-icons/fa";

interface QuickAnswerProps {
    children: React.ReactNode;
}

export default function QuickAnswer({ children }: QuickAnswerProps) {
    return (
        <div className="quick-answer my-8 rounded-r-xl border-l-4 border-primary bg-primary/5 p-6 shadow-sm">
            <div className="mb-3 flex items-center gap-3">
                <div className="rounded-full bg-primary p-1.5">
                    <FaBolt className="h-4 w-4 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold uppercase tracking-wide text-foreground">
                    Quick Answer
                </h3>
            </div>
            <div className="text-lg font-medium leading-relaxed text-foreground/90">
                {children}
            </div>
        </div>
    );
}
