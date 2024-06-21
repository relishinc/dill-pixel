export function destroyCanvas(canvas: HTMLCanvasElement | OffscreenCanvas) {
  const gl = canvas.getContext('webgl');
  if (gl) {
    const extension = gl.getExtension('WEBGL_lose_context');
    if (extension) {
      extension.loseContext();
    }
  }
  // If you are using a 2D context, there's no direct resource release method,
  // but you should ensure all operations are complete before nullifying the canvas
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Perform any necessary cleanup tasks for 2D context
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  if (!(canvas instanceof OffscreenCanvas)) {
    if (canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
  }
  canvas.width = 0;
  canvas.height = 0;

  // @ts-expect-error canvas can't be null;
  canvas = null;
}
