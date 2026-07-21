'use client';

import { useEffect } from 'react';
import { initializeVitalsMonitoring } from '@/lib/vitals';

export function VitalsInitializer() {
  useEffect(() => {
    initializeVitalsMonitoring();

    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        /* ignore SW register error in dev */
      });
    }
  }, []);

  return null;
}
