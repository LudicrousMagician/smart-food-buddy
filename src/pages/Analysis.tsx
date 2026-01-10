import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAnalysis, Ingredient } from '@/context/AnalysisContext';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowLeft, 
  Upload, 
  Flame,
  Beef,
  Wheat,
  Droplets,
  AlertCircle
} from 'lucide-react';

const SafetyBadge: React.FC<{ safety: Ingredient['safety'] }> = ({ safety }) => {
  const config = {
    safe: { class: 'badge-safe', icon: CheckCircle2, label: 'Safe' },
    moderate: { class: 'badge-moderate', icon: AlertTriangle, label: 'Moderate' },
    unsafe: { class: 'badge-unsafe', icon: XCircle, label: 'Unsafe' },
  };
  
  const { class: className, icon: Icon, label } = config[safety];
  
  return (
    <span className={className}>
      <Icon className="w-3 h-3 mr-1" />
      {label}
    </span>
  );
};

const Analysis: React.FC = () => {
  const { currentAnalysis } = useAnalysis();
  const navigate = useNavigate();

  if (!currentAnalysis) {
    return (
      <Layout>
        <div className="content-container">
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              No Analysis Found
            </h2>
            <p className="text-muted-foreground mb-6">
              Upload a food image to get started with analysis.
            </p>
            <Link to="/upload" className="btn-primary">
              <Upload className="w-5 h-5 mr-2" />
              Upload Food Image
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const { foodName, imageUrl, ingredients, nutrition, warnings } = currentAnalysis;
  
  const safeCount = ingredients.filter(i => i.safety === 'safe').length;
  const moderateCount = ingredients.filter(i => i.safety === 'moderate').length;
  const unsafeCount = ingredients.filter(i => i.safety === 'unsafe').length;

  return (
    <Layout>
      <div className="content-container">
        <div className="max-w-4xl mx-auto animate-slide-up">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Analysis Results
              </h1>
              <p className="text-muted-foreground">{foodName}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Image & Summary */}
            <div className="lg:col-span-1 space-y-6">
              {/* Image */}
              <div className="card-elevated overflow-hidden">
                <img
                  src={imageUrl}
                  alt={foodName}
                  className="w-full h-48 object-cover"
                />
              </div>

              {/* Safety Summary */}
              <div className="card-elevated p-5">
                <h3 className="font-display font-semibold text-foreground mb-4">Safety Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-safe" />
                      <span className="text-sm text-foreground">Safe Ingredients</span>
                    </div>
                    <span className="font-semibold text-foreground">{safeCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-moderate" />
                      <span className="text-sm text-foreground">Moderate</span>
                    </div>
                    <span className="font-semibold text-foreground">{moderateCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-unsafe" />
                      <span className="text-sm text-foreground">Unsafe</span>
                    </div>
                    <span className="font-semibold text-foreground">{unsafeCount}</span>
                  </div>
                </div>
              </div>

              {/* Nutrition Info */}
              <div className="card-elevated p-5">
                <h3 className="font-display font-semibold text-foreground mb-4">Nutrition Facts</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <Flame className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-lg font-bold text-foreground">{nutrition.calories}</p>
                    <p className="text-xs text-muted-foreground">Calories</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <Beef className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-lg font-bold text-foreground">{nutrition.protein}g</p>
                    <p className="text-xs text-muted-foreground">Protein</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <Wheat className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-lg font-bold text-foreground">{nutrition.carbohydrates}g</p>
                    <p className="text-xs text-muted-foreground">Carbs</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <Droplets className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-lg font-bold text-foreground">{nutrition.fat}g</p>
                    <p className="text-xs text-muted-foreground">Fat</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Warnings */}
              {warnings.length > 0 && (
                <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    <h3 className="font-display font-semibold text-foreground">Health Warnings</h3>
                  </div>
                  <ul className="space-y-2">
                    {warnings.map((warning, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="text-destructive">•</span>
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Ingredients List */}
              <div className="card-elevated p-5">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Detected Ingredients ({ingredients.length})
                </h3>
                <div className="space-y-3">
                  {ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        ingredient.safety === 'unsafe'
                          ? 'bg-destructive/5 border-destructive/20'
                          : ingredient.safety === 'moderate'
                          ? 'bg-warning/5 border-warning/20'
                          : 'bg-success/5 border-success/20'
                      }`}
                    >
                      <div>
                        <p className="font-medium text-foreground">{ingredient.name}</p>
                        {ingredient.reason && (
                          <p className="text-xs text-muted-foreground mt-0.5">{ingredient.reason}</p>
                        )}
                      </div>
                      <SafetyBadge safety={ingredient.safety} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/upload" className="btn-primary flex-1">
                  <Upload className="w-5 h-5 mr-2" />
                  Analyze Another Food
                </Link>
                <Link to="/dashboard" className="btn-secondary flex-1">
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analysis;
