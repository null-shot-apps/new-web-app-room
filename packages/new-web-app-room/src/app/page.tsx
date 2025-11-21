'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [userType, setUserType] = useState<'customer' | 'chef' | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-orange-600">ChefMarket</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-700 hover:text-orange-600">
                Login
              </Link>
              <Link href="/signup" className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Connect with Local Chefs
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Discover amazing homemade meals from talented chefs in your area
          </p>
          
          {/* User Type Selection */}
          <div className="max-w-md mx-auto mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">I want to:</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setUserType('customer')}
                className={`p-6 rounded-lg border-2 transition-all ${
                  userType === 'customer'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <div className="text-4xl mb-2">🍽️</div>
                <h4 className="font-semibold text-gray-900">Order Food</h4>
                <p className="text-sm text-gray-600">Browse and order from local chefs</p>
              </button>
              
              <button
                onClick={() => setUserType('chef')}
                className={`p-6 rounded-lg border-2 transition-all ${
                  userType === 'chef'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <div className="text-4xl mb-2">👨‍🍳</div>
                <h4 className="font-semibold text-gray-900">Cook & Sell</h4>
                <p className="text-sm text-gray-600">Share your culinary skills</p>
              </button>
            </div>
            
            {userType && (
              <div className="mt-6">
                <Link
                  href={userType === 'customer' ? '/customer/browse' : '/chef/dashboard'}
                  className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 inline-block"
                >
                  Get Started as {userType === 'customer' ? 'Customer' : 'Chef'}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Payments</h3>
            <p className="text-gray-600">
              Multiple payment options with escrow protection for safe transactions
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-5xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Assured</h3>
            <p className="text-gray-600">
              Verified chefs with ratings and reviews from real customers
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Direct Communication</h3>
            <p className="text-gray-600">
              Chat with chefs directly without sharing personal information
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

