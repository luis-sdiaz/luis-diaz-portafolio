'use client';

import React from 'react';

interface QuickFact {
  id: string;
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}

interface SkillChip {
  name: string;
  category: 'core' | 'framework' | 'database' | 'hardware';
  level: string;
}

export default function About() {
  return null;
}
