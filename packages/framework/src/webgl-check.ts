export function checkWebGL() {
  if (typeof document === 'undefined') {
    return;
  }

  const checkerCanvas = document.createElement('canvas');
  const gl = checkerCanvas.getContext('webgl') || checkerCanvas.getContext('experimental-webgl');

  if (!gl) {
    console.error('Your browser does not support WebGL.');
  }
}
