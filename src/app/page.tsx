'use client';

import React from 'react';
import DashboardView from './flow/dashboard/DashboardView';

export default function HomePage() {
  return (
    <div className="pt-14 px-6 max-w-[1600px] mx-auto">
      <DashboardView />
    </div>
  );
}