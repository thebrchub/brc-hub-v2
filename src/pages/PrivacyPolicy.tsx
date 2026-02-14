import { useEffect } from "react";
import { SEO } from "../components/SEO";

export const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="Privacy Policy" 
        description="Privacy Policy for BRC Hub - How we handle your data."
      />
      <div className="pt-32 pb-24 min-h-screen bg-brc-black text-gray-300">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-12">Last Updated: February 2026</p>

          <div className="space-y-12 text-lg leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p>
                Welcome to BRC Hub ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us at <span className="text-brc-orange">info@brchub.tech</span>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
              <p className="mb-4">We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Website, or otherwise when you contact us.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Names</li>
                <li>Phone numbers</li>
                <li>Email addresses</li>
                <li>Project details and requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
              <p>
                We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Contact Us</h2>
              <p>
                If you have questions or comments about this policy, you may email us at info@brchub.tech or by post to:
                <br /><br />
                <span className="text-white">Blazing Render Creation Hub LLP</span><br />
                Toranagallu, Ballari<br />
                Karnataka, India 583123
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};