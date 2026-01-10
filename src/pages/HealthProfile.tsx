import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile, ALLERGIES, CONDITIONS, DIETARY_PREFERENCES } from '@/context/ProfileContext';
import Layout from '@/components/Layout';
import { Shield, Check, AlertTriangle, Salad } from 'lucide-react';
import Loader from '@/components/Loader';

const HealthProfile: React.FC = () => {
  const { profile, updateProfile } = useProfile();
  const navigate = useNavigate();
  
  const [allergies, setAllergies] = useState<string[]>(profile.allergies);
  const [conditions, setConditions] = useState<string[]>(profile.conditions);
  const [dietaryPreference, setDietaryPreference] = useState(profile.dietaryPreference);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const toggleAllergy = (allergyId: string) => {
    setAllergies(prev =>
      prev.includes(allergyId)
        ? prev.filter(a => a !== allergyId)
        : [...prev, allergyId]
    );
  };

  const toggleCondition = (conditionId: string) => {
    setConditions(prev =>
      prev.includes(conditionId)
        ? prev.filter(c => c !== conditionId)
        : [...prev, conditionId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dietaryPreference) {
      setError('Please select a dietary preference');
      return;
    }
    
    setIsSaving(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      updateProfile({
        allergies,
        conditions,
        dietaryPreference: dietaryPreference as 'vegetarian' | 'non-vegetarian' | 'vegan',
      });
      setIsSaving(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <Layout>
      <div className="content-container">
        <div className="max-w-2xl mx-auto animate-slide-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Set Up Your Health Profile
            </h1>
            <p className="text-muted-foreground">
              Help us personalize your food safety recommendations
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Allergies Section */}
            <div className="card-elevated p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h2 className="font-display font-semibold text-lg text-foreground">Allergies</h2>
                  <p className="text-sm text-muted-foreground">Select any food allergies you have</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ALLERGIES.map((allergy) => (
                  <button
                    key={allergy.id}
                    type="button"
                    onClick={() => toggleAllergy(allergy.id)}
                    className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                      allergies.includes(allergy.id)
                        ? 'border-primary bg-primary/5 text-foreground'
                        : 'border-border bg-card hover:border-muted-foreground/30 text-muted-foreground'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                      allergies.includes(allergy.id)
                        ? 'bg-primary border-primary'
                        : 'border-border'
                    }`}>
                      {allergies.includes(allergy.id) && (
                        <Check className="w-3 h-3 text-primary-foreground" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{allergy.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Medical Conditions Section */}
            <div className="card-elevated p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <h2 className="font-display font-semibold text-lg text-foreground">Medical Conditions</h2>
                  <p className="text-sm text-muted-foreground">Select any conditions we should consider</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CONDITIONS.map((condition) => (
                  <button
                    key={condition.id}
                    type="button"
                    onClick={() => toggleCondition(condition.id)}
                    className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                      conditions.includes(condition.id)
                        ? 'border-primary bg-primary/5 text-foreground'
                        : 'border-border bg-card hover:border-muted-foreground/30 text-muted-foreground'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                      conditions.includes(condition.id)
                        ? 'bg-primary border-primary'
                        : 'border-border'
                    }`}>
                      {conditions.includes(condition.id) && (
                        <Check className="w-3 h-3 text-primary-foreground" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{condition.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Preference Section */}
            <div className="card-elevated p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Salad className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h2 className="font-display font-semibold text-lg text-foreground">Dietary Preference</h2>
                  <p className="text-sm text-muted-foreground">Choose your dietary preference</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {DIETARY_PREFERENCES.map((pref) => (
                  <button
                    key={pref.id}
                    type="button"
                    onClick={() => setDietaryPreference(pref.id as 'vegetarian' | 'non-vegetarian' | 'vegan')}
                    className={`p-4 rounded-lg border transition-all text-center ${
                      dietaryPreference === pref.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card hover:border-muted-foreground/30'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 mx-auto mb-2 flex items-center justify-center ${
                      dietaryPreference === pref.id
                        ? 'border-primary bg-primary'
                        : 'border-border'
                    }`}>
                      {dietaryPreference === pref.id && (
                        <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                    <span className={`text-sm font-medium ${
                      dietaryPreference === pref.id ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {pref.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSaving}
              className="btn-primary w-full"
            >
              {isSaving ? <Loader size="sm" text="" /> : 'Save Profile & Continue'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default HealthProfile;
