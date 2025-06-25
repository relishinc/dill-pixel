import type { MyApplication } from './MyApplication';

export default async function main(app: MyApplication) {
  console.log('main.ts executed!');
  await app.doSomethingCustom();
}
