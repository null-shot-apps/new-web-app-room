'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Users, Shield, Eye } from 'lucide-react'

export default function CreateVaultForm() {
  const [vaultName, setVaultName] = useState('')
  const [description, setDescription] = useState('')
  const [requiredApprovals, setRequiredApprovals] = useState('3')
  const [approvers, setApprovers] = useState([''])
  const [vaultType, setVaultType] = useState('')

  const addApprover = () => {
    setApprovers([...approvers, ''])
  }

  const removeApprover = (index: number) => {
    setApprovers(approvers.filter((_, i) => i !== index))
  }

  const updateApprover = (index: number, value: string) => {
    const updated = [...approvers]
    updated[index] = value
    setApprovers(updated)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle vault creation
    console.log('Creating vault:', {
      vaultName,
      description,
      requiredApprovals,
      approvers: approvers.filter(a => a.trim()),
      vaultType
    })
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            Create New Vault
          </CardTitle>
          <CardDescription>
            Set up a secure multi-signature vault for your group funds
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vault Type */}
            <div className="space-y-2">
              <Label htmlFor="vault-type">Vault Type</Label>
              <Select value={vaultType} onValueChange={setVaultType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vault purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="giveaway">Giveaway & Contests</SelectItem>
                  <SelectItem value="community">Community Project</SelectItem>
                  <SelectItem value="charity">Charity & Donations</SelectItem>
                  <SelectItem value="investment">Investment Club</SelectItem>
                  <SelectItem value="event">Event Planning</SelectItem>
                  <SelectItem value="business">Business Treasury</SelectItem>
                  <SelectItem value="escrow">Escrow Service</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Vault Name */}
            <div className="space-y-2">
              <Label htmlFor="vault-name">Vault Name</Label>
              <Input
                id="vault-name"
                value={vaultName}
                onChange={(e) => setVaultName(e.target.value)}
                placeholder="e.g., Community Giveaway Fund"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the purpose of this vault..."
                rows={3}
              />
            </div>

            {/* Required Approvals */}
            <div className="space-y-2">
              <Label htmlFor="approvals">Required Approvals</Label>
              <Select value={requiredApprovals} onValueChange={setRequiredApprovals}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 of N</SelectItem>
                  <SelectItem value="3">3 of N</SelectItem>
                  <SelectItem value="4">4 of N</SelectItem>
                  <SelectItem value="5">5 of N</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-600">
                Number of people who must approve each transaction
              </p>
            </div>

            {/* Approvers */}
            <div className="space-y-2">
              <Label>Vault Approvers</Label>
              <div className="space-y-3">
                {approvers.map((approver, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={approver}
                      onChange={(e) => updateApprover(index, e.target.value)}
                      placeholder="Enter email or wallet address"
                      className="flex-1"
                    />
                    {approvers.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeApprover(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addApprover}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Approver
                </Button>
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security Features
              </h3>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Multi-signature protection - no single person can access funds
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Public transparency - all transactions are visible
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Immutable audit trail - complete transaction history
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-3">
              <Button type="submit" className="flex-1">
                Create Vault
              </Button>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
