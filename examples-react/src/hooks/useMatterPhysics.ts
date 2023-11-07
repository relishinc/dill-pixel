import { delay } from 'dill-pixel';
import { IEngineDefinition } from 'matter-js';
import React from 'react';

let matterModule: typeof import('matter-js');
let matterEngine: Matter.Engine;

let defaultEngineDefinition: Partial<IEngineDefinition> = {
  positionIterations: 6,
  velocityIterations: 4,
  gravity: { x: 0, y: 9.8 },
};

const loadMatter = async (engineDef: Partial<IEngineDefinition>) => {
  console.log('loadMatter', matterModule, matterEngine);
  if (matterModule === undefined) {
    matterModule = await import('matter-js');
    const joinedDef = { ...defaultEngineDefinition, ...engineDef };
    matterEngine = matterModule.Engine.create(joinedDef);
  }
  await delay(5);
  return { matterModule, matterEngine };
};

export const useMatterPhysics = (
  engineDefinition?: Partial<IEngineDefinition>,
): {
  engine: Matter.Engine;
  Matter: typeof import('matter-js');
} => {
  const [matter, setMatter] = React.useState<typeof import('matter-js')>();
  const [engine, setEngine] = React.useState<Matter.Engine>();

  React.useEffect(() => {
    loadMatter(engineDefinition || {}).then((res) => {
      setMatter(res.matterModule);
      setEngine(res.matterEngine);
    });
  }, [engineDefinition]);

  return { engine: engine!, Matter: matter! };
};
