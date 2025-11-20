import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Survey<span className="text-indigo-600">Sensei</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            On-chain surveys with automatic reward distribution
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/create"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Create Survey
            </Link>
            <Link
              href="/surveys"
              className="bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse Surveys
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Smart Rewards
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Automatic reward distribution when survey targets are met. Support for native tokens and custom ERC-20 tokens.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Secure Escrow
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Funds are held in secure escrow until survey completion. Transparent and trustless reward distribution.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Instant Validation
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Real-time validation prevents duplicate submissions and ensures fair participation across all respondents.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Create Survey
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Set up your survey with questions, reward amount, and target number of respondents.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Collect Responses
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Share your survey link and watch responses come in. Each participant connects their wallet.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Auto Rewards
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                When targets are met, rewards are automatically distributed to all participants.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

