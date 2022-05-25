import React from 'react';
import '../container/Container.css';

export default function Container({ children }) {
  return <div className="container">{children}</div>;
}
