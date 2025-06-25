import type { V8Application } from './V8Application';

function populateSidebar(app: V8Application) {
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

export default async function main(app: V8Application) {
  populateSidebar(app);
}
