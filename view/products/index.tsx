'use client';

import React from 'react';

const Products: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Our Products
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product Card 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Eco-Friendly Products
            </h3>
            <p className="text-gray-600 mb-4">
              Sustainable solutions for a greener tomorrow.
            </p>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
              Learn More
            </button>
          </div>

          {/* Product Card 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">♻️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Recycling Solutions
            </h3>
            <p className="text-gray-600 mb-4">
              Innovative recycling technology for waste management.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Learn More
            </button>
          </div>

          {/* Product Card 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Energy Solutions
            </h3>
            <p className="text-gray-600 mb-4">
              Renewable energy products for sustainable living.
            </p>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
