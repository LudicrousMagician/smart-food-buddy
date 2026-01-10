import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Scan, 
  Shield, 
  Zap, 
  Upload, 
  ChevronRight, 
  CheckCircle2,
  Leaf,
  ArrowRight
} from 'lucide-react';

const Index: React.FC = () => {
  const features = [
    {
      icon: Scan,
      title: 'AI-Powered OCR',
      description: 'Advanced text recognition extracts ingredients from food labels and menus instantly.',
    },
    {
      icon: Shield,
      title: 'Health Profile Matching',
      description: 'Get personalized safety alerts based on your allergies and medical conditions.',
    },
    {
      icon: Zap,
      title: 'Instant Analysis',
      description: 'Receive comprehensive nutritional breakdown and safety classification in seconds.',
    },
  ];

  const steps = [
    { step: '01', title: 'Upload Image', description: 'Take or upload a photo of any food label or menu' },
    { step: '02', title: 'AI Analysis', description: 'Our AI extracts and analyzes all ingredients' },
    { step: '03', title: 'Get Results', description: 'View safety ratings and nutrition facts instantly' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Leaf className="w-4 h-4" />
              AI-Powered Food Analysis
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Know What You Eat with{' '}
              <span className="text-primary">SmartFoodAI</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Upload food labels or menu images and get instant AI-powered ingredient analysis, 
              nutritional insights, and personalized health recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/upload"
                className="btn-primary text-lg py-4 px-8"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/dashboard"
                className="btn-outline text-lg py-4 px-8"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Powerful Features for Your Health
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI technology makes it easy to understand what's in your food
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card-elevated p-8 text-center group hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((item, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-display font-bold text-xl mb-6">
                    {item.step}
                  </div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%]">
                    <ChevronRight className="w-6 h-6 text-muted-foreground/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Make Informed Food Choices
              </h2>
              <p className="text-muted-foreground mb-8">
                Whether you have allergies, dietary restrictions, or health conditions, 
                SmartFoodAI helps you understand exactly what's in your food.
              </p>
              <ul className="space-y-4">
                {[
                  'Identify allergens and harmful additives instantly',
                  'Get personalized recommendations based on your health profile',
                  'Track your food analysis history',
                  'Understand nutritional content at a glance',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-elevated p-8 lg:p-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Upload className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                  Ready to Start?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Start analyzing your food in minutes.
                </p>
                <Link
                  to="/upload"
                  className="btn-primary w-full"
                >
                  Analyze Food Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
