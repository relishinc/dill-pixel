import { _ReactPixi, Container } from '@pixi/react';
import { IContainer } from 'dill-pixel/react';
import React from 'react';
import PointLike = _ReactPixi.PointLike;

interface ListProps extends React.ComponentProps<typeof Container> {
  type?: 'horizontal' | 'vertical';
  elementsMargin?: number;
  vertPadding?: number;
  horPadding?: number;
  anchor?: PointLike;
}

function toPointLike(ptToConvert: PointLike) {
  if (Array.isArray(ptToConvert)) {
    return { x: ptToConvert[0], y: ptToConvert[1] ?? 0 };
  } else if (typeof ptToConvert === 'number') {
    return { x: ptToConvert, y: ptToConvert };
  } else {
    return ptToConvert;
  }
}

export const useContainerAnchor = (
  anchor: PointLike,
  dimensions: {
    width: number;
    height: number;
  },
  vertPadding?: number,
  horPadding?: number,
  ...deps: any[]
) => {
  return React.useMemo(() => {
    if (!anchor || !dimensions || dimensions?.width === 0 || dimensions?.height === 0) {
      return { x: 0, y: 0 };
    }
    const pivot = toPointLike(anchor ?? 0);
    pivot.x *= dimensions.width;
    pivot.y *= dimensions.height;
    return pivot;
  }, [anchor, dimensions, vertPadding, horPadding, ...deps]);
};

export const List: React.FC<ListProps> = ({
  children,
  type,
  elementsMargin,
  vertPadding,
  horPadding,
  anchor,
  ...props
}) => {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  const [accumulatedWidths, setAccumulatedWidths] = React.useState<number[]>([]);
  const [accumulatedHeights, setAccumulatedHeights] = React.useState<number[]>([]);
  const [totalWidth, setTotalWidth] = React.useState(0);
  const [totalHeight, setTotalHeight] = React.useState(0);

  const containerRef = React.useRef<IContainer | null>(null);
  const childRefs = React.useRef<(IContainer | null)[]>([]);

  React.useEffect(() => {
    const newAccumulatedWidths: number[] = [];
    const newAccumulatedHeights: number[] = [];
    let currentWidth = 0;
    let currentHeight = 0;

    childRefs.current.forEach((child, index) => {
      const isLast = index === childRefs.current.length - 1;
      if (child) {
        newAccumulatedWidths[index] = currentWidth;
        newAccumulatedHeights[index] = currentHeight;
        currentWidth += child.width + (isLast ? 0 : elementsMargin ?? 0);
        currentHeight += child.height + (isLast ? 0 : elementsMargin ?? 0);
      }
    });
    setAccumulatedWidths(newAccumulatedWidths);
    setAccumulatedHeights(newAccumulatedHeights);
    setTotalWidth(currentWidth);
    setTotalHeight(currentHeight);
  }, [children, elementsMargin, vertPadding, horPadding]);

  React.useEffect(() => {
    setTimeout(() => {
      if (containerRef.current) {
        setDimensions({
          width: (containerRef.current.width ?? 0) + (horPadding ?? 0) * 2,
          height: (containerRef.current.height ?? 0) + (vertPadding ?? 0) * 2,
        });
      }
    }, 0);
  }, [children, totalWidth, totalHeight]);

  const pivot = useContainerAnchor(anchor ?? { x: 0, y: 0 }, dimensions, vertPadding, horPadding, children);

  return (
    <Container {...props} pivot={pivot}>
      <Container ref={containerRef} x={horPadding} y={vertPadding}>
        {React.Children.map(children, (child, index) => {
          const xPosition = accumulatedWidths[index] || 0;
          const yPosition = accumulatedHeights[index] || 0;

          return React.cloneElement(child as React.ReactElement, {
            x: type === 'horizontal' ? xPosition : 0,
            y: type === 'vertical' ? yPosition : 0,
            ref: (ref: IContainer) => {
              childRefs.current[index] = ref;
            },
          });
        })}
      </Container>
    </Container>
  );
};
