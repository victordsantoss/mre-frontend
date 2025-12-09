'use client';

import { OnboardingLayout } from '@/components/layout/onboarding';
import TanstackProvider from '@/providers/tanstack.provider';
import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <TanstackProvider>
      <OnboardingLayout>{children}</OnboardingLayout>
    </TanstackProvider>
  );
}
