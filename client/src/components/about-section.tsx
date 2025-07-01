import { Check, Code, Paintbrush, Rocket } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 kai-gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-slate-800 mb-6">About Kai Web Design Agency</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We're a professional web design agency dedicated to delivering fast, high-quality results for businesses of all sizes. Our comprehensive approach includes everything from initial design to ongoing maintenance.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                  <Check className="text-white w-4 h-4" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-slate-800">Complete Solution</h3>
                  <p className="text-gray-600">Domain, hosting, design, and maintenance all included</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                  <Check className="text-white w-4 h-4" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-slate-800">Fast Delivery</h3>
                  <p className="text-gray-600">Quick turnaround times without compromising quality</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                  <Check className="text-white w-4 h-4" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-slate-800">Professional Quality</h3>
                  <p className="text-gray-600">Modern, responsive designs that convert visitors to customers</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:text-right">
            {/* Professional team working illustration */}
            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 h-24 rounded-lg flex items-center justify-center text-white">
                    <Code className="w-8 h-8" />
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 h-24 rounded-lg flex items-center justify-center text-white">
                    <Paintbrush className="w-8 h-8" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/5"></div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-yellow-500 text-white p-4 rounded-full shadow-lg">
                <Rocket className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
