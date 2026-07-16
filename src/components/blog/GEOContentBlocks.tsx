import { ReactNode } from 'react';
import { Lightbulb, TrendingUp, AlertCircle } from 'lucide-react';

interface KeyFactsBoxProps {
    facts: string[];
}

export function KeyFactsBox({ facts }: KeyFactsBoxProps) {
    return (
        <div className="my-8 p-6 bg-gradient-to-br from-primary/8 to-teal-500/10 border-2 border-primary/20 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-bold text-foreground">Key Facts</h3>
            </div>
            <ul className="space-y-2">
                {facts.map((fact, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-blue-600 font-bold mt-0.5">•</span>
                        <span className="text-foreground">{fact}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

interface QuickAnswerProps {
    question: string;
    answer: string;
}

export function QuickAnswer({ question, answer }: QuickAnswerProps) {
    return (
        <div className="my-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-bold text-foreground">Quick Answer</h3>
            </div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">{question}</p>
            <p className="text-base text-foreground leading-relaxed">{answer}</p>
        </div>
    );
}

interface ExpertInsightProps {
    quote: string;
    author: string;
    credentials: string;
}

export function ExpertInsight({ quote, author, credentials }: ExpertInsightProps) {
    return (
        <div className="my-8 p-6 bg-gradient-to-br from-primary/5 to-teal-500/10 border-l-4 border-primary rounded-r-2xl">
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center text-white font-bold">
                    {author.charAt(0)}
                </div>
                <div className="flex-1">
                    <p className="text-base italic text-foreground mb-3 leading-relaxed">"{quote}"</p>
                    <div>
                        <p className="text-sm font-semibold text-foreground">{author}</p>
                        <p className="text-xs text-muted-foreground">{credentials}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface ComparisonTableProps {
    headers: string[];
    rows: { label: string; values: string[] }[];
}

export function ComparisonTable({ headers, rows }: ComparisonTableProps) {
    return (
        <div className="my-8 overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                    <tr className="bg-gradient-to-r from-primary to-teal-700">
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="px-4 py-3 text-left text-sm font-semibold text-white border-r border-white/10 last:border-r-0"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="border-b border-slate-200 hover:bg-slate-50 :bg-slate-800/50 transition-colors"
                        >
                            <td className="px-4 py-3 text-sm font-semibold text-foreground">
                                {row.label}
                            </td>
                            {row.values.map((value, valueIndex) => (
                                <td
                                    key={valueIndex}
                                    className="px-4 py-3 text-sm text-muted-foreground"
                                >
                                    {value}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

interface TipBoxProps {
    children: ReactNode;
    type?: 'info' | 'warning' | 'success';
}

export function TipBox({ children, type = 'info' }: TipBoxProps) {
    const styles = {
        info: {
            bg: 'from-blue-50 to-cyan-50 ',
            border: 'border-blue-200 ',
            icon: <AlertCircle className="h-5 w-5 text-blue-600" />
        },
        warning: {
            bg: 'from-yellow-50 to-orange-50 ',
            border: 'border-yellow-200 ',
            icon: <AlertCircle className="h-5 w-5 text-yellow-600" />
        },
        success: {
            bg: 'from-green-50 to-emerald-50 ',
            border: 'border-green-200 ',
            icon: <Lightbulb className="h-5 w-5 text-green-600" />
        }
    };

    const style = styles[type];

    return (
        <div className={`my-6 p-5 bg-gradient-to-br ${style.bg} border-2 ${style.border} rounded-xl`}>
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                    {style.icon}
                </div>
                <div className="flex-1 text-sm text-foreground leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
}
