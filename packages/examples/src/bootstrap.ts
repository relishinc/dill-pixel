import { create } from 'dill-pixel';
import 'dill-pixel-globals';
import { V8Application } from './V8Application';
import { config } from './dill-pixel.config';

async function bootstrap() {
  const app = await create<V8Application>(config, V8Application);

  /*
  // test data adapter
  app.data.clear();
  let data = app.data.get();
  console.log('data 1', JSON.stringify(data, null, 2));
  app.data.set('foo', 'anthony');
  let foo = app.data.get('foo');

  console.log('foo', JSON.stringify(foo, null, 2));
  app.data.set({ foo: 'baz', saved: 'adsf;kjdfgj' });

  data = app.data.get();
  foo = app.data.get('foo');

  console.log('foo 2', JSON.stringify(foo, null, 2));
  console.log('data 2', JSON.stringify(data, null, 2));

  app.data.clear('foo');

  foo = app.data.get('foo');
  console.log('foo 3', JSON.stringify(foo, null, 2));

  app.data.set({ foo: 'bar', list2: [1, 2] });
  app.data.concat('list', ['hello', 'world', 'foo', 'bar', 'baz']);
  app.data.concat('list2', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  app.data.concat('list3', [{ bar: 'bar', baz: 5 }]);
  app.data.increment('bar', 10);
  app.data.append('saved', 'adsf;kjdfgj', ' ');
  app.data.append('saved', 'more', '-');
  */

  function populateSidebar() {
    // populate sidebar
    const sidebar = document.getElementById('sidebar');
    let nav = sidebar?.querySelector('nav');

    app.signal.onSceneChangeComplete.connect(() => {
      nav?.classList.remove('disabled');
    });
    const defaultScene = app.scenes.defaultScene;
    if (!nav) {
      while (!nav) {
        nav = sidebar?.querySelector('nav');
      }
    }
    // add examples to sidebar nav
    // get list groups
    app.scenes.debugGroupsList.forEach((group: HTMLOptGroupElement) => {
      const ul = document.createElement('ul');
      ul.id = group.label;
      const li: HTMLLIElement = document.createElement('li');
      const h3: HTMLHeadingElement = document.createElement('h3');
      h3.innerHTML = group.label;
      ul.appendChild(li);
      li.appendChild(h3);

      Array.from(group.children as any).forEach((child: any) => {
        const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
        a.innerHTML = child.innerHTML;
        a.href = `#${child.value}`;
        li.appendChild(a);
      });

      nav.appendChild(ul);
    });

    // update active nav item
    const setActiveNavItem = (state: string | undefined) => {
      const active = nav?.querySelector('.active');
      if (active) {
        active.classList.remove('active');
      }

      const a = nav?.querySelector(`a[href="#${state}"]`);
      if (a) {
        a.classList.add('active');
      }
    };

    // check hash for active example and update nav
    const checkHash = () => {
      const scene = app.scenes.getSceneFromHash();
      setActiveNavItem(scene ?? defaultScene);
    };

    window.addEventListener('hashchange', checkHash);
    checkHash();
  }
  populateSidebar();
}

void bootstrap();
