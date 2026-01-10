import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import { useAnalysis, AnalysisResult } from '@/context/AnalysisContext';
import { 
  Upload, 
  History, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  TrendingUp,
  Clock,
  ChevronRight,
  Scan
} from 'lucide-react';

const HistoryCard: React.FC<{ analysis: AnalysisResult }> = ({ analysis }) => {
  const safeCount = analysis.ingredients.filter(i => i.safety === 'safe').length;
  const unsafeCount = analysis.ingredients.filter(i => i.safety === 'unsafe').length;
  const date = new Date(analysis.analyzedAt);
  
  return (
    <Link
      to="/analysis"
      className="card-elevated p-4 flex items-center gap-4 hover:shadow-md transition-all"
    >
      <img
        src={analysis.imageUrl}
        alt={analysis.foodName}
        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-foreground truncate">{analysis.foodName}</h3>
        <p className="text-xs text-muted-foreground">
          {date.toLocaleDateString()} at {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
        <div className="flex items-center gap-3 mt-1">
          <span className="flex items-center gap-1 text-xs text-safe">
            <CheckCircle2 className="w-3 h-3" /> {safeCount}
          </span>
          {unsafeCount > 0 && (
            <span className="flex items-center gap-1 text-xs text-unsafe">
              <XCircle className="w-3 h-3" /> {unsafeCount}
            </span>
          )}
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
    </Link>
  );
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { analysisHistory } = useAnalysis();

  const totalAnalyses = analysisHistory.length;
  const totalSafe = analysisHistory.reduce(
    (acc, a) => acc + a.ingredients.filter(i => i.safety === 'safe').length,
    0
  );
  const totalUnsafe = analysisHistory.reduce(
    (acc, a) => acc + a.ingredients.filter(i => i.safety === 'unsafe').length,
    0
  );

  return (
    <Layout>
      <div className="content-container">
        <div className="max-w-6xl mx-auto animate-slide-up">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-muted-foreground">
              Here's your food analysis overview
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="card-elevated p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Analyses</p>
                  <p className="text-2xl font-bold text-foreground">{totalAnalyses}</p>
                </div>
              </div>
            </div>
            <div className="card-elevated p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Safe Ingredients</p>
                  <p className="text-2xl font-bold text-foreground">{totalSafe}</p>
                </div>
              </div>
            </div>
            <div className="card-elevated p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Flagged Items</p>
                  <p className="text-2xl font-bold text-foreground">{totalUnsafe}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <h2 className="font-display font-semibold text-lg text-foreground mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  to="/upload"
                  className="card-elevated p-5 flex items-center gap-4 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Scan className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Analyze New Food</h3>
                    <p className="text-sm text-muted-foreground">Upload a food label or menu</p>
                  </div>
                </Link>
                <Link
                  to="/profile"
                  className="card-elevated p-5 flex items-center gap-4 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Upload className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Update Profile</h3>
                    <p className="text-sm text-muted-foreground">Manage your health settings</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Analysis History */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Recent Analyses
                </h2>
              </div>

              {analysisHistory.length > 0 ? (
                <div className="space-y-3">
                  {analysisHistory.slice(0, 5).map((analysis) => (
                    <HistoryCard key={analysis.id} analysis={analysis} />
                  ))}
                </div>
              ) : (
                <div className="card-elevated p-12 text-center">
                  <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    No analyses yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Upload your first food image to get started
                  </p>
                  <Link to="/upload" className="btn-primary">
                    <Upload className="w-5 h-5 mr-2" />
                    Analyze Your First Food
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
