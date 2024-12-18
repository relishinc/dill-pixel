import { create } from 'dill-pixel';
import { V8Application } from './V8Application';
import { config } from './dill-pixel.config';

async function bootstrap() {
  const app = await create<V8Application>(config, V8Application);

  function populateSidebar() {
    // populate sidebar
    const sidebar = document.getElementById('sidebar');
    const nav = sidebar?.querySelector('nav');
    const scenes = app.scenes.ids.filter((scene: string) => scene !== 'Interstitial');
    const defaultScene = app.scenes.defaultScene;

    if (nav) {
      // add examples to sidebar nav
      // get list groups
      const groups: Set<string> = new Set();
      const groupLists: Map<string, HTMLUListElement> = new Map();
      scenes.forEach((scene) => {
        const item = app.scenes.list.find((s) => s.id === scene);
        const group = item?.debugGroup;
        if (group) {
          groups.add(group);
        }
      });
      if (groups.has('Other')) {
        // move 'Other'x to the end of the set
        groups.delete('Other');
        groups.add('Other');
      }
      Array.from(groups).forEach((groupName) => {
        const ul = document.createElement('ul');
        ul.id = groupName;
        groupLists.set(groupName, ul);
        const li: HTMLLIElement = document.createElement('li');
        const h3: HTMLHeadingElement = document.createElement('h3');
        h3.innerHTML = groupName;
        ul.appendChild(li);
        li.appendChild(h3);
        nav.appendChild(ul);
      });
      scenes.forEach((scene: string) => {
        const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
        const item = app.scenes.list.find((s) => s.id === scene);
        if (!item) {
          return;
        }
        a.innerHTML = item.debugLabel || item.id;
        a.href = `#${scene}`;
        if (item.debugGroup && groupLists.has(item.debugGroup)) {
          const li: HTMLLIElement = document.createElement('li');
          li.appendChild(a);
          groupLists.get(item.debugGroup)?.appendChild(li);
        } else {
          nav.appendChild(a);
        }
        a.addEventListener('click', () => {
          if (a.classList.contains('active')) {
            return;
          }
          nav.classList.add('disabled');
        });
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

      // disable nav initially
      nav.classList.add('disabled');

      app.signal.onSceneChangeComplete.connect(() => {
        nav?.classList.remove('disabled');
      });
      checkHash();
    }
  }
  populateSidebar();
}

void bootstrap();
