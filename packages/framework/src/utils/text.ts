import { CanvasTextMetrics, FederatedEvent, Point, Text } from 'pixi.js';

export function getNearestCharacterIndex(text: Text, e: FederatedEvent): number {
  const metrics = CanvasTextMetrics.measureText(text.text, text.style);
  const lines = metrics.lines;
  const lineHeight = metrics.lineHeight;
  const position = text.toLocal(new Point(e.pageX, e.pageY));

  let closestIndex = 0;
  let minDistance = Infinity;

  let currentIndex = 0;
  for (let i = 0; i < lines.length; i++) {
    const lineText = lines[i];
    for (let j = 0; j <= lineText.length; j++) {
      const subText = lineText.substring(0, j);
      const lineMetrics = CanvasTextMetrics.measureText(subText, text.style);
      const charX = lineMetrics.width;
      const charY = i * lineHeight;
      const distance = Math.hypot(charX - position.x, charY - position.y);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = currentIndex + j;
      }
    }
    currentIndex += lineText.length;
  }

  return closestIndex;
}
