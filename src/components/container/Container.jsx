import React from 'react';
import '../container/Container.scss';

export default function Container({ children }) {
  return (
    <div className="container">
      {children}
      <h1>Container</h1>
    </div>
  );
}
