// doesn't work yet
console.log('Prebuild script running...');
(async () => {
  const tsModule = await import('../src/modules/default/defaultModules.ts');
  console.log('tsModule:', tsModule);
})();

