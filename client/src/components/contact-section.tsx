import { Mail, Clock, Handshake } from "lucide-react";

export default function ContactSection() {
  const scrollToQuote = () => {
    const element = document.getElementById('quote');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300">Contact us today to discuss your project and get a custom quote</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-gray-300">info@kaiwebdesign.com</p>
          </div>

          <div className="text-center">
            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Response Time</h3>
            <p className="text-gray-300">Within 24 hours</p>
          </div>

          <div className="text-center">
            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Handshake className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Free Consultation</h3>
            <p className="text-gray-300">No obligation quote</p>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={scrollToQuote}
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 text-lg"
          >
            Get Your Free Quote Today
          </button>
        </div>
      </div>
    </section>
  );
}
