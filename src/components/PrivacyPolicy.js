import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <section className="privacy-policy section">
      <div className="container">
        <motion.div
          className="privacy-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button 
            className="back-button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>

        <motion.div
          className="privacy-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="policy-section">
            <h2>1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you:</p>
            <ul>
              <li>Contact us through our website or email</li>
              <li>Request a demo or consultation</li>
              <li>Sign up for our services</li>
              <li>Subscribe to our newsletter</li>
            </ul>
            <p>This information may include your name, email address, company name, and any other information you choose to provide.</p>
          </div>

          <div className="policy-section">
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send you technical notices and support messages</li>
              <li>Communicate with you about products, services, and events</li>
              <li>Protect against fraud and abuse</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>3. Information Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information:</p>
            <ul>
              <li>With service providers who assist in our operations</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
              <li>In connection with a business transfer or merger</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>4. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
          </div>

          <div className="policy-section">
            <h2>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Withdraw consent where applicable</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>6. Cookies and Tracking</h2>
            <p>We use cookies and similar technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.</p>
          </div>

          <div className="policy-section">
            <h2>7. Third-Party Services</h2>
            <p>Our website may contain links to third-party services. We are not responsible for the privacy practices of these services. Please review their privacy policies before providing any personal information.</p>
          </div>

          <div className="policy-section">
            <h2>8. Children's Privacy</h2>
            <p>Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13.</p>
          </div>

          <div className="policy-section">
            <h2>9. International Transfers</h2>
            <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information.</p>
          </div>

          <div className="policy-section">
            <h2>10. Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.</p>
          </div>

          <div className="policy-section">
            <h2>11. Contact Us</h2>
            <p>If you have any questions about this privacy policy or our data practices, please contact us at:</p>
            <div className="contact-info">
              <p><strong>Email:</strong> hello@nyrix.co</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
