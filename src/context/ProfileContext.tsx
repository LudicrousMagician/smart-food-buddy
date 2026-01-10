import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface HealthProfile {
  allergies: string[];
  conditions: string[];
  dietaryPreference: 'vegetarian' | 'non-vegetarian' | 'vegan' | '';
}

interface ProfileContextType {
  profile: HealthProfile;
  updateProfile: (profile: HealthProfile) => void;
  hasProfile: boolean;
}

const defaultProfile: HealthProfile = {
  allergies: [],
  conditions: [],
  dietaryPreference: '',
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<HealthProfile>(defaultProfile);

  useEffect(() => {
    const storedProfile = localStorage.getItem('healthProfile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  const updateProfile = (newProfile: HealthProfile) => {
    setProfile(newProfile);
    localStorage.setItem('healthProfile', JSON.stringify(newProfile));
  };

  const hasProfile = profile.dietaryPreference !== '';

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, hasProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export const ALLERGIES = [
  { id: 'nuts', label: 'Nuts' },
  { id: 'milk', label: 'Milk / Dairy' },
  { id: 'gluten', label: 'Gluten' },
  { id: 'eggs', label: 'Eggs' },
  { id: 'soy', label: 'Soy' },
  { id: 'shellfish', label: 'Shellfish' },
  { id: 'fish', label: 'Fish' },
];

export const CONDITIONS = [
  { id: 'diabetes', label: 'Diabetes' },
  { id: 'hypertension', label: 'Hypertension' },
  { id: 'heart-disease', label: 'Heart Disease' },
  { id: 'obesity', label: 'Obesity' },
  { id: 'kidney-disease', label: 'Kidney Disease' },
];

export const DIETARY_PREFERENCES = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'non-vegetarian', label: 'Non-Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
];
