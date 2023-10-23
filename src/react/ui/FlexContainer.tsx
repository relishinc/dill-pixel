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

  React.useLayoutEffect(() => {
    let x = 0;
    let y = 0;
    let rowHeight = 0;
    let columnWidth = 0;
    let totalWidth = 0;
    let totalHeight = 0;
    let nextRowY = 0; // y-coordinate of the next row
    let nextColumnX = 0; // x-coordinate of the next column
    const newLayoutProps: { x: number; y: number }[] = [];
    const items = childRefs.current.filter(Boolean);
    items.forEach((childRef, index) => {
      const isLast = index === items.length - 1;
      if (childRef) {
        // Check for wrapping
        if (
          flexWrap === 'wrap' &&
          ((flexDirection === 'row' && x + childRef.width + gap > width) ||
            (flexDirection === 'column' && y + childRef.height + gap > height))
        ) {
          if (flexDirection === 'row') {
            nextRowY += rowHeight + gap; // Update y-coordinate for the next row
          } else {
            nextColumnX += columnWidth + gap; // Update x-coordinate for the next column
          }
          totalWidth = Math.max(totalWidth, x);
          totalHeight = Math.max(totalHeight, y);
          x = 0;
          y = 0;
          rowHeight = 0;
          columnWidth = 0;
        }

        // Position child
        newLayoutProps[index] = {
          x: flexDirection === 'row' ? x : nextColumnX,
          y: flexDirection === 'column' ? y : nextRowY,
        };

        // Update layout variables
        if (flexDirection === 'row') {
          x += childRef.width + gap; // Include gap after child
          rowHeight = Math.max(rowHeight, childRef.height);
        } else {
          y += childRef.height + gap; // Include gap after child
          columnWidth = Math.max(columnWidth, childRef.width);
        }
      }
    });
    if (alignItems && flexDirection === 'row') {
      newLayoutProps.forEach((props, index) => {
        const childRef = items[index];
        if (childRef) {
          switch (alignItems) {
            case 'flex-start':
              // No extra alignment needed
              break;
            case 'flex-end':
              props.y += rowHeight - childRef.height;
              break;
            case 'center':
              props.y += (rowHeight - childRef.height) / 2;
              break;
            case 'baseline':
              // Assume baseline is at the bottom of each child for simplicity
              props.y += rowHeight - childRef.height;
              break;
            case 'stretch':
              childRef.height = rowHeight;
              break;
          }
        }
      });
    } else if (alignItems && flexDirection === 'column') {
      newLayoutProps.forEach((props, index) => {
        const childRef = items[index];
        if (childRef) {
          switch (alignItems) {
            case 'flex-start':
              // No extra alignment needed
              break;
            case 'flex-end':
              props.x += columnWidth - childRef.width;
              break;
            case 'center':
              props.x += (columnWidth - childRef.width) / 2;
              break;
            case 'baseline':
              // Assume baseline is at the left side of each child for simplicity
              break;
            case 'stretch':
              childRef.width = columnWidth;
              break;
          }
        }
      });
    }
    // Handle justifyContent
    if (justifyContent) {
      const extraSpace = flexDirection === 'row' ? width - totalWidth : height - totalHeight;
      const numGaps = items.length - 1;

      newLayoutProps.forEach((props, index) => {
        if (flexDirection === 'row') {
          switch (justifyContent) {
            case 'flex-start':
              // No extra spacing needed
              break;
            case 'flex-end':
              props.x += extraSpace;
              break;
            case 'center':
              props.x += extraSpace / 2;
              break;
            case 'space-between':
              props.x += (extraSpace / numGaps) * index;
              break;
            case 'space-around':
              props.x += (extraSpace / numGaps) * index + extraSpace / (2 * numGaps);
              break;
            case 'space-evenly':
              props.x += (extraSpace / (numGaps + 1)) * (index + 1);
              break;
          }
        } else {
          // flexDirection === 'column'
          switch (justifyContent) {
            case 'flex-start':
              // No extra spacing needed
              break;
            case 'flex-end':
              props.y += extraSpace;
              break;
            case 'center':
              props.y += extraSpace / 2;
              break;
            case 'space-between':
              props.y += (extraSpace / numGaps) * index;
              break;
            case 'space-around':
              props.y += (extraSpace / numGaps) * index + extraSpace / (2 * numGaps);
              break;
            case 'space-evenly':
              props.y += (extraSpace / (numGaps + 1)) * (index + 1);
              break;
          }
        }
      });
    }
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
