import { Container } from '@pixi/react-animated';
import { IContainer } from 'dill-pixel/react';
import * as React from 'react';

interface FlexContainerProps extends React.ComponentProps<typeof Container> {
  width?: number;
  height?: number;
  gap?: number;
  flexDirection?: 'row' | 'column';
  flexWrap?: 'nowrap' | 'wrap';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  children: React.ReactNode;
}

export const FlexContainer: React.FC<FlexContainerProps> = (props) => {
  const {
    width = 0,
    height = 0,
    gap = 0,
    flexDirection = 'row',
    flexWrap = 'nowrap',
    alignItems = 'flex-start',
    justifyContent = 'flex-start',
    children,
  } = props;

  const childRefs = React.useRef<(IContainer | null)[]>([]);
  const [layoutProps, setLayoutProps] = React.useState<{ x: number; y: number }[]>([]);

  React.useEffect(() => {
    let x = 0;
    let y = 0;
    let rowHeight = 0;
    let columnWidth = 0;
    let nextRowY = 0; // y-coordinate of the next row
    let nextColumnX = 0; // x-coordinate of the next column
    const newLayoutProps: { x: number; y: number }[] = [];
    const items = childRefs.current.filter(Boolean);
    let lineItems: { index: number; width: number; height: number }[] = [];
    let lineStart = 0;

    const shouldWrap = (childRef: IContainer, x: number, y: number) => {
      if ((flexDirection === 'row' && flexWrap === 'nowrap') || (flexDirection === 'column' && flexWrap === 'nowrap')) {
        return false;
      }
      return (
        (flexDirection === 'row' && x + childRef.width + gap > width) ||
        (flexDirection === 'column' && y + childRef.height + gap > height)
      );
    };

    const handleWrap = () => {
      if (flexDirection === 'row') {
        nextRowY += rowHeight + gap;
      } else {
        nextColumnX += columnWidth + gap;
      }
      x = 0;
      y = 0;
      rowHeight = 0;
      columnWidth = 0;
    };

    const updateLayoutVariables = (childRef: IContainer) => {
      if (flexDirection === 'row') {
        x += childRef.width + gap;
        rowHeight = Math.max(rowHeight, childRef.height);
      } else {
        y += childRef.height + gap;
        columnWidth = Math.max(columnWidth, childRef.width);
      }
    };

    const getNextX = (currentX: number) => (flexDirection === 'row' ? currentX : nextColumnX);
    const getNextY = (currentY: number) => (flexDirection === 'column' ? currentY : nextRowY);

    const handleJustification = (
      lineItems: { index: number; width: number; height: number }[],
      lineStart: number,
      lineEnd: number,
      direction: 'row' | 'column',
    ) => {
      const extraSpace = (direction === 'row' ? width : height) - (lineEnd - lineStart);
      lineItems.forEach(({ index, width, height }, i) => {
        let offset = 0;
        switch (justifyContent) {
          case 'flex-start':
            break; // Do nothing
          case 'flex-end':
            offset = extraSpace;
            break;
          case 'center':
            offset = extraSpace / 2;
            break;
          case 'space-between':
            offset = i * (extraSpace / (lineItems.length - 1));
            break;
          case 'space-around':
            offset = (extraSpace / lineItems.length) * i + extraSpace / (2 * lineItems.length);
            break;
          case 'space-evenly':
            offset = (extraSpace / (lineItems.length + 1)) * (i + 1);
            break;
        }
        if (direction === 'row') {
          newLayoutProps[index].x += offset;
        } else {
          newLayoutProps[index].y += offset;
        }
      });
    };

    const handleAlignment = (newLayoutProps: { x: number; y: number }[], items: (IContainer | null)[]) => {
      newLayoutProps.forEach((props, index) => {
        const childRef = items[index];
        if (!childRef) return;

        if (flexDirection === 'row') {
          switch (alignItems) {
            case 'flex-start':
              break;
            case 'flex-end':
              props.y += rowHeight - childRef.height;
              break;
            case 'center':
              props.y += (rowHeight - childRef.height) / 2;
              break;
            case 'stretch':
              childRef.height = rowHeight;
              break;
            // Handle 'baseline' as needed
          }
        } else {
          switch (alignItems) {
            case 'flex-start':
              break;
            case 'flex-end':
              props.x += columnWidth - childRef.width;
              break;
            case 'center':
              props.x += (columnWidth - childRef.width) / 2;
              break;
            case 'stretch':
              childRef.width = columnWidth;
              break;
            // Handle 'baseline' as needed
          }
        }
      });
    };

    items.forEach((childRef, index) => {
      if (!childRef) return;

      // Check for wrapping
      if (flexWrap === 'wrap' && shouldWrap(childRef, x, y)) {
        handleJustification(lineItems, lineStart, flexDirection === 'column' ? y - gap : x - gap, flexDirection);
        handleWrap();
        lineItems = [];
        lineStart = x;
      }

      lineItems.push({ index, width: childRef.width, height: childRef.height });

      // Position child
      newLayoutProps[index] = { x: getNextX(x), y: getNextY(y) };

      // Update layout variables
      updateLayoutVariables(childRef);
    });

    // Justify the last line
    handleJustification(lineItems, lineStart, flexDirection === 'column' ? y - gap : x - gap, flexDirection);
    handleAlignment(newLayoutProps, items);
    setLayoutProps(newLayoutProps);
  }, [children, flexDirection, flexWrap, alignItems, justifyContent, width, height, gap]);

  return (
    <Container x={props.x ?? 0} y={props.y ?? 0}>
      {React.Children.map(children, (child, index) => {
        const { x, y } = layoutProps[index] || { x: 0, y: 0 };
        return React.cloneElement(child as React.ReactElement, {
          x,
          y,
          ref: (ref: IContainer) => {
            childRefs.current[index] = ref;
          },
        });
      })}
    </Container>
  );
};

export default FlexContainer;
