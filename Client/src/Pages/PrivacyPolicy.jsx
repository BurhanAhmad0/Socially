import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-12">
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg p-6 md:p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-700 mb-4">Effective Date: August 1, 2025</p>

        <p className="text-gray-700 mb-6">
          This Privacy Policy describes how we collect, use, and protect your
          personal information when you use our social media application.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            1. Information We Collect
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Profile information (name, email, username, etc.)</li>
            <li>Content you share (posts, images, comments, etc.)</li>
            <li>Usage data (interactions, preferences, device info)</li>
            <li>Location data (if enabled)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-700 mb-2">
            We use the collected information to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Provide and improve our services</li>
            <li>Personalize content and recommendations</li>
            <li>Analyze usage and trends</li>
            <li>Send important updates and notifications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            3. Sharing Your Information
          </h2>
          <p className="text-gray-700">
            We do not sell your personal data. We may share it with trusted
            partners and service providers to help us operate our platform,
            comply with legal obligations, or protect our rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            4. Data Security
          </h2>
          <p className="text-gray-700">
            We implement appropriate technical and organizational measures to
            protect your personal data. However, no method of transmission over
            the internet is 100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            5. Your Rights
          </h2>
          <p className="text-gray-700">
            You may have rights under data protection laws, including accessing,
            updating, or deleting your information. You can manage your data
            settings within your account or by contacting us.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            6. Changes to This Policy
          </h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. We will notify
            users of significant changes through the app or by other means.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            7. Contact Us
          </h2>
          <p className="text-gray-700">
            If you have questions or concerns about this policy, please contact
            our support team at{" "}
            <a
              href="mailto:support@example.com"
              className="text-blue-600 underline"
            >
              support@example.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
