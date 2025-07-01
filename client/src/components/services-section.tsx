import { ShoppingCart, Palette, Search, Check } from "lucide-react";

export default function ServicesSection() {
  const scrollToQuote = (quoteType: string) => {
    const element = document.getElementById('quote');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // After scrolling, activate the appropriate tab
      setTimeout(() => {
        const tab = document.getElementById(`${quoteType}-tab`);
        if (tab) {
          tab.click();
        }
      }, 500);
    }
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Our Core Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We specialize in three key areas to help your business succeed online with professional, results-driven solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Business Website Design */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-300 group">
            <div className="text-blue-600 mb-6 text-4xl">
              <ShoppingCart className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Business Website Design</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Complete e-commerce solutions with transaction capabilities, inventory management, and responsive design. Perfect for businesses ready to sell online.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-gray-600">
                <Check className="text-green-500 mr-3 w-4 h-4" />
                E-commerce Ready
              </li>
              <li className="flex items-center text-gray-600">
                <Check className="text-green-500 mr-3 w-4 h-4" />
                Payment Integration
              </li>
              <li className="flex items-center text-gray-600">
                <Check className="text-green-500 mr-3 w-4 h-4" />
                Inventory Management
              </li>
              <li className="flex items-center text-gray-600">
                <Check className="text-green-500 mr-3 w-4 h-4" />
                Mobile Responsive
              </li>
            </ul>
            <button 
              onClick={() => scrollToQuote('business')}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 group-hover:scale-105 transform"
            >
              Get Business Quote
            </button>
          </div>

          {/* Custom Website Design */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100 hover:shadow-xl transition-all duration-300 group">
            <div className="text-purple-600 mb-6 text-4xl">
              <Palette className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Custom Website Design</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Tailored websites designed specifically for your brand, industry, and unique requirements. Stand out with a completely custom solution.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-gray-600">
                <Check className="text-green-500 mr-3 w-4 h-4" />
                Custom Design
              </li>
              <li className="flex items-center text-gray-600">
                <Check className="text-green-500 mr-3 w-4 h-4" />
                Advanced Features
              </li>
              <li className="flex items-center text-gray-600">
                <Check className="text-green-500 mr-3 w-4 h-4" />
                Portfolio/Booking Systems
              </li>
              <li className="flex items-center text-gray-600">
                <Check className="text-green-500 mr-3 w-4 h-4" />
                CMS Integration
              </li>
            </ul>
            <button 
              onClick={() => scrollToQuote('custom')}
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 group-hover:scale-105 transform"
            >
              Get Custom Quote
            </button>
          </div>

          {/* SEO Services */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100 hover:shadow-xl transition-all duration-300 group">
            <div className="text-green-600 mb-6 text-4xl">
              <Search className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">SEO Optimization</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Boost your online visibility with our comprehensive SEO services. Get found by customers searching for your products and services.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-gray-600">
                <Check className="text-green-500 mr-3 w-4 h-4" />
                Keyword Research
              </li>
              <li className="flex items-center text-gray-600">
                <Check className="text-green-500 mr-3 w-4 h-4" />
                On-Page Optimization
              </li>
              <li className="flex items-center text-gray-600">
                <Check className="text-green-500 mr-3 w-4 h-4" />
                Technical SEO
              </li>
              <li className="flex items-center text-gray-600">
                <Check className="text-green-500 mr-3 w-4 h-4" />
                Performance Tracking
              </li>
            </ul>
            <button 
              onClick={() => scrollToQuote('seo')}
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 group-hover:scale-105 transform"
            >
              Get SEO Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
