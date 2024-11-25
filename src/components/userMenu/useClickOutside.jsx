import { useEffect, useRef } from 'react';

export const useClickOutside = setIsShow => {
  const domNode = useRef(null);

  useEffect(() => {
    if (!domNode.current) {
      return;
    }

    const handleClickOutside = ({ target }) => {
      if (domNode.current && !domNode.current.contains(target)) {
        setIsShow();
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  });

  return domNode;
};
