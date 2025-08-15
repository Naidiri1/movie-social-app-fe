'use client';
import Link from "next/link";

export default function TermsOfUsePage() {
  const lastUpdated = "August 2025";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
            Terms of Use
          </h1>
          <p className="text-gray-400">Last Updated: {lastUpdated}</p>
        </div>

        <section className="bg-red-900/20 backdrop-blur rounded-lg p-6 mb-8 border border-red-800/50">
          <h2 className="text-xl font-bold mb-3 text-red-400">
            ⚠️ Important Notice
          </h2>
          <p className="text-sm text-gray-300">
            This is a non-commercial, educational portfolio project. By using
            this website, you acknowledge and agree that this service is
            provided for demonstration purposes only and is not intended for
            commercial use.
          </p>
        </section>

        <section className="bg-gray-800/50 backdrop-blur rounded-lg p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-300 mb-3">
            By accessing and using Iriscope ("the Service"), you accept and
            agree to be bound by the terms and provision of this agreement. If
            you do not agree to these terms, please do not use this service.
          </p>
        </section>

        <section className="bg-gray-800/50 backdrop-blur rounded-lg p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">
            2. Educational & Portfolio Purpose
          </h2>
          <div className="text-gray-300 space-y-3">
            <p>This website is created solely for:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Educational and learning purposes</li>
              <li>Portfolio demonstration</li>
              <li>Skill showcase for potential employers</li>
              <li>Non-commercial personal use</li>
            </ul>
            <p className="font-semibold text-yellow-400 mt-3">
              This service is NOT intended for commercial use or profit
              generation.
            </p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur rounded-lg p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">
            3. User Accounts
          </h2>
          <div className="text-gray-300 space-y-3">
            <p>When creating an account, you agree to:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your password</li>
              <li>
                Accept responsibility for all activities under your account
              </li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>
            <p className="text-sm text-yellow-400 mt-3">
              Note: Please do not use real personal information or passwords you
              use elsewhere.
            </p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur rounded-lg p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">
            4. User-Generated Content
          </h2>
          <div className="text-gray-300 space-y-3">
            <p>By posting reviews, ratings, or comments, you agree that:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Your content does not violate any laws or regulations</li>
              <li>Your content is not offensive, defamatory, or harmful</li>
              <li>You will not post spam or promotional content</li>
              <li>
                You grant us the right to display your content on the platform
              </li>
              <li>We may remove any content at our discretion</li>
            </ul>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur rounded-lg p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">
            5. Prohibited Uses
          </h2>
          <div className="text-gray-300 space-y-3">
            <p>You may NOT use this service to:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-red-300">
              <li>Violate any laws or regulations</li>
              <li>Infringe upon intellectual property rights</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Attempt to gain unauthorized access to the service</li>
              <li>Scrape or harvest data from the platform</li>
              <li>Use the service for any commercial purposes</li>
              <li>Distribute viruses or malicious code</li>
              <li>Impersonate other users or entities</li>
            </ul>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur rounded-lg p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">
            6. Intellectual Property
          </h2>
          <div className="text-gray-300 space-y-3">
            <p>
              All movie-related content including posters, descriptions, and
              metadata are the property of their respective copyright holders.
              We claim no ownership of this content.
            </p>
            <p>
              The Iriscope platform code, design, and user interface are created
              for educational purposes and portfolio demonstration only.
            </p>
            <p className="text-yellow-400">
              This service uses the TMDB API but is not endorsed or certified by
              TMDB.
            </p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur rounded-lg p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">7. Privacy</h2>
          <div className="text-gray-300 space-y-3">
            <p>
              Your use of our Service is also governed by our Privacy Policy.
            </p>
            <p className="font-semibold text-yellow-400">
              Important: As this is a demonstration project, please do not share
              sensitive personal information.
            </p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur rounded-lg p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">
            8. Disclaimers
          </h2>
          <div className="text-gray-300 space-y-3">
            <p className="font-semibold">
              The service is provided "AS IS" without warranties of any kind.
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                We do not guarantee continuous, uninterrupted access to the
                service
              </li>
              <li>We are not responsible for any data loss</li>
              <li>
                Movie information accuracy is dependent on third-party APIs
              </li>
              <li>
                This is a demonstration project and may be discontinued at any
                time
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur rounded-lg p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">
            9. Limitation of Liability
          </h2>
          <p className="text-gray-300">
            In no event shall Iriscope, its creators, or contributors be liable
            for any indirect, incidental, special, consequential, or punitive
            damages arising out of your use of the service.
          </p>
        </section>

        <section className="bg-gray-800/50 backdrop-blur rounded-lg p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">
            10. Termination
          </h2>
          <p className="text-gray-300">
            We reserve the right to terminate or suspend your account and access
            to the service at our sole discretion, without notice, for conduct
            that violates these Terms of Use or is harmful to other users, us,
            or third parties.
          </p>
        </section>

        <section className="bg-gray-800/50 backdrop-blur rounded-lg p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">
            11. Changes to Terms
          </h2>
          <p className="text-gray-300">
            We reserve the right to modify these terms at any time. Continued
            use of the service after changes constitutes acceptance of the
            modified terms.
          </p>
        </section>

        <section className="bg-gray-800/50 backdrop-blur rounded-lg p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">
            12. Contact Information
          </h2>
          <p className="text-gray-300 mb-3">
            For questions about these Terms of Use, please contact us at:
          </p>
          <a
            href="mailto:naidiri121510@gmail.com"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            naidiri121510@gmail.com
          </a>
        </section>

        <section className="bg-green-900/20 backdrop-blur rounded-lg p-6 mb-8 border border-green-800/50">
          <p className="text-center text-gray-300">
            By using Iriscope, you acknowledge that you have read, understood,
            and agree to be bound by these Terms of Use.
          </p>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/popular"
            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-center"
          >
            Back to Home
          </Link>
        </div>

        <div className="text-center mt-12 pb-8">
          <p className="text-xs text-gray-500">
            These terms are for a demonstration/portfolio project and should not
            be considered legally binding for commercial purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
