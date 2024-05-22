import { version } from './version';

export function sayHello() {
  let hello: string = `%cDill Pixel Game Framework v${version}`;
  hello += ' - %chttps://dillpixel.io';
  console.log(hello, 'color: #74b64c', 'color: #74b64c; font-weight: bold');
}
