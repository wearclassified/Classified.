import type { Metadata } from "next";
import { MembershipSection } from "@/features/storefront/components/membership-section";
import { StorefrontPageShell } from "@/features/storefront/components/storefront-page-shell";

export const metadata: Metadata = {
  title: "Membership",
  description: "Join the Classified. newsletter preview.",
};

export default function MembershipRoute() {
  return (
    <StorefrontPageShell>
      <div className="store-container pb-8 pt-12 sm:pb-12 sm:pt-16">
        <h1 className="sr-only">Classified. membership</h1>
        <p className="mx-auto max-w-xl text-center text-sm leading-6 text-[#aaa]">
          Get updates on future drops. This preview does not save or send email addresses.
        </p>
        <MembershipSection />
        <p className="mx-auto max-w-xl text-center text-[10px] leading-5 text-[#777]">
          Membership benefits and terms have not been announced. This does not create an account or subscription.
        </p>
      </div>
    </StorefrontPageShell>
  );
}
