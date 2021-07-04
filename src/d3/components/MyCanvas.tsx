import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import { useD3 } from '../hooks';
import { mapSubRegionToName } from '../../helpers/mappings';
import { Data } from '../../interface';

type Props = {
  data: Data[];
  width: string | number;
  height: string | number;
};
const PriceAndArea: React.VFC<Props> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let canvas = canvasRef?.current;
    if (!canvas) return;

    let data = props.data;
    let context = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!context) throw new Error('The browser is not support 2d canvas');

    let margin = { top: 20, right: 20, bottom: 60, left: 160 },
      width = canvas.width - margin.left - margin.right,
      height = canvas.height - margin.top - margin.bottom;

    let x = d3.scaleBand().rangeRound([0, width]).padding(0.2);

    let y = d3.scaleLinear().rangeRound([height, 0]);

    context.translate(margin.left, margin.top);

    x.domain(data.map((d) => d.sub_region.toString()));
    y.domain([0, d3.max(data, (d) => d.monthly_price) as any]);
    // y.domain([0, d3.max(data, (d) => d.monthly_price)]);

    // var formatxAxis = d3.format(',.0f');

    const xBarWidth = (2 * x.bandwidth()) / 3;

    let yTickCount = 10,
      yTicks = y.ticks(yTickCount),
      yTickFormat = y.tickFormat(yTickCount);
    // yTickFormat = y.tickFormat(formatxAxis as any);
    // yTickFormat = y.tickFormat(yTickCount, "%");

    context.beginPath();
    x.domain().forEach((d) => {
      context.moveTo((x(d) as number) + xBarWidth / 2, height);
      context.lineTo((x(d) as number) + xBarWidth / 2, height + 6);
    });
    context.strokeStyle = 'black';
    context.stroke();

    // context.save();
    // context.rotate(-Math.PI / 2);
    context.textAlign = 'center';
    context.textBaseline = 'top';
    context.font = '12px sans-serif';
    x.domain().forEach((d, i) => {
      // const _d = d as unknown as keyof typeof mapNumberToRegion;

      // @ts-ignore
      const text = mapSubRegionToName[d];
      const basicHeight = height + 10;
      [...text].forEach((t, tIndex) => {
        context.fillText(
          t,
          (x(d) as number) + xBarWidth / 2,
          basicHeight + tIndex * 16
        );
      });
      // context.fillText(
      //   text,
      //   // mapNumberToRegion[d],
      //   (x(d) as number) + xBarWidth / 2,
      //   height + 6
      // );
    });
    // context.restore();

    context.beginPath();

    yTicks.forEach((d) => {
      context.moveTo(0, y(d) + 0.5);
      context.lineTo(-6, y(d) + 0.5);
    });
    context.strokeStyle = 'black';
    context.stroke();

    context.textAlign = 'right';
    context.textBaseline = 'middle';
    yTicks.forEach((d) => {
      context.fillText(yTickFormat(d), -9, y(d));
    });

    context.beginPath();
    context.moveTo(-6.5, 0 + 0.5);
    context.lineTo(0.5, 0 + 0.5);
    context.lineTo(0.5, height + 0.5);
    context.lineTo(-6.5, height + 0.5);
    context.strokeStyle = 'black';
    context.stroke();

    // context.save();
    // context.rotate(-Math.PI / 2);
    // context.textAlign = 'right';
    // context.textBaseline = 'top';
    // context.font = 'bold 10px sans-serif';
    // context.fillText('Price', -10, 10);
    // context.restore();

    context.fillStyle = 'steelblue';
    data.forEach((d) => {
      context.fillRect(
        x(d.sub_region.toString()) as number,
        y(d.monthly_price),
        xBarWidth,
        height - y(d.monthly_price)
      );
    });
  }, [canvasRef, props.data]);

  return <canvas width={props.width} height={props.height} ref={canvasRef} />;
};

export default PriceAndArea;
