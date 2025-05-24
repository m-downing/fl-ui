'use client';

import React, { useState } from 'react';
import { Card } from '@/app/components/design-system';

export default function FirstPassYieldDrilldown() {
  const [selectedTab, setSelectedTab] = useState<'timeliness' | 'firstPassYield' | 'throughput' | 'queueSize'>('timeliness');

  return (
    <Card className="p-4">
      <div className="border-b border-neutral-200 mb-4">
        <div className="flex space-x-4">
          {['timeliness', 'firstPassYield', 'throughput', 'queueSize'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium ${selectedTab === tab ? 'border-b-2 border-primary-600 text-primary-600' : 'border-transparent text-neutral-600 hover:text-neutral-900'}`}
              onClick={() => setSelectedTab(tab as 'timeliness' | 'firstPassYield' | 'throughput' | 'queueSize')}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p>Content for {selectedTab} analysis goes here.</p>
      </div>
    </Card>
  );
} 