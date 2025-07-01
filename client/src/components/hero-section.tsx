export default function HeroSection() {
  const scrollToQuote = () => {
    const element = document.getElementById('quote');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-16 kai-gradient-bg min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-6">
              Fast, High-Quality
              <span className="text-blue-600"> Web Design</span>
              <br />Solutions
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We deliver professional websites with responsive design, e-commerce capabilities, and advanced features. Complete domain, hosting, and maintenance included.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToQuote}
                className="kai-btn-primary text-center"
              >
                Get Your Quote
              </button>
              <button 
                onClick={scrollToServices}
                className="kai-btn-secondary text-center"
              >
                View Services
              </button>
            </div>
          </div>
          <div className="lg:text-right">
            {/* Modern web design illustration */}
            <div className="bg-white p-8 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 kai-card-hover">
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-20 bg-gray-100 rounded"></div>
                  <div className="h-20 bg-gray-100 rounded"></div>
                  <div className="h-20 bg-gray-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
