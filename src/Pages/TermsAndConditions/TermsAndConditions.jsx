import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50  px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Terms &amp; Conditions
        </h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            1. Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to FOODIE! These Terms &amp; Conditions (“Terms”) govern
            your use of our website and services. By accessing or using FOODIE,
            you agree to be bound by these Terms.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            2. Use of Service
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
            <li>You must be at least 18 years old to place an order.</li>
            <li>
              All orders are subject to availability and confirmation of the
              order price.
            </li>
            <li>You agree not to misuse the service in any way.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            3. Payment
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Payment must be made at the time of ordering. We accept all major
            credit/debit cards and mobile wallets. Prices listed are in your
            local currency and include applicable taxes.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            4. Delivery &amp; Refunds
          </h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            We aim to deliver within the time frame indicated, but delays can
            occur. If your order is significantly late or incorrect, please
            contact our support for a possible refund or replacement.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Refunds are processed within 5–7 business days after approval.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            5. Intellectual Property
          </h2>
          <p className="text-gray-700 leading-relaxed">
            All content, logos, and trademarks on FOODIE are the property of
            Byte Bites or its licensors. You may not reproduce or redistribute
            any content without prior written permission.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            6. Limitation of Liability
          </h2>
          <p className="text-gray-700 leading-relaxed">
            To the maximum extent permitted by law, FOODIE and Byte Bites are
            not liable for any indirect, incidental, or consequential damages
            arising from your use of our service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            7. Changes to Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update these Terms from time to time. The latest version will
            always be posted here. Continued use after changes constitutes
            acceptance of the new Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            8. Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed">
            For any questions or concerns about these Terms, please contact us
            at{" "}
            <a
              href="mailto:support@bytebites.com.bd"
              className="text-primary hover:underline"
            >
              support@bytebites.com.bd
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
