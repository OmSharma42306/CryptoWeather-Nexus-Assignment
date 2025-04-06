'use client'; // 👈 Necessary to make this a Client Component

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store'; // adjust the path as needed

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
