'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Search,
  Filter,
  Download,
  Users,
  Eye
} from 'lucide-react'

export default function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock transaction data
  const transactions = [
    {
      id: 'tx-001',
      type: 'deposit',
      amount: 1000,
      description: 'Community contribution from Alice',
      status: 'completed',
      timestamp: '2024-01-15T10:30:00Z',
      hash: '0x1234...5678',
      from: 'alice@example.com',
      approvals: null,
      requiredApprovals: null
    },
    {
      id: 'tx-002',
      type: 'withdrawal',
      amount: 500,
      description: 'Winner payout - Contest #3',
      status: 'completed',
      timestamp: '2024-01-14T15:45:00Z',
      hash: '0x2345...6789',
      to: 'winner@example.com',
      approvals: 3,
      requiredApprovals: 3,
      approvers: ['alice@example.com', 'bob@example.com', 'charlie@example.com']
    },
    {
      id: 'tx-003',
      type: 'withdrawal',
      amount: 750,
      description: 'Prize distribution for top 3 winners',
      status: 'pending',
      timestamp: '2024-01-13T09:20:00Z',
      hash: null,
      to: 'multiple recipients',
      approvals: 2,
      requiredApprovals: 3,
      approvers: ['alice@example.com', 'bob@example.com']
    },
    {
      id: 'tx-004',
      type: 'deposit',
      amount: 2500,
      description: 'Sponsor contribution - TechCorp',
      status: 'completed',
      timestamp: '2024-01-12T14:10:00Z',
      hash: '0x3456...7890',
      from: 'sponsor@techcorp.com',
      approvals: null,
      requiredApprovals: null
    },
    {
      id: 'tx-005',
      type: 'withdrawal',
      amount: 300,
      description: 'Platform fees',
      status: 'failed',
      timestamp: '2024-01-11T11:30:00Z',
      hash: null,
      to: 'platform@vault.com',
      approvals: 1,
      requiredApprovals: 3,
      approvers: ['alice@example.com'],
      failureReason: 'Insufficient approvals'
    }
  ]

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default'
      case 'pending': return 'secondary'
      case 'failed': return 'destructive'
      default: return 'secondary'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-3 w-3" />
      case 'pending': return <Clock className="h-3 w-3" />
      case 'failed': return <AlertCircle className="h-3 w-3" />
      default: return <Clock className="h-3 w-3" />
    }
  }

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || tx.type === filterType
    const matchesStatus = filterStatus === 'all' || tx.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
          <p className="text-gray-600">Complete audit trail of all vault activity</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Public View
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="deposit">Deposits</SelectItem>
                <SelectItem value="withdrawal">Withdrawals</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {filteredTransactions.length} Transaction{filteredTransactions.length !== 1 ? 's' : ''}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
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
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{transaction.description}</h3>
                        <Badge variant={getStatusColor(transaction.status)}>
                          {getStatusIcon(transaction.status)}
                          {transaction.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>ID: {transaction.id}</p>
                        <p>Date: {formatDate(transaction.timestamp)}</p>
                        {transaction.hash && (
                          <p>Hash: {transaction.hash}</p>
                        )}
                        {transaction.from && (
                          <p>From: {transaction.from}</p>
                        )}
                        {transaction.to && (
                          <p>To: {transaction.to}</p>
                        )}
                        {transaction.failureReason && (
                          <p className="text-red-600">Reason: {transaction.failureReason}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`text-lg font-semibold ${
                      transaction.type === 'deposit' ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </p>
                    {transaction.approvals !== null && (
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <Users className="h-3 w-3" />
                        {transaction.approvals}/{transaction.requiredApprovals} approved
                      </div>
                    )}
                  </div>
                </div>

                {/* Approvers for pending/failed withdrawals */}
                {transaction.approvers && transaction.status !== 'completed' && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs text-gray-500 mb-2">Approvers:</p>
                    <div className="flex flex-wrap gap-1">
                      {transaction.approvers.map((approver, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {approver}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {filteredTransactions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No transactions found matching your criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
