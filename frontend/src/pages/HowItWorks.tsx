import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Recycle, Package, Truck, DollarSign, ShieldCheck } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">How KidsCycle Works</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Our simple process makes it easy to give children's items a new life while 
              helping families save money and reduce environmental impact.
            </p>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Process</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              From selling your items to shopping for quality refurbished products
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-emerald-200"></div>
            
            {/* Step 1 */}
            <div className="relative mb-16">
              <div className="md:flex items-center">
                <div className="md:w-1/2 pr-8 md:text-right mb-8 md:mb-0">
                  <h3 className="text-2xl font-bold text-emerald-600 mb-3">1. List Your Items</h3>
                  <p className="text-gray-600">
                    Create an account and list your gently used children's clothing, toys, books, and gear. 
                    Our simple form helps you describe the items, their condition, and suggest a fair price.
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-8 flex md:justify-start justify-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center z-10 border-4 border-white shadow-md">
                    <Package className="h-8 w-8 text-emerald-600" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative mb-16">
              <div className="md:flex items-center">
                <div className="md:w-1/2 pr-8 flex md:justify-end justify-center mb-8 md:mb-0 md:order-1">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center z-10 border-4 border-white shadow-md">
                    <Truck className="h-8 w-8 text-emerald-600" />
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-8 md:order-2">
                  <h3 className="text-2xl font-bold text-emerald-600 mb-3">2. Ship or Drop Off</h3>
                  <p className="text-gray-600">
                    Once your listing is approved, you can either ship your items to us using our prepaid shipping label 
                    or drop them off at one of our collection points. We'll handle the rest!
                  </p>
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative mb-16">
              <div className="md:flex items-center">
                <div className="md:w-1/2 pr-8 md:text-right mb-8 md:mb-0">
                  <h3 className="text-2xl font-bold text-emerald-600 mb-3">3. Quality Check & Refurbishment</h3>
                  <p className="text-gray-600">
                    Our expert team carefully inspects each item, cleans, repairs if needed, and ensures everything 
                    meets our high quality standards. Items that can't be refurbished are responsibly recycled.
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-8 flex md:justify-start justify-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center z-10 border-4 border-white shadow-md">
                    <ShieldCheck className="h-8 w-8 text-emerald-600" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="relative mb-16">
              <div className="md:flex items-center">
                <div className="md:w-1/2 pr-8 flex md:justify-end justify-center mb-8 md:mb-0 md:order-1">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center z-10 border-4 border-white shadow-md">
                    <DollarSign className="h-8 w-8 text-emerald-600" />
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-8 md:order-2">
                  <h3 className="text-2xl font-bold text-emerald-600 mb-3">4. Get Paid</h3>
                  <p className="text-gray-600">
                    Once your items are processed, you'll receive payment based on the condition and market value. 
                    Choose between cash payment or store credit with a bonus percentage to use on future purchases.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Step 5 */}
            <div className="relative">
              <div className="md:flex items-center">
                <div className="md:w-1/2 pr-8 md:text-right mb-8 md:mb-0">
                  <h3 className="text-2xl font-bold text-emerald-600 mb-3">5. Shop Quality Items</h3>
                  <p className="text-gray-600">
                    Browse our selection of high-quality, affordable refurbished children's items. 
                    Each purchase comes with our quality guarantee and helps reduce waste while saving you money.
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-8 flex md:justify-start justify-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center z-10 border-4 border-white shadow-md">
                    <Recycle className="h-8 w-8 text-emerald-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Quality Standards</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              We ensure every item meets our strict quality guidelines
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Thorough Inspection</h3>
              <p className="text-gray-600">
                Every item undergoes a detailed multi-point inspection to check for any issues or wear. 
                We only accept items that meet our quality standards.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Cleaning</h3>
              <p className="text-gray-600">
                All items are professionally cleaned using eco-friendly, hypoallergenic cleaning products 
                that are safe for children and the environment.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Repairs</h3>
              <p className="text-gray-600">
                When needed, our skilled team performs repairs to restore items to excellent condition, 
                from mending small tears to replacing missing buttons.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safety Verification</h3>
              <p className="text-gray-600">
                We verify that all toys and baby equipment meet current safety standards and haven't been recalled. 
                Your child's safety is our top priority.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accurate Descriptions</h3>
              <p className="text-gray-600">
                We provide detailed, honest descriptions of each item's condition, including any signs of wear 
                or previous repairs, so you know exactly what you're getting.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Satisfaction Guarantee</h3>
              <p className="text-gray-600">
                If you're not completely satisfied with your purchase, we offer a 30-day return policy 
                for a full refund or exchange.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our process
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">What items do you accept?</h3>
              <p className="text-gray-600">
                We accept gently used children's clothing (sizes 0-14), toys, books, shoes, accessories, and baby gear. 
                Items should be clean, in good condition, and free from major defects. We don't accept items that have been recalled, 
                have safety issues, or are heavily worn or damaged.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">How much will I get paid for my items?</h3>
              <p className="text-gray-600">
                Payment depends on the brand, condition, age, and current market demand for your items. 
                Generally, you'll receive 30-50% of the resale value. You can choose to receive payment via direct deposit, 
                PayPal, or store credit (with a 10% bonus).
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">How long does the process take?</h3>
              <p className="text-gray-600">
                Once we receive your items, the inspection and processing typically takes 7-10 business days. 
                You'll receive payment within 2-3 business days after your items have been processed.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">What happens if my items don't meet your standards?</h3>
              <p className="text-gray-600">
                If your items don't meet our quality standards, we'll offer to recycle them responsibly or return them to you 
                (shipping fees may apply). We'll always communicate with you before making any decisions.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Do you offer free shipping?</h3>
              <p className="text-gray-600">
                Yes! We provide a prepaid shipping label for sending your items to us. For purchases, we offer free shipping 
                on orders over $35.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">What is your return policy?</h3>
              <p className="text-gray-600">
                We offer a 30-day return policy for all purchases. If you're not satisfied with your purchase, 
                you can return it for a full refund or exchange. Items must be in the same condition as when you received them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join thousands of families who are already making a difference by giving children's items a second life.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/sell" 
                className="bg-white text-emerald-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition"
              >
                Sell Your Items
              </Link>
              <Link 
                to="/shop" 
                className="bg-emerald-700 text-white px-6 py-3 rounded-md font-medium hover:bg-emerald-800 border border-white transition"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;