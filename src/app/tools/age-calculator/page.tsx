import { Metadata } from 'next';
import { getToolSchema, schemaToJsonLd } from '@/lib/schema';
import AgeCalculatorClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
  title: 'Age Calculator Free – Calculate Exact Age Online | ToolNova',
  description: 'Free age calculator. Calculate your exact age in years, months, and days. Find age difference between two dates instantly. Precise, fast, and privacy-focused.',
  keywords: ['age calculator', 'calculate age', 'age from date of birth', 'age difference calculator', 'how old am i'],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/age-calculator' },
  openGraph: {
    title: 'Age Calculator – Calculate Exact Age Online Free | ToolNova',
    description: 'Calculate exact age by date of birth in years, months, and days instantly.',
    url: 'https://www.toolnovahub.com/tools/age-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Age Calculator – Calculate Exact Age Online Free | ToolNova',
    description: 'Calculate exact age by date of birth in years, months, and days instantly.',
  },
};

const toolSchema = getToolSchema(
  'Age Calculator',
  'Calculate exact age in years, months, and days from birth date with precision and privacy.',
  'https://www.toolnovahub.com/tools/age-calculator'
);

export default function AgeCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(toolSchema) }} />
      <AgeCalculatorClient />

      <ToolRichContent
        title="Age Calculator"
        description="ToolNova's Age Calculator is a highly precise digital utility designed to provide exact age measurements across various time scales. Whether you need to calculate your age in years, months, and days for a legal document, or determine the duration between two specific historical dates, our tool delivers instantaneous and accurate results. It simplifies the often complex manual calculation involving leap years and varying month lengths."
        steps={[
          {
            title:"Input Birth Date",
            desc:"Select your date of birth using the intuitive calendar interface. Ensure the day, month, and year are correct for the highest precision."
          },
          {
            title:"Select Comparison Date",
            desc:"By default, the tool is set to calculate your age as of 'Today'. However, you can choose any past or future date to find the age or duration at that specific point in time."
          },
          {
            title:"Instant Calculation",
            desc:"The tool processes the dates instantly. There's no need to wait or refresh; your results appear immediately below the input fields."
          },
          {
            title:"Review Detailed Breakdown",
            desc:"Explore the comprehensive breakdown, which includes your age in years, months, and days, as well as total time elapsed in weeks, hours, and minutes."
          }
        ]}
        benefits={[
          {
            title:"Unmatched Precision",
            desc:"Advanced algorithms account for all leap year cycles and the specific lengths of the months within your range, ensuring calendar-perfect accuracy."
          },
          {
            title:"Versatile Time Scales",
            desc:"Go beyond simple years. View your results in total weeks, days, hours, and even seconds—perfect for technical or personal milestones."
          },
          {
            title:"Birthday Countdown",
            desc:"The tool automatically generates a countdown to your next birthday, helping you plan ahead for upcoming celebrations."
          },
          {
            title:"Privacy Guaranteed",
            desc:"Your date data never leaves your browser. We prioritize your privacy by processing all calculations locally, ensuring no personal data is stored or tracked."
          }
        ]}
        faq={[
          {
            question:"How accurate is the ToolNova Age Calculator?",
            answer:"Our calculator is accurate to the day. It handles the complexities of the Gregorian calendar, including leap years (the extra day in February) and the varying number of days in different months, providing a more reliable result than manual subtraction."
          },
          {
            question:"Can I use this for non-birth dates?",
            answer:"Absolutely! While it's primarily used as a 'date of birth' tool, you can use it to calculate the exact duration between any two historical or future events."
          },
          {
            question:"Is my personal data safe?",
            answer:"Yes. ToolNova is built with a privacy-first philosophy. All calculations happen on the client-side (in your browser), meaning your birth date is never sent to our servers or stored on our platform."
          },
          {
            question:"Why does my age vary slightly on different calculators?",
            answer:"Some simple calculators treat a year as exactly 365 days or a month as 30 days. ToolNova uses calendar-aware logic that respects the actual number of days in each specific month and year in your range, providing the most legally and chronologically accurate result."
          }
        ]}
      />
    </>
  );
}
