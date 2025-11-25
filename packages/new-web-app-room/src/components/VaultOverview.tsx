'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Wallet, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  Eye,
  Shield,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

export default function VaultOverview() {
  // Mock data - in real app this would come from props or API
  const vaultData = {
    name: "Community Giveaway Fund",
    type: "Giveaway & Contests",
    balance: 15750.00,
    totalDeposits: 18500.00,
    totalWithdrawals: 2750.00,
    requiredApprovals: 3,
    totalApprovers: 5,
    pendingTransactions: 2,
    completedTransactions: 12,
    status: "active"
  }

  const recentTransactions = [
    {
      id: 1,
      type: "withdrawal",
      amount: 500,
      description: "Winner payout - Contest #3",
      status: "completed",
      approvals: 3,
      requiredApprovals: 3,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      type: "deposit",
      amount: 1000,
      description: "Community contribution",
      status: "completed",
      timestamp: "1 day ago"
    },
    {
      id: 3,
      type: "withdrawal",
      amount: 750,
      description: "Prize distribution",
      status: "pending",
      approvals: 2,
      requiredApprovals: 3,
      timestamp: "2 days ago"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Vault Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{vaultData.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary">{vaultData.type}</Badge>
            <Badge variant={vaultData.status === 'active' ? 'default' : 'secondary'}>
              {vaultData.status}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Public View
          </Button>
          <Button size="sm">
            <ArrowUpRight className="h-4 w-4 mr-2" />
            Deposit
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Balance</p>
                <p className="text-2xl font-bold text-green-600">
                  ${vaultData.balance.toLocaleString()}
                </p>
              </div>
              <Wallet className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Security Level</p>
                <p className="text-2xl font-bold text-blue-600">
                  {vaultData.requiredApprovals}/{vaultData.totalApprovers}
                </p>
                <p className="text-xs text-gray-500">approvals required</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Actions</p>
                <p className="text-2xl font-bold text-orange-600">
                  {vaultData.pendingTransactions}
                </p>
                <p className="text-xs text-gray-500">need approval</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Activity</p>
                <p className="text-2xl font-bold text-purple-600">
                  {vaultData.completedTransactions}
                </p>
                <p className="text-xs text-gray-500">transactions</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Latest activity in this vault
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'deposit' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {transaction.type === 'deposit' ? (
                      <ArrowDownRight className="h-4 w-4" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-600">{transaction.timestamp}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={`font-medium ${
                      transaction.type === 'deposit' ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount}
                    </p>
                    {transaction.status === 'pending' && transaction.approvals !== undefined && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Users className="h-3 w-3" />
                        {transaction.approvals}/{transaction.requiredApprovals} approved
                      </div>
                    )}
                  </div>
                  
                  <Badge variant={
                    transaction.status === 'completed' ? 'default' : 
                    transaction.status === 'pending' ? 'secondary' : 'destructive'
                  }>
                    {transaction.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {transaction.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <Button variant="outline" className="w-full">
              View All Transactions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <ArrowDownRight className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-medium mb-1">Deposit Funds</h3>
            <p className="text-sm text-gray-600">Add money to the vault</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <ArrowUpRight className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-medium mb-1">Request Withdrawal</h3>
            <p className="text-sm text-gray-600">Propose a payout</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-medium mb-1">Manage Approvers</h3>
            <p className="text-sm text-gray-600">Add or remove vault members</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
