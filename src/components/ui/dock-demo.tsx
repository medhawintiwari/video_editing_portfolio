import {
  Component,
  HomeIcon,
  Mail,
  Package,
} from 'lucide-react';

import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

const data = [
  {
    title: 'Home',
    icon: (
      <HomeIcon className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#',
  },
  {
    title: 'Products',
    icon: (
      <Package className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#work',
  },
  {
    title: 'Components',
    icon: (
      <Component className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#experience',
  },
  {
    title: 'Email',
    icon: (
      <Mail className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#contact',
  },
];

export function AppleStyleDock() {
  return (
    <div className='fixed bottom-8 left-1/2 z-50 max-w-full -translate-x-1/2'>
      <Dock className='items-end pb-3 bg-bg-secondary/50 backdrop-blur-xl border border-white/10 dark:bg-neutral-900/50 shadow-2xl'>
        {data.map((item, idx) => (
          <a key={idx} href={item.href} className="block">
            <DockItem
              className='aspect-square rounded-full bg-white/10 dark:bg-neutral-800'
            >
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>{item.icon}</DockIcon>
            </DockItem>
          </a>
        ))}
      </Dock>
    </div>
  );
}
