
import React, { EffectCallback, useEffect, useRef, DependencyList } from 'react'

export function useDidUpdate(fn: EffectCallback, dependencies?: DependencyList): void {
  const isDidMountedRef = useRef<boolean>(false);

  useEffect(() => () => {
    isDidMountedRef.current = false;
  })

  useEffect(() => {
    if (isDidMountedRef.current) {
      fn();
    } else {
      isDidMountedRef.current = true;
    }
  }, dependencies)
}

