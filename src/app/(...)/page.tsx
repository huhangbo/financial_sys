'use client';
import { redirect } from 'next/navigation';
import React from 'react';

const App: React.FC = () => {
  redirect('/login');
};

export default App;
