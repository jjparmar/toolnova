import React from"react";
import { FaCheckCircle, FaListUl } from"react-icons/fa";

interface KeyTakeawaysProps {
    points: string[];
}

export default function KeyTakeaways({ points }: KeyTakeawaysProps) {
    return (
        <div className="key-takeaways my-10 bg-muted/60 border border-border rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                <FaListUl className="h-6 w-6 text-primary" />
                <h3 className="font-heading text-xl font-semibold text-foreground">Key Takeaways</h3>
            </div>
            <ul className="space-y-4">
                {points.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <FaCheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-foreground/80 text-lg leading-relaxed">
                            {point}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
