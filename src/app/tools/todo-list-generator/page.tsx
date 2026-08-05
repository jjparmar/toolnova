import { Metadata } from 'next';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import TodoListGeneratorClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'To-Do List Generator – Create Task Lists Free',
    description: 'Generate organized to-do lists from your goals. Free AI-powered task planner.',
    keywords: ['to-do list generator', 'task list', 'task planner', 'productivity tool', 'checklist maker'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/todo-list-generator' },
  openGraph: {
    title: 'AI To-Do List Generator – Create Task Lists Free',
    description: 'Generate organized to-do lists from goals, projects, and routines.',
    url: 'https://www.toolnovahub.com/tools/todo-list-generator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI To-Do List Generator – Create Task Lists Free',
    description: 'Generate organized to-do lists from goals, projects, and routines.',
  },
};

export default function TodoListGeneratorPage() {
    const toolData = getToolData('todo-list-generator');

    const toolSchema = getToolSchema(
        toolData?.name || 'todo-list-generator',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/todo-list-generator'
    );

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(toolSchema) }} />
            {toolData && (
                <>
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getHowToSchema(`How to use ${toolData.name}`,
                        toolData.description,
                        toolData.howItWorks.map(step => ({
                            name: step.title,
                            text: step.desc,
                            url:`https://www.toolnovahub.com/tools/todo-list-generator#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <TodoListGeneratorClient />
            {toolData && (
                <ToolRichContent
                    title={toolData.name}
                    description={toolData.description}
                    steps={toolData.howItWorks}
                    benefits={toolData.benefits}
                    faq={toolData.faqs}
                />
            )}
            <RelatedTools currentTool="todo-list-generator" category="Utility" />
        </>
    );
}
