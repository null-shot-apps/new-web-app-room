'use client';

import { useState } from 'react';

export function CreateVaultForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    requiredApprovals: 3,
    members: [''],
    purpose: 'general'
  });

  const addMember = () => {
    setFormData(prev => ({
      ...prev,
      members: [...prev.members, '']
    }));
  };

  const updateMember = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.map((member, i) => i === index ? value : member)
    }));
  };

  const removeMember = (index: number) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle vault creation
    console.log('Creating vault:', formData);
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            🏗️ Create New Vault
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Set up a secure multi-signature vault for your group funds
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Vault Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Vault Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Community Giveaway Fund"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Describe the purpose of this vault..."
              required
            />
          </div>

          {/* Purpose */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Vault Purpose
            </label>
            <select
              value={formData.purpose}
              onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="general">General Fund</option>
              <option value="giveaway">Giveaway/Contest</option>
              <option value="charity">Charity Drive</option>
              <option value="investment">Investment Club</option>
              <option value="event">Event Planning</option>
              <option value="business">Business Treasury</option>
              <option value="escrow">Escrow Service</option>
            </select>
          </div>

          {/* Required Approvals */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Required Approvals
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="2"
                max="10"
                value={formData.requiredApprovals}
                onChange={(e) => setFormData(prev => ({ ...prev, requiredApprovals: parseInt(e.target.value) }))}
                className="flex-1"
              />
              <div className="bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-lg">
                <span className="text-blue-800 dark:text-blue-200 font-bold">
                  {formData.requiredApprovals} approvals needed
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Number of people who must approve each transaction
            </p>
          </div>

          {/* Members */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Vault Members
            </label>
            <div className="space-y-3">
              {formData.members.map((member, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="email"
                    value={member}
                    onChange={(e) => updateMember(index, e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="member@example.com"
                    required
                  />
                  {formData.members.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMember(index)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      ❌
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addMember}
                className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors"
              >
                ➕ Add Member
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              🚀 Create Vault
            </button>
          </div>
        </form>

        {/* Security Notice */}
        <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <div className="flex items-start space-x-3">
            <span className="text-green-500 text-xl">🔒</span>
            <div>
              <h4 className="font-semibold text-green-800 dark:text-green-200">Security Features</h4>
              <ul className="text-sm text-green-700 dark:text-green-300 mt-1 space-y-1">
                <li>• Multi-signature protection - no single person can access funds</li>
                <li>• All transactions are publicly visible and auditable</li>
                <li>• Members receive notifications for all vault activities</li>
                <li>• Funds are secured by blockchain technology</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
