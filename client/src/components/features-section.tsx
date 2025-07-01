import { Globe, Wrench, Smartphone, Share2 } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Why Choose Kai Web Design?</h2>
          <p className="text-xl text-gray-600">We handle everything so you can focus on your business</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Domain & Hosting</h3>
            <p className="text-gray-600">Complete domain registration and reliable hosting included</p>
          </div>

          <div className="text-center">
            <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Maintenance</h3>
            <p className="text-gray-600">Ongoing maintenance and updates to keep your site running smoothly</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Responsive Design</h3>
            <p className="text-gray-600">Perfect display on all devices - desktop, tablet, and mobile</p>
          </div>

          <div className="text-center">
            <div className="bg-yellow-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Share2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Social Integration</h3>
            <p className="text-gray-600">Seamless social media integration to grow your online presence</p>
          </div>
        </div>
      </div>
    </section>
  );
}
