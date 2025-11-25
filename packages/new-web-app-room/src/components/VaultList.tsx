'use client';

import { useState } from 'react';

interface VaultListProps {
  onSelectVault: (vaultId: string) => void;
}

interface Vault {
  id: string;
  name: string;
  description: string;
  balance: number;
  currency: string;
  members: number;
  requiredApprovals: number;
  pendingTransactions: number;
  status: 'active' | 'pending' | 'locked';
  purpose: string;
  createdAt: string;
}

export function VaultList({ onSelectVault }: VaultListProps) {
  const [selectedVault, setSelectedVault] = useState<string | null>(null);

  // Mock data - in real app, this would come from API
  const vaults: Vault[] = [
    {
      id: '1',
      name: 'Community Giveaway Fund',
      description: 'Monthly giveaway for our Discord community',
      balance: 5000,
      currency: 'USD',
      members: 5,
      requiredApprovals: 3,
      pendingTransactions: 2,
      status: 'active',
      purpose: 'giveaway',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Charity Drive 2024',
      description: 'Fundraising for local animal shelter',
      balance: 12500,
      currency: 'USD',
      members: 8,
      requiredApprovals: 4,
      pendingTransactions: 0,
      status: 'active',
      purpose: 'charity',
      createdAt: '2024-02-01'
    },
    {
      id: '3',
      name: 'Wedding Planning Fund',
      description: 'Joint savings for Sarah & Mike\'s wedding',
      balance: 8750,
      currency: 'USD',
      members: 4,
      requiredApprovals: 2,
      pendingTransactions: 1,
      status: 'active',
      purpose: 'event',
      createdAt: '2024-01-20'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'locked': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getPurposeEmoji = (purpose: string) => {
    switch (purpose) {
      case 'giveaway': return '🎁';
      case 'charity': return '❤️';
      case 'event': return '🎉';
      case 'investment': return '📈';
      case 'business': return '🏢';
      case 'escrow': return '🤝';
      default: return '💰';
    }
  };

  const handleVaultClick = (vaultId: string) => {
    setSelectedVault(vaultId);
    onSelectVault(vaultId);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          🏦 Your Vaults
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your multi-signature vaults and track their activity
        </p>
      </div>

      {vaults.length === 0 ? (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-12 text-center">
          <div className="text-6xl mb-4">🏦</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Vaults Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Create your first vault to start managing group funds securely
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            ➕ Create First Vault
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {vaults.map((vault) => (
            <div
              key={vault.id}
              onClick={() => handleVaultClick(vault.id)}
              className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 ${
                selectedVault === vault.id ? 'ring-2 ring-blue-500 shadow-2xl' : 'hover:shadow-2xl'
              }`}
            >
              {/* Vault Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getPurposeEmoji(vault.purpose)}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                      {vault.name}
                    </h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vault.status)}`}>
                      {vault.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                {vault.pendingTransactions > 0 && (
                  <div className="bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 px-2 py-1 rounded-full text-xs font-medium">
                    {vault.pendingTransactions} pending
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {vault.description}
              </p>

              {/* Balance */}
              <div className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-xl p-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${vault.balance.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Current Balance
                  </div>
                </div>
              </div>

              {/* Vault Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {vault.members}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">Members</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {vault.requiredApprovals}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">Approvals</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors">
                    💰 Deposit
                  </button>
                  <button className="flex-1 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 py-2 px-3 rounded-lg text-sm font-medium hover:bg-emerald-200 dark:hover:bg-emerald-900/40 transition-colors">
                    📤 Send
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Selected Vault Details */}
      {selectedVault && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            🔍 Vault Details
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-white">Security Settings</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Required Approvals:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {vaults.find(v => v.id === selectedVault)?.requiredApprovals}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Total Members:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {vaults.find(v => v.id === selectedVault)?.members}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-white">Activity</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Pending Transactions:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {vaults.find(v => v.id === selectedVault)?.pendingTransactions}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Created:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {vaults.find(v => v.id === selectedVault)?.createdAt}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-white">Actions</h4>
              <div className="space-y-2">
                <button className="w-full bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors">
                  📊 View Analytics
                </button>
                <button className="w-full bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 py-2 px-4 rounded-lg text-sm font-medium hover:bg-emerald-200 dark:hover:bg-emerald-900/40 transition-colors">
                  ⚙️ Manage Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
