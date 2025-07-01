import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Search, Palette, ShoppingCart, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { seoQuoteSchema, customQuoteSchema, businessQuoteSchema, type SeoQuote, type CustomQuote, type BusinessQuote } from "@shared/schema";

type QuoteType = 'seo' | 'custom' | 'business';

export default function QuoteFormsSection() {
  const [activeTab, setActiveTab] = useState<QuoteType>('seo');
  const { toast } = useToast();

  const seoForm = useForm<SeoQuote>({
    resolver: zodResolver(seoQuoteSchema),
    defaultValues: {
      serviceType: 'seo',
      name: '',
      phone: '',
      businessLocation: '',
      websiteUrl: '',
      seoNeeds: '',
    },
  });

  const customForm = useForm<CustomQuote>({
    resolver: zodResolver(customQuoteSchema),
    defaultValues: {
      serviceType: 'custom',
      name: '',
      email: '',
      phone: '',
      businessLocation: '',
      businessInfo: '',
      businessSchedule: '',
      servicesProducts: '',
      desiredFeatures: [],
      specialRequirements: '',
      otherFeatures: '',
    },
  });

  const businessForm = useForm<BusinessQuote>({
    resolver: zodResolver(businessQuoteSchema),
    defaultValues: {
      serviceType: 'business',
      name: '',
      email: '',
      phone: '',
      businessLocation: '',
      businessInfo: '',
      businessSchedule: '',
      servicesProducts: '',
      desiredFeatures: [],
      specialRequirements: '',
      paymentMethods: [],
      paypalBusinessEmail: '',
      stripePublishableKey: '',
      stripeSecretKey: '',
      otherFeatures: '',
    },
  });

  const submitQuote = useMutation({
    mutationFn: async (data: { endpoint: string; data: SeoQuote | CustomQuote | BusinessQuote }) => {
      return apiRequest('POST', `/api/quotes/${data.endpoint}`, data.data);
    },
    onSuccess: () => {
      toast({
        title: "Quote submitted successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      // Reset the appropriate form
      if (activeTab === 'seo') seoForm.reset();
      if (activeTab === 'custom') customForm.reset();
      if (activeTab === 'business') businessForm.reset();
    },
    onError: () => {
      toast({
        title: "Submission failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmitSeo = (data: SeoQuote) => {
    submitQuote.mutate({ endpoint: 'seo', data });
  };

  const onSubmitCustom = (data: CustomQuote) => {
    submitQuote.mutate({ endpoint: 'custom', data });
  };

  const onSubmitBusiness = (data: BusinessQuote) => {
    submitQuote.mutate({ endpoint: 'business', data });
  };

  const customFeatureOptions = [
    'Portfolio Gallery',
    'Booking System',
    'Advanced Animations',
    'Contact Forms',
    'Blog/News Section',
    'Member Portal',
    'Other',
  ];

  const businessFeatureOptions = [
    'Product Catalog',
    'Shopping Cart',
    'Payment Processing',
    'Inventory Management',
    'Order Tracking',
    'Customer Accounts',
    'Other',
  ];

  return (
    <section id="quote" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Get Your Custom Quote</h2>
          <p className="text-xl text-gray-600">Choose the service you need and fill out the form to receive a personalized quote</p>
        </div>

        {/* Quote Type Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            id="seo-tab"
            onClick={() => setActiveTab('seo')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'seo'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            SEO Quote
          </button>
          <button
            id="custom-tab"
            onClick={() => setActiveTab('custom')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'custom'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Custom Design Quote
          </button>
          <button
            id="business-tab"
            onClick={() => setActiveTab('business')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'business'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Business Website Quote
          </button>
        </div>

        {/* SEO Quote Form */}
        {activeTab === 'seo' && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
              <Search className="text-green-600 mr-3 w-6 h-6" />
              SEO Optimization Quote
            </h3>
            <Form {...seoForm}>
              <form onSubmit={seoForm.handleSubmit(onSubmitSeo)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={seoForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={seoForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={seoForm.control}
                    name="businessLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Location *</FormLabel>
                        <FormControl>
                          <Input placeholder="City, State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={seoForm.control}
                    name="websiteUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Website URL *</FormLabel>
                        <FormControl>
                          <Input placeholder="https://yourwebsite.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={seoForm.control}
                  name="seoNeeds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SEO Needs & Goals *</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={4}
                          placeholder="Describe your SEO goals, target keywords, competition, and specific needs..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 py-4"
                  disabled={submitQuote.isPending}
                >
                  <Send className="mr-2 w-4 h-4" />
                  {submitQuote.isPending ? 'Submitting...' : 'Submit SEO Quote Request'}
                </Button>
              </form>
            </Form>
          </div>
        )}

        {/* Custom Design Quote Form */}
        {activeTab === 'custom' && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
              <Palette className="text-purple-600 mr-3 w-6 h-6" />
              Custom Website Design Quote
            </h3>
            <Form {...customForm}>
              <form onSubmit={customForm.handleSubmit(onSubmitCustom)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={customForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={customForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input placeholder="you@company.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={customForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={customForm.control}
                    name="businessLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Location *</FormLabel>
                        <FormControl>
                          <Input placeholder="City, State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={customForm.control}
                  name="businessInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Information *</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={3}
                          placeholder="Describe your industry, services, target audience, and business goals..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={customForm.control}
                    name="businessSchedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Schedule</FormLabel>
                        <FormControl>
                          <Input placeholder="Mon-Fri 9AM-5PM" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={customForm.control}
                    name="servicesProducts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Services/Products *</FormLabel>
                        <FormControl>
                          <Input placeholder="What do you sell or offer?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={customForm.control}
                  name="desiredFeatures"
                  render={() => (
                    <FormItem>
                      <FormLabel>Desired Website Features</FormLabel>
                      <div className="grid md:grid-cols-2 gap-4 mt-3">
                        {customFeatureOptions.map((feature) => (
                          <FormField
                            key={feature}
                            control={customForm.control}
                            name="desiredFeatures"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={feature}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(feature)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, feature])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== feature
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {feature}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Other Features Text Input */}
                {customForm.watch('desiredFeatures')?.includes('Other') && (
                  <FormField
                    control={customForm.control}
                    name="otherFeatures"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Please specify other website features needed *</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={3}
                            placeholder="Describe any additional features, functionality, or custom requirements you need for your website..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={customForm.control}
                  name="specialRequirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Requirements</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={3}
                          placeholder="Any special requirements, integrations, or technical needs..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700 py-4"
                  disabled={submitQuote.isPending}
                >
                  <Send className="mr-2 w-4 h-4" />
                  {submitQuote.isPending ? 'Submitting...' : 'Submit Custom Design Quote Request'}
                </Button>
              </form>
            </Form>
          </div>
        )}

        {/* Business Website Quote Form */}
        {activeTab === 'business' && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
              <ShoppingCart className="text-blue-600 mr-3 w-6 h-6" />
              Business Website Design Quote
            </h3>
            <Form {...businessForm}>
              <form onSubmit={businessForm.handleSubmit(onSubmitBusiness)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={businessForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={businessForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input placeholder="you@company.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={businessForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={businessForm.control}
                    name="businessLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Location *</FormLabel>
                        <FormControl>
                          <Input placeholder="City, State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={businessForm.control}
                  name="businessInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Information *</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={3}
                          placeholder="Describe your industry, services, target audience, and business goals..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={businessForm.control}
                    name="businessSchedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Schedule</FormLabel>
                        <FormControl>
                          <Input placeholder="Mon-Fri 9AM-5PM" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={businessForm.control}
                    name="servicesProducts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Services/Products *</FormLabel>
                        <FormControl>
                          <Input placeholder="What do you sell or offer?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={businessForm.control}
                  name="desiredFeatures"
                  render={() => (
                    <FormItem>
                      <FormLabel>E-commerce Features Needed</FormLabel>
                      <div className="grid md:grid-cols-2 gap-4 mt-3">
                        {businessFeatureOptions.map((feature) => (
                          <FormField
                            key={feature}
                            control={businessForm.control}
                            name="desiredFeatures"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={feature}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(feature)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, feature])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== feature
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {feature}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Other Features Text Input */}
                {businessForm.watch('desiredFeatures')?.includes('Other') && (
                  <FormField
                    control={businessForm.control}
                    name="otherFeatures"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Please specify other e-commerce features needed *</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={3}
                            placeholder="Describe any additional features, integrations, or functionality you need for your e-commerce website..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Payment Methods Section */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">Payment Processing Setup</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>We strongly recommend using both PayPal and Stripe</strong> to maximize customer payment options and reduce cart abandonment.
                  </p>
                  
                  <FormField
                    control={businessForm.control}
                    name="paymentMethods"
                    render={() => (
                      <FormItem>
                        <FormLabel>Select Payment Methods *</FormLabel>
                        <div className="grid md:grid-cols-2 gap-4 mt-3">
                          <FormField
                            control={businessForm.control}
                            name="paymentMethods"
                            render={({ field }) => {
                              return (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-4 border rounded-lg">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes('paypal')}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, 'paypal'])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== 'paypal'
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <div>
                                    <FormLabel className="text-base font-medium">PayPal</FormLabel>
                                    <p className="text-sm text-gray-600">Trusted by millions worldwide</p>
                                  </div>
                                </FormItem>
                              )
                            }}
                          />
                          <FormField
                            control={businessForm.control}
                            name="paymentMethods"
                            render={({ field }) => {
                              return (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-4 border rounded-lg">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes('stripe')}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, 'stripe'])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== 'stripe'
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <div>
                                    <FormLabel className="text-base font-medium">Stripe</FormLabel>
                                    <p className="text-sm text-gray-600">Professional payment processing</p>
                                  </div>
                                </FormItem>
                              )
                            }}
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* PayPal Credentials */}
                  {businessForm.watch('paymentMethods')?.includes('paypal') && (
                    <FormField
                      control={businessForm.control}
                      name="paypalBusinessEmail"
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel>PayPal Business Account Email *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="business@yourcompany.com" 
                              type="email"
                              {...field} 
                            />
                          </FormControl>
                          <p className="text-sm text-gray-600">This is the email associated with your PayPal business account</p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Stripe Credentials */}
                  {businessForm.watch('paymentMethods')?.includes('stripe') && (
                    <div className="mt-4 space-y-4">
                      <FormField
                        control={businessForm.control}
                        name="stripePublishableKey"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stripe Publishable Key *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="pk_live_... or pk_test_..." 
                                {...field} 
                              />
                            </FormControl>
                            <p className="text-sm text-gray-600">Found in your Stripe Dashboard under Developers → API keys</p>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={businessForm.control}
                        name="stripeSecretKey"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stripe Secret Key *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="sk_live_... or sk_test_..." 
                                type="password"
                                {...field} 
                              />
                            </FormControl>
                            <p className="text-sm text-gray-600">Keep this secure - never share it publicly</p>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>

                <FormField
                  control={businessForm.control}
                  name="specialRequirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Inventory & Special Requirements</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={3}
                          placeholder="Describe your inventory size, special requirements, integrations with existing systems..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 py-4"
                  disabled={submitQuote.isPending}
                >
                  <Send className="mr-2 w-4 h-4" />
                  {submitQuote.isPending ? 'Submitting...' : 'Submit Business Website Quote Request'}
                </Button>
              </form>
            </Form>
          </div>
        )}
      </div>
    </section>
  );
}
