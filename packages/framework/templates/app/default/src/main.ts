// delete this file if you don't need it
// otherwise, the runtime will boostrap your app with your dill-pixel.config.ts
// and pass it to "main" below

import { __APPLICATION_NAME__ } from '@/__APPLICATION_NAME__';

export default async function main(app: __APPLICATION_NAME__) {
  console.log(app);
}
