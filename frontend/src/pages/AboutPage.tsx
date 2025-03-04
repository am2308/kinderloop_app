import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center text-center p-10">
      <motion.h1
        className="text-4xl font-bold text-green-600 mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About EcoKids Marketplace
      </motion.h1>

      <motion.p
        className="text-lg text-gray-600 max-w-3xl mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        At EcoKids Marketplace, we are committed to creating a sustainable future by focusing on recycling and refurbishing. Our platform empowers families to sell pre-loved toys and kids' clothes to us, which we refurbish and resell – reducing waste and making a positive environmental impact.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 rounded-lg shadow-lg bg-green-100">
          <img src="https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Recycle" className="w-32 h-32 mx-auto mb-4 rounded-lg" />
          <h3 className="text-xl font-semibold">Recycling Program</h3>
          <p className="text-gray-600">We refurbish pre-loved toys and kids' clothes, giving them a second life and reducing landfill waste.</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 rounded-lg shadow-lg bg-green-100">
          <img src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Community" className="w-32 h-32 mx-auto mb-4 rounded-lg" />
          <h3 className="text-xl font-semibold">Community Collaboration</h3>
          <p className="text-gray-600">We collaborate with families to promote responsible reuse and reduce the demand for new products.</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 rounded-lg shadow-lg bg-green-100">
          <img src="https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="Eco Impact" className="w-32 h-32 mx-auto mb-4 rounded-lg" />
          <h3 className="text-xl font-semibold">Environmental Impact</h3>
          <p className="text-gray-600">By reusing and recycling, we are actively contributing to a greener planet and a better future for our children.</p>
        </motion.div>
      </div>

      <motion.div
        className="bg-green-600 text-white rounded-lg px-6 py-4 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Join us in making a difference – one recycled product at a time!
      </motion.div>
    </div>
  );
};

export default AboutPage;
