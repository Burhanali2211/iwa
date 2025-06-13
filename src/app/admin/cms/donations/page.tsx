'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CMSLayout from '@/components/admin/CMSLayout';
import {
  Heart,
  DollarSign,
  TrendingUp,
  Plus,
  Eye,
  Target,
  Users,
  CreditCard,
  BarChart3,
  CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

interface DonationCampaign {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  donorCount: number;
  status: 'active' | 'completed' | 'paused' | 'draft';
  startDate: string;
  endDate: string;
  category: 'sadaqah' | 'zakat' | 'building_fund' | 'student_sponsorship' | 'general';
  lastModified: string;
}

interface DonationStats {
  totalRaised: number;
  totalDonors: number;
  activeCampaigns: number;
  monthlyGrowth: number;
  averageDonation: number;
  completedGoals: number;
}

interface APICampaignData {
  id: string;
  title: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  donorCount: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
  type: string;
  lastModified: string;
}

export default function DonationManagementCMS() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<DonationCampaign[]>([]);
  const [stats, setStats] = useState<DonationStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'goals' | 'analytics'>('overview');

  useEffect(() => {
    fetchDonationData();
  }, []);

  const fetchDonationData = async () => {
    try {
      setIsLoading(true);

      // Fetch data from API
      const response = await fetch('/api/cms/donations?limit=50');
      const result = await response.json();

      if (result.success) {
        // Transform API data to match component interface
        const transformedCampaigns = result.data.map((campaign: APICampaignData) => ({
          id: campaign.id,
          title: campaign.title,
          description: campaign.description,
          targetAmount: campaign.goalAmount,
          raisedAmount: campaign.currentAmount,
          donorCount: campaign.donorCount,
          status: campaign.isActive ? 'active' : 'paused',
          startDate: campaign.startDate,
          endDate: campaign.endDate,
          category: campaign.type,
          lastModified: campaign.lastModified
        }));

        const transformedStats: DonationStats = {
          totalRaised: result.stats.totalRaised,
          totalDonors: result.stats.totalDonors,
          activeCampaigns: result.stats.activeCampaigns,
          monthlyGrowth: 15.2, // This would come from analytics
          averageDonation: result.stats.averageDonation,
          completedGoals: 8 // This would be calculated
        };

        setStats(transformedStats);
        setCampaigns(transformedCampaigns);
      } else {
        toast.error(result.error || 'Failed to load donation data');
      }

    } catch (error) {
      console.error('Error fetching donation data:', error);
      toast.error('Failed to load donation management data');
    } finally {
      setIsLoading(false);
    }
  };



  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'sadaqah':
        return 'bg-green-50 text-green-700';
      case 'zakat':
        return 'bg-blue-50 text-blue-700';
      case 'building_fund':
        return 'bg-purple-50 text-purple-700';
      case 'student_sponsorship':
        return 'bg-orange-50 text-orange-700';
      case 'general':
        return 'bg-gray-50 text-gray-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getProgressPercentage = (raised: number, target: number) => {
    return Math.min((raised / target) * 100, 100);
  };

  const breadcrumbs = [
    { label: 'Admin', href: '/admin' },
    { label: 'CMS', href: '/admin/cms' },
    { label: 'Donation Management' }
  ];

  const actions = (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => window.open('/donations', '_blank')}
        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <Eye className="h-4 w-4" />
        <span>Preview Donations</span>
      </button>
      <button
        onClick={() => router.push('/admin/cms/donations/create')}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <Plus className="h-4 w-4" />
        <span>New Campaign</span>
      </button>
    </div>
  );

  if (isLoading) {
    return (
      <CMSLayout title="Donation Management CMS" breadcrumbs={breadcrumbs}>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </CMSLayout>
    );
  }

  return (
    <CMSLayout 
      title="Donation Management CMS" 
      description="Manage donation campaigns, goals, and payment methods"
      breadcrumbs={breadcrumbs}
      actions={actions}
    >
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Raised</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRaised)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Donors</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDonors}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeCampaigns}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Growth</p>
                <p className="text-2xl font-bold text-gray-900">{stats.monthlyGrowth}%</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Donation</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.averageDonation)}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Goals</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedGoals}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: Heart },
              { id: 'campaigns', label: 'Campaigns', icon: Target },
              { id: 'goals', label: 'Goals', icon: TrendingUp },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'overview' | 'campaigns' | 'goals' | 'analytics')}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Campaigns */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Campaigns</h3>
                <div className="space-y-4">
                  {campaigns.filter(c => c.status === 'active').slice(0, 3).map((campaign) => (
                    <div key={campaign.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{campaign.title}</h4>
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${getCategoryColor(campaign.category)}`}>
                            {campaign.category.replace('_', ' ')}
                          </span>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>{formatCurrency(campaign.raisedAmount)} raised</span>
                          <span>{formatCurrency(campaign.targetAmount)} goal</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${getProgressPercentage(campaign.raisedAmount, campaign.targetAmount)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{campaign.donorCount} donors</span>
                          <span>{Math.round(getProgressPercentage(campaign.raisedAmount, campaign.targetAmount))}% complete</span>
                        </div>
                      </div>

                      <button
                        onClick={() => router.push(`/admin/cms/donations/campaigns/${campaign.id}`)}
                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                      >
                        Manage Campaign →
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-4">
                  <button
                    onClick={() => router.push('/admin/cms/donations/create')}
                    className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left"
                  >
                    <Target className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Create New Campaign</p>
                      <p className="text-sm text-gray-600">Launch a new fundraising campaign</p>
                    </div>
                  </button>

                  <button
                    onClick={() => router.push('/admin/cms/donations/goals')}
                    className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left"
                  >
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Set Fundraising Goals</p>
                      <p className="text-sm text-gray-600">Define targets and milestones</p>
                    </div>
                  </button>

                  <button
                    onClick={() => router.push('/admin/cms/donations/payments')}
                    className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left"
                  >
                    <CreditCard className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">Payment Methods</p>
                      <p className="text-sm text-gray-600">Configure payment options</p>
                    </div>
                  </button>

                  <button
                    onClick={() => router.push('/admin/cms/donations/analytics')}
                    className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-left"
                  >
                    <BarChart3 className="h-6 w-6 text-orange-600" />
                    <div>
                      <p className="font-medium text-gray-900">View Analytics</p>
                      <p className="text-sm text-gray-600">Donation trends and insights</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'campaigns' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Campaign Management</h3>
                <button
                  onClick={() => router.push('/admin/cms/donations/create')}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>New Campaign</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{campaign.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{campaign.description}</p>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(campaign.category)}`}>
                            {campaign.category.replace('_', ' ')}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(campaign.status)}`}>
                            {campaign.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>{Math.round(getProgressPercentage(campaign.raisedAmount, campaign.targetAmount))}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-green-500 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${getProgressPercentage(campaign.raisedAmount, campaign.targetAmount)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>{formatCurrency(campaign.raisedAmount)} raised</span>
                        <span>{formatCurrency(campaign.targetAmount)} goal</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-gray-500">Donors</p>
                        <p className="font-semibold text-gray-900">{campaign.donorCount}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">End Date</p>
                        <p className="font-semibold text-gray-900">{formatDate(campaign.endDate)}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => router.push(`/admin/cms/donations/campaigns/${campaign.id}`)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors"
                      >
                        Edit Campaign
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'goals' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Fundraising Goals</h3>
                <button
                  onClick={() => router.push('/admin/cms/donations/goals/create')}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Set New Goal</span>
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Fundraising goals management interface will be implemented here.</p>
                <p className="text-sm text-gray-500 mt-2">This will include goal setting, milestone tracking, and progress monitoring.</p>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Donation Analytics</h3>

              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Advanced analytics dashboard will be implemented here.</p>
                <p className="text-sm text-gray-500 mt-2">This will include donation trends, donor insights, and performance metrics.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </CMSLayout>
  );
}
