import React from"react";
import { FaCheck, FaTimes } from"react-icons/fa";

interface ProsConsProps {
    pros: string[];
    cons: string[];
}

export default function ProsCons({ pros, cons }: ProsConsProps) {
    return (
        <div className="pros-cons my-10 grid md:grid-cols-2 gap-6">
            {/* Pros */}
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-6">
                <h3 className="font-bold text-lg text-emerald-800 mb-4 flex items-center gap-2">
                    <span className="bg-emerald-100 p-1 rounded">👍</span> Pros
                </h3>
                <ul className="space-y-3">
                    {pros.map((pro, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                            <FaCheck className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                            <span className="text-emerald-900/80">{pro}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Cons */}
            <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-6">
                <h3 className="font-bold text-lg text-rose-800 mb-4 flex items-center gap-2">
                    <span className="bg-rose-100 p-1 rounded">👎</span> Cons
                </h3>
                <ul className="space-y-3">
                    {cons.map((con, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                            <FaTimes className="w-4 h-4 text-rose-600 mt-1 flex-shrink-0" />
                            <span className="text-rose-900/80">{con}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
