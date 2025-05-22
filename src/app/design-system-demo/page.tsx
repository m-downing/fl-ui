'use client';

import React, { useState } from 'react';
import { ShowcaseMenu } from '@/app/components/design-system-showcase/ShowcaseMenu';
import { ColorTokensShowcase } from '@/app/components/design-system-showcase/ColorTokensShowcase';
import { ButtonShowcase } from '@/app/components/design-system-showcase/ButtonShowcase';
import { ChartShowcase } from '@/app/components/design-system-showcase/ChartShowcase';
import { TableShowcase } from '@/app/components/design-system-showcase/TableShowcase';
import { BadgeShowcase } from '@/app/components/design-system-showcase/BadgeShowcase';
import { ModalShowcase } from '@/app/components/design-system-showcase/ModalShowcase';
import { TooltipShowcase } from '@/app/components/design-system-showcase/TooltipShowcase';
import { InputSelectShowcase } from '@/app/components/design-system-showcase/InputSelectShowcase';
import { TypographyShowcase } from '@/app/components/design-system-showcase/TypographyShowcase';
import { ShadowShowcase } from '@/app/components/design-system-showcase/ShadowShowcase';

type ShowcaseItem =
  | 'colors'
  | 'buttons'
  | 'charts'
  | 'tables'
  | 'badges'
  | 'modals'
  | 'tooltips'
  | 'inputs'
  | 'typography'
  | 'shadows';

export default function DesignSystemDemo() {
  const [active, setActive] = useState<ShowcaseItem | undefined>('colors'); // Default to colors

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-neutral-800">UI Component Showcase</h1>
        <ShowcaseMenu active={active} onSelect={setActive} />
      </div>
      <div className="mt-8 p-6 max-w-7xl mx-auto">
        {active === 'colors' && <ColorTokensShowcase />}
        {active === 'buttons' && <ButtonShowcase />}
        {active === 'charts' && <ChartShowcase />}
        {active === 'tables' && <TableShowcase />}
        {active === 'badges' && <BadgeShowcase />}
        {active === 'modals' && <ModalShowcase />}
        {active === 'tooltips' && <TooltipShowcase />}
        {active === 'inputs' && <InputSelectShowcase />}
        {active === 'typography' && <TypographyShowcase />}
        {active === 'shadows' && <ShadowShowcase />}
        {!active && (
          <div className="text-center text-neutral-500 py-10">
            <p className="text-xl">Select a component from the menu to see its showcase.</p>
          </div>
        )}
      </div>
    </div>
  );
} 