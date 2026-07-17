'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Star, Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

/**
 * Feedback Widget Component
 * Collects user feedback with rating and comments
 */

export function FeedbackWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [category, setCategory] = useState<'bug' | 'feature' | 'general'>('general');
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        // Check if user has submitted feedback recently
        const lastSubmit = localStorage.getItem('toolnova_last_feedback');
        if (lastSubmit) {
            const daysSince = (Date.now() - parseInt(lastSubmit)) / (1000 * 60 * 60 * 24);
            if (daysSince < 1) {
                setHasSubmitted(true);
            }
        }
    }, []);

    const handleSubmit = () => {
        if (rating === 0) {
            toast.error('Please select a rating');
            return;
        }

        // Save feedback (in real app, send to backend)
        const feedbackData = {
            rating,
            feedback,
            category,
            timestamp: new Date().toISOString(),
        };

        console.log('Feedback submitted:', feedbackData);
        localStorage.setItem('toolnova_last_feedback', Date.now().toString());

        toast.success('Thank you for your feedback!');
        setIsOpen(false);
        setRating(0);
        setFeedback('');
        setHasSubmitted(true);
    };

    if (hasSubmitted) {
        return null;
    }

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-br from-primary to-teal-600 text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:scale-110 flex items-center justify-center"
                    aria-label="Give feedback"
                >
                    <Star className="h-6 w-6" />
                </button>
            )}

            {/* Feedback Card */}
            {isOpen && (
                <Card className="fixed bottom-6 right-6 z-50 w-[min(24rem,calc(100vw-2rem))] shadow-premium-lg border-border bg-card animate-scale-in">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="font-heading">Share your feedback</CardTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close feedback"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <CardDescription>Help us improve ToolNova</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {/* Rating */}
                        <div>
                            <label className="text-sm font-medium mb-2 block">
                                How would you rate your experience?
                            </label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoveredRating(star)}
                                        onMouseLeave={() => setHoveredRating(0)}
                                        className="transition-transform hover:scale-125"
                                        aria-label={`Rate ${star} stars`}
                                    >
                                        <Star
                                            className={`h-8 w-8 ${star <= (hoveredRating || rating)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-muted-foreground'
                                                } transition-colors`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="text-sm font-medium mb-2 block">
                                Category
                            </label>
                            <div className="flex gap-2">
                                {(['bug', 'feature', 'general'] as const).map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategory(cat)}
                                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${category === cat
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-muted hover:bg-muted/80'
                                            }`}
                                    >
{cat === 'bug' ? '🐛 Bug' : cat === 'feature' ? '💡 Feature' : '💬 General'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Feedback Text */}
                        <div>
                            <label className="text-sm font-medium mb-2 block">
                                Tell us more (optional)
                            </label>
                            <Textarea
                                placeholder="What can we improve?"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                rows={4}
                                maxLength={500}
                            />
                            <div className="text-xs text-muted-foreground mt-1 text-right">
                                {feedback.length}/500
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            onClick={handleSubmit}
                            className="w-full bg-gradient-primary"
                            disabled={rating === 0}
                        >
                            <Send className="h-4 w-4 mr-2" />
                            Submit Feedback
                        </Button>
                    </CardContent>
                </Card>
            )}
        </>
    );
}
