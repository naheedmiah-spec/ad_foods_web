import { useState } from 'react';
import './Pages.css';

const faqs = [
    {
        q: "How can I buy these products?",
        a: "Our website is currently a product showcase. You can view our full range here, but purchases must be made in-store at one of our three London locations."
    },
    {
        q: "Are the prices shown online accurate?",
        a: "To ensure you get the best value, we don't display prices online as they can vary based on weekly fresh arrivals and in-store promotions."
    },
    {
        q: "Where are your stores located?",
        a: "We have three convenient locations in London: Paddington Street, Claremont Road, and Kentish Town Road. Check our Contact page for full addresses and maps."
    },
    {
        q: "Do I need an account to view products?",
        a: "Anyone can browse our catalog! However, registering for an account allows you to save favorites and receive updates on new arrivals."
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
