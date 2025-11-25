'use client';

import { useState } from 'react';
import { VaultOverview } from './VaultOverview';
import { CreateVaultForm } from './CreateVaultForm';
import { VaultList } from './VaultList';
import { TransactionHistory } from './TransactionHistory';

export function VaultDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVault, setSelectedVault] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '📊 Overview', icon: '📊' },
    { id: 'create', label: '➕ Create Vault', icon: '➕' },
    { id: 'vaults', label: '🏦 My Vaults', icon: '🏦' },
    { id: 'history', label: '📋 Transactions', icon: '📋' },
  ];

  return (
    <div className="space-y-8">
      {/* Navigation Tabs */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-2">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {activeTab === 'overview' && <VaultOverview />}
        {activeTab === 'create' && <CreateVaultForm />}
        {activeTab === 'vaults' && <VaultList onSelectVault={setSelectedVault} />}
        {activeTab === 'history' && <TransactionHistory vaultId={selectedVault} />}
      </div>
    </div>
  );
}
