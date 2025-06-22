'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
    );
  }

  return (
    <div className="p-1">
        <header className="bg-surface p-6 rounded-lg shadow-card mb-8">
            <div className="flex justify-between items-center">
                <div>
                    <div className="flex items-center text-sm text-text-muted mb-2">
                        <span className="cursor-pointer hover:text-foreground" onClick={() => router.push('/admin')}>Admin</span>
                        <span className="mx-2">/</span>
                        <span className="cursor-pointer hover:text-foreground" onClick={() => router.push('/admin/cms')}>CMS</span>
                        <span className="mx-2">/</span>
                        <span>Donations</span>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground">Donation Management</h1>
                    <p className="text-text-secondary mt-1">Manage donation campaigns, track progress, and view analytics.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => window.open('/donations', '_blank')} className="flex items-center gap-2 text-sm px-4 py-2 rounded-md border border-border text-text-secondary hover:bg-background">
                        <Eye className="h-4 w-4" />
                        Preview
                    </button>
                    <button onClick={() => router.push('/admin/cms/donations/create')} className="flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                        <Plus className="h-4 w-4" />
                        New Campaign
                    </button>
                </div>
            </div>
        </header>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-surface rounded-lg shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted">Total Raised</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(stats.totalRaised)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-surface rounded-lg shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted">Total Donors</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalDonors}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-surface rounded-lg shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted">Active Campaigns</p>
                <p className="text-2xl font-bold text-foreground">{stats.activeCampaigns}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-surface rounded-lg shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted">Monthly Growth</p>
                <p className="text-2xl font-bold text-foreground">{stats.monthlyGrowth}%</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-lg shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted">Avg. Donation</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(stats.averageDonation)}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <CreditCard className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-lg shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted">Completed Goals</p>
                <p className="text-2xl font-bold text-foreground">{stats.completedGoals}</p>
              </div>
              <div className="bg-teal-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-teal-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-border">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${
                activeTab === 'overview'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-muted hover:text-text-secondary hover:border-border'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`${
                activeTab === 'campaigns'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-muted hover:text-text-secondary hover:border-border'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Campaigns
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`${
                activeTab === 'analytics'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-muted hover:text-text-secondary hover:border-border'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Analytics
            </button>
          </nav>
        </div>
      </div>
      
      {/* Content based on active tab */}
      {activeTab === 'campaigns' && (
        <div className="bg-surface rounded-lg shadow-card">
          <table className="w-full text-left">
            <thead className="bg-background">
              <tr>
                <th className="p-4 font-semibold text-sm text-text-secondary">Campaign</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Progress</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Status</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Dates</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b border-border last:border-b-0 hover:bg-background">
                  <td className="p-4">
                    <div className="font-semibold text-foreground">{campaign.title}</div>
                    <div className="text-xs text-text-muted">{campaign.category}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-24 bg-background rounded-full h-2 mr-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${getProgressPercentage(campaign.raisedAmount, campaign.targetAmount)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-text-secondary">
                        {formatCurrency(campaign.raisedAmount)} / {formatCurrency(campaign.targetAmount)}
                      </span>
                    </div>
                    <div className="text-xs text-text-muted mt-1">{campaign.donorCount} donors</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-text-secondary">
                    <div>Start: {formatDate(campaign.startDate)}</div>
                    <div>End: {formatDate(campaign.endDate)}</div>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => router.push(`/admin/cms/donations/edit/${campaign.id}`)}
                      className="text-primary hover:underline text-sm"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'overview' && (
        <div className="text-center py-12 bg-surface rounded-lg shadow-card">
            <h3 className="text-lg font-medium text-foreground">Overview Section</h3>
            <p className="mt-2 text-sm text-text-muted">Analytics and summary will be displayed here.</p>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="text-center py-12 bg-surface rounded-lg shadow-card">
            <h3 className="text-lg font-medium text-foreground">Analytics Dashboard</h3>
            <p className="mt-2 text-sm text-text-muted">Detailed charts and donation trends will be here.</p>
        </div>
      )}
    </div>
  );
}
