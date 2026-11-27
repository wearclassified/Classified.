"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

type EditorialSection = {
  heading: string;
  body: string;
};

const pageContent: Record<
  string,
  { eyebrow: string; title: string; intro: string; sections: EditorialSection[]; previewNote?: string }
> = {
  about: {
    eyebrow: "The idea",
    title: "About Classified.",
    intro:
      "Classified. is a streetwear storefront concept shaped around considered everyday pieces and a distinct visual point of view.",
    sections: [
      {
        heading: "Our point of view",
        body: "We believe personal style can be direct, expressive, and entirely your own. This site is a preview of that direction.",
      },
      {
        heading: "Built with intention",
        body: "The current catalogue and photography are sample content while the storefront is being developed. Product materials, production details, and release dates have not been confirmed here.",
      },
      {
        heading: "What comes next",
        body: "More information about the people, process, and collections will be added when those details are ready to share.",
      },
    ],
  },
  faq: {
    eyebrow: "Good to know",
    title: "FAQs",
    intro: "Answers for this storefront preview. The shop is not yet accepting orders.",
    sections: [
      {
        heading: "Can I place an order?",
        body: "No. This is a preview catalogue. The bag, product listings, and prices are for demonstration and do not submit an order or payment.",
      },
      {
        heading: "Are the listed products in stock?",
        body: "Availability is not connected to live inventory. Items marked “Coming soon” are not currently orderable.",
      },
      {
        heading: "How do I choose my size?",
        body: "The size options shown are illustrative only. Confirmed garment measurements and fit notes have not been published; see the preview Size Guide for details.",
      },
      {
        heading: "How can I contact Classified.?",
        body: "Use the Contact page to preview the form. It does not send or store a message yet.",
      },
      {
        heading: "Does the membership form sign me up?",
        body: "No. Email addresses entered in the membership preview are not saved or sent.",
      },
    ],
  },
  "size-guide": {
    eyebrow: "Fit notes",
    title: "Size guide",
    intro:
      "Final garment measurements and fit information are not available in this preview.",
    sections: [
      {
        heading: "Before you choose",
        body: "The S, M, L, and XL selectors shown on some sample product pages are interface examples, not verified size availability.",
      },
      {
        heading: "Measurements",
        body: "A measured size chart will be added after the garment specifications have been confirmed. We do not want to publish estimated measurements as product facts.",
      },
      {
        heading: "Need help?",
        body: "The Contact form is currently a non-functional preview and cannot receive fit questions.",
      },
    ],
    previewNote: "This page is a placeholder, not a confirmed product size chart.",
  },
  "shipping-returns": {
    eyebrow: "Order information",
    title: "Shipping & returns",
    intro: "Shipping and return services are not configured for this storefront preview.",
    sections: [
      {
        heading: "Shipping",
        body: "Delivery areas, carriers, costs, and estimated delivery times have not been confirmed. No shipping commitment is made by this preview site.",
      },
      {
        heading: "Returns and exchanges",
        body: "A return or exchange policy has not been published. Please do not treat this page as a final policy or place an order based on it.",
      },
      {
        heading: "Orders",
        body: "Checkout is not available, and no order can be placed through the sample cart.",
      },
    ],
    previewNote: "Shipping and returns details will be published after the store policies are confirmed.",
  },
  privacy: {
    eyebrow: "Site information",
    title: "Privacy",
    intro: "This preview does not provide a complete or legally reviewed privacy policy.",
    sections: [
      {
        heading: "Preview interactions",
        body: "The sample cart, wishlist, and search run in your browser and are not connected to an order or account service. Newsletter and contact forms do not submit or store their contents.",
      },
      {
        heading: "Before launch",
        body: "A final privacy notice describing the live site's data processing, service providers, retention, and user choices must be published before those services are enabled.",
      },
    ],
    previewNote: "Preview notice only; not a substitute for the final privacy policy.",
  },
  terms: {
    eyebrow: "Site information",
    title: "Terms",
    intro: "This storefront preview is not an offer to sell products or accept orders.",
    sections: [
      {
        heading: "Sample content",
        body: "Product names, imagery, prices, sizes, and availability shown here are for demonstration and may not describe final products.",
      },
      {
        heading: "No checkout",
        body: "No purchase, payment, stock reservation, or customer account service is available through this preview.",
      },
      {
        heading: "Before launch",
        body: "Final terms and any required consumer information must be reviewed and published before the live store accepts orders.",
      },
    ],
    previewNote: "Preview notice only; not final legal terms.",
  },
};

export function EditorialPage({ slug }: { slug: string }) {
  const page = pageContent[slug];
  if (!page) return null;

  return (
    <div className="store-container pb-16 pt-12 sm:pb-24 sm:pt-20">
      <header className="max-w-3xl border-b border-[#333] pb-8 sm:pb-10">
        <p className="text-[9px] uppercase tracking-[0.25em] text-[#aaa]">{page.eyebrow}</p>
        <h1 className="mt-4 text-3xl font-semibold uppercase tracking-[-0.04em] text-white sm:text-5xl">
          {page.title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#aaa] sm:text-base">{page.intro}</p>
        {page.previewNote ? (
          <p className="mt-5 border-l border-[#888] pl-3 text-xs leading-5 text-[#b8b8b8]">
            {page.previewNote}
          </p>
        ) : null}
      </header>
      <div className="max-w-3xl">
        {page.sections.map((section) => (
          <section key={section.heading} className="border-b border-[#262626] py-6 sm:py-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-white">
              {section.heading}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#aaa]">{section.body}</p>
          </section>
        ))}
      </div>
      <Link href="/shop/" className="store-button-primary mt-8 inline-flex">
        Explore the preview shop
      </Link>
    </div>
  );
}

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="store-container grid gap-10 pb-16 pt-12 sm:pb-24 sm:pt-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <header>
        <p className="text-[9px] uppercase tracking-[0.25em] text-[#aaa]">Get in touch</p>
        <h1 className="mt-4 text-3xl font-semibold uppercase tracking-[-0.04em] text-white sm:text-5xl">
          Contact
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-[#aaa]">
          Have a question? This form is a visual preview and is not connected to a mailbox or support system.
        </p>
        <p className="mt-6 border-l border-[#888] pl-3 text-xs leading-5 text-[#b8b8b8]">
          Do not include private or payment information. Form entries are not transmitted or saved.
        </p>
      </header>
      <div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <ContactField label="Name" name="name" autoComplete="name" required />
          <ContactField label="Email" name="email" type="email" autoComplete="email" required />
          <label className="block">
            <span className="text-[9px] uppercase tracking-[0.15em] text-[#aaa]">Message</span>
            <textarea
              name="message"
              rows={5}
              required
              className="mt-2 block w-full resize-y border border-[#444] bg-[#101010] px-3 py-3 text-sm text-white outline-none focus:border-white"
            />
          </label>
          <button type="submit" className="store-button-primary min-h-11">
            Preview message
          </button>
        </form>
        <p aria-live="polite" className="mt-4 min-h-5 text-xs leading-5 text-[#aaa]">
          {submitted ? "Preview only — your message was not sent or saved." : ""}
        </p>
      </div>
    </div>
  );
}

function ContactField({
  label,
  name,
  type = "text",
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  type?: "text" | "email";
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[9px] uppercase tracking-[0.15em] text-[#aaa]">{label}</span>
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        required={required}
        className="mt-2 block min-h-11 w-full border border-[#444] bg-[#101010] px-3 text-sm text-white outline-none focus:border-white"
      />
    </label>
  );
}

