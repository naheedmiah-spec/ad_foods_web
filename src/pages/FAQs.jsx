import { useState } from 'react';
import './Pages.css';

const faqs = [
    {
        q: "How do I earn OM points?",
        a: "You earn 1 point for every £1 spent. Once you reach 100 points, you can redeem them for a £5 discount on your next order."
    },
    {
        q: "Do you deliver frozen food?",
        a: "Yes! We use specialized insulated packaging and dry ice to ensure your frozen goods arrive in perfect condition."
    },
    {
        q: "What is your return policy?",
        a: "We accept returns for non-perishable items within 14 days. Due to health and safety, fresh and frozen goods cannot be returned unless damaged."
    },
    {
        q: "Can I collect my order in-store?",
        a: "Yes, 'Click & Collect' is available at all our London branches. Simply select your preferred store at checkout."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="page-container container animate-fade-in">
            <div className="page-header">
                <h1>Frequently Asked Questions</h1>
                <p>Everything you need to know about shopping with AD Foods.</p>
            </div>

            <div className="page-content">
                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
                            <button
                                className="faq-question"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span>{faq.q}</span>
                                <span className="faq-toggle">{openIndex === index ? '−' : '+'}</span>
                            </button>
                            {openIndex === index && (
                                <div className="faq-answer">
                                    <p>{faq.a}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
