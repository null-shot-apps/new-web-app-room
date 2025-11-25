'use client';

export function VaultOverview() {
  const stats = [
    { label: 'Total Vaults', value: '12', change: '+3 this month', icon: '🏦', color: 'from-blue-500 to-blue-600' },
    { label: 'Total Secured', value: '$45,230', change: '+$12,500 this week', icon: '💰', color: 'from-emerald-500 to-emerald-600' },
    { label: 'Active Approvers', value: '38', change: '+5 new members', icon: '👥', color: 'from-purple-500 to-purple-600' },
    { label: 'Transactions', value: '156', change: '+23 this week', icon: '📊', color: 'from-orange-500 to-orange-600' },
  ];

  const recentActivity = [
    { type: 'deposit', amount: '$2,500', vault: 'Community Fund', time: '2 hours ago', status: 'completed' },
    { type: 'withdrawal', amount: '$800', vault: 'Event Budget', time: '5 hours ago', status: 'pending', approvals: '2/3' },
    { type: 'approval', amount: '$1,200', vault: 'Charity Drive', time: '1 day ago', status: 'approved' },
    { type: 'deposit', amount: '$5,000', vault: 'Investment Club', time: '2 days ago', status: 'completed' },
  ];

  const useCases = [
    {
      title: 'Community Contributions',
      description: 'Pool funds for community projects with transparent spending',
      icon: '🏘️',
      examples: ['Neighborhood improvements', 'Local events', 'Shared resources']
    },
    {
      title: 'Charity & Donations',
      description: 'Manage donation drives with public accountability',
      icon: '❤️',
      examples: ['Fundraising campaigns', 'Relief efforts', 'Cause support']
    },
    {
      title: 'Group Projects',
      description: 'Joint ventures with shared financial responsibility',
      icon: '🤝',
      examples: ['Business partnerships', 'Investment groups', 'Collaborative ventures']
    },
    {
      title: 'Event Management',
      description: 'Budget management for events with multiple organizers',
      icon: '🎉',
      examples: ['Weddings', 'Conferences', 'Group trips']
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8 text-white">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">Welcome to Multi-Key Vault</h2>
          <p className="text-xl text-blue-100 mb-6">
            The transparent solution for group money management. No single person controls the funds - 
            every withdrawal requires multiple approvers, and all transactions are publicly visible.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="font-semibold">🔐 Multi-signature security</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="font-semibold">👁️ Full transparency</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="font-semibold">📱 Simple interface</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-white text-xl`}>
                {stat.icon}
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            </div>
            <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity & Use Cases */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="mr-2">⚡</span>
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'deposit' ? 'bg-emerald-100 text-emerald-600' :
                    activity.type === 'withdrawal' ? 'bg-orange-100 text-orange-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {activity.type === 'deposit' ? '⬇️' : activity.type === 'withdrawal' ? '⬆️' : '✅'}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {activity.amount} • {activity.vault}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activity.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                    activity.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {activity.status === 'pending' && activity.approvals ? activity.approvals : activity.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="mr-2">🎯</span>
            Perfect For
          </h3>
          <div className="space-y-4">
            {useCases.map((useCase, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{useCase.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {useCase.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {useCase.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {useCase.examples.map((example, i) => (
                        <span key={i} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
