import { toolsData } from './src/data/tools';
const missing = Object.values(toolsData).filter(t => !t.howItWorks || t.howItWorks.length === 0 || !t.benefits || t.benefits.length === 0 || !t.faqs || t.faqs.length === 0);
console.log(missing.map(t => t.slug).join(', '));
