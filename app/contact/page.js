import Link from "next/link";
import { EnquiryForm } from "../components/EnquiryForm";
import { phoneLabel, site } from "@/lib/data";

export const metadata = {
  title: "Contact Us | Joan Property Friend",
  description: "Ask Joan about a house, an apartment, or land. She will come back on the number you leave."
};

function Icon({ d }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ContactPage() {
  const phone = site.phone ? phoneLabel() : "";

  return (
    <div className="contact-page">
      <nav className="sale-crumb" aria-label="Breadcrumb">
        <Link href="/" aria-label="Home">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" /></svg>
        </Link>
        <span aria-hidden="true">›</span>
        <span>Contact Us</span>
      </nav>

      <div className="contact-intro">
        <h1>Contact Us</h1>
        <p>Get in touch with Joan</p>
      </div>

      <div className="contact-grid">
        <div className="contact-card">
          <h2>For more information, fill out the form</h2>
          <EnquiryForm compact />
        </div>

        <aside className="contact-side">
          <h2>Our Address</h2>
          <p>If you have a question, use the form. Joan will come back on the number you leave.</p>
          <div className="contact-rows">
            {phone ? (
              <a className="contact-row" href={`tel:+${site.phone.replace(/\D/g, "")}`}>
                <Icon d="M6.5 3.5h3l1.5 4-2 1.2a12 12 0 0 0 6.3 6.3L16.5 13l4 1.5v3A2 2 0 0 1 18.5 19.5 15 15 0 0 1 4.5 5.5 2 2 0 0 1 6.5 3.5Z" />
                <span>{phone}</span>
              </a>
            ) : null}
            {site.email ? (
              <a className="contact-row" href={`mailto:${site.email}`}>
                <Icon d="M4 6.5h16v11H4v-11ZM5 7.5l7 5.5 7-5.5" />
                <span>{site.email}</span>
              </a>
            ) : null}
            <p className="contact-row">
              <Icon d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
              <span>{site.address}</span>
            </p>
            <p className="contact-row">
              <Icon d="M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
              <span>Viewings by arrangement</span>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
