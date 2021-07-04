import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type Props = {
  data: any[];
  width: string | number;
  height: string | number;
};
const BarChart: React.VFC<Props> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let canvas = canvasRef?.current;
    if (!canvas) return;

    let data = props.data;
    let context = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!context) throw new Error('The browser is not support 2d canvas');

    let margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = canvas.width - margin.left - margin.right,
      height = canvas.height - margin.top - margin.bottom;

    let x = d3.scaleBand().rangeRound([0, width]).padding(0.1);

    let y = d3.scaleLinear().rangeRound([height, 0]);

    context?.translate(margin.left, margin.top);

    x.domain(data.map((d) => d.letter));
    y.domain([0, d3.max(data, (d) => d.frequency)]);

    let yTickCount = 10,
      yTicks = y.ticks(yTickCount),
      yTickFormat = y.tickFormat(yTickCount, '%');

    context.beginPath();
    x.domain().forEach((d) => {
      context.moveTo((x(d) as number) + x.bandwidth() / 2, height);
      context.lineTo((x(d) as number) + x.bandwidth() / 2, height + 6);
    });
    context.strokeStyle = 'black';
    context.stroke();

    context.textAlign = 'center';
    context.textBaseline = 'top';
    x.domain().forEach((d) => {
      context.fillText(d, (x(d) as number) + x.bandwidth() / 2, height + 6);
    });

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

    context.save();
    context.rotate(-Math.PI / 2);
    context.textAlign = 'right';
    context.textBaseline = 'top';
    context.font = 'bold 10px sans-serif';
    context.fillText('Frequency', -10, 10);
    context.restore();

    context.fillStyle = 'steelblue';
    data.forEach((d) => {
      context.fillRect(
        x(d.letter) as number,
        y(d.frequency),
        x.bandwidth(),
        height - y(d.frequency)
      );
    });
  }, [canvasRef, props.data]);

  return <canvas width={props.width} height={props.height} ref={canvasRef} />;
};

export default BarChart;
