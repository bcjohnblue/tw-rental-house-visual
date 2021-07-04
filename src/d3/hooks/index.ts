import React from 'react';
import * as d3 from 'd3';
import type { BaseType, Selection } from 'd3';

interface RenderChartFn {
  (canvas: HTMLElement): void;
}

interface UseD3 {
  (
    renderChartFn: any,
    dependencies: any[]
  ): React.RefObject<HTMLCanvasElement>;
}

export const useD3: UseD3 = (renderChartFn, dependencies) => {
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    renderChartFn(d3.select(ref.current));
    return () => {};
  }, dependencies);

  return ref;
};
