import {
  Container as PIXIContainer,
  DisplayObject,
  FederatedPointerEvent,
  Graphics,
  HTMLText,
  HTMLTextStyle,
} from 'pixi.js';
import { Application } from '../core';
import { Container } from '../gameobjects';
import * as PointUtils from '../utils/PointUtils';

export class Editor {
  _childStore: Set<{ child: any; data: any }> = new Set();
  _data: any = {};
  _children: DisplayObject[] = [];
  _storedStageData: any = {};
  _isDragging: boolean = false;
  _selectedChild: DisplayObject | null = null;
  _offset: { x: number; y: number } = { x: 0, y: 0 };
  _gfx: Graphics;
  _text: HTMLText;

  get app(): Application {
    return Application.instance;
  }

  constructor(public container: Container) {
    this.onContainerChildAdded = this.onContainerChildAdded.bind(this);
    this.onChildPointerDown = this.onChildPointerDown.bind(this);
    this.onChildPointerOver = this.onChildPointerOver.bind(this);
    this.onStagePointerMove = this.onStagePointerMove.bind(this);
    this.onStagePointerUp = this.onStagePointerUp.bind(this);

    this.init();
  }

  init() {
    this._gfx = this.app.stage.addChild(new Graphics());
    const style = new HTMLTextStyle({
      fontSize: 15,
      fontFamily: 'Arial',
      fill: 0x0,
      padding: 5,
    });
    style.addOverride('background-color: white');
    this._text = this.app.stage.addChild(
      new HTMLText('<strong style="color:red">x: </strong>0, <strong style="color:red">y: </strong>0', style),
    );
    this._text.anchor.set(1, 1);
    this.container.on('childAdded', this.onContainerChildAdded.bind(this));
    // recursively find all children in this.container and add them to an array
    this.findChildren(this.container);
    this._children.forEach((child: DisplayObject) => {
      this.addChildListeners(child);
    });
  }

  destroy() {
    while (this._children.length > 0) {
      const child = this._children.pop();
      this.remove(child);
    }
    this._gfx.parent.removeChild(this._gfx);
    this._text.parent.removeChild(this._text);
  }

  remove(child: any) {
    if (child) {
      child?.off('pointerdown', this.onChildPointerDown);
      child?.off('pointerover', this.onChildPointerOver);

      let childData: { child: any; data: any } | null = null;
      for (let i = 0; i < this._childStore.size; ++i) {
        const data = this._childStore.values().next().value;
        if (data.child === child) {
          childData = data;
          break;
        }
      }

      if (childData) {
        child.interactiveChildren = childData?.data?.interactiveChildren;
        child.eventMode = childData?.data?.eventMode;
        this._childStore.delete(childData);
      }
    }
  }

  addChildListeners(child: DisplayObject) {
    this._childStore.add({
      child,
      data: { x: child.x, y: child.y, interactiveChildren: child.interactiveChildren, eventMode: child.eventMode },
    });
    if (child?.children) {
      child.interactiveChildren = true;
    }
    child.eventMode = 'static';
    child.on('pointerdown', this.onChildPointerDown);
    child.on('pointerover', this.onChildPointerOver);
  }

  onContainerChildAdded(child: DisplayObject) {
    if (child instanceof Container) {
      if (child.editable) {
        this._children.push(child);
        this.addChildListeners(child);
        if (child.childrenEditable) {
          this.findChildren(child);
        }
      }
    } else {
      // if it's not a Container, check if it has any parents that are Containers,
      // and make sure they're all editable all the way up to the top
      let parent = child.parent as DisplayObject;
      let editable = true;
      while (parent) {
        if (parent instanceof Container && !parent.childrenEditable) {
          editable = false;
        }
        parent = parent?.parent;
      }
      if (editable) {
        this._children.push(child);
        this.addChildListeners(child);
      }
    }
  }

  onChildPointerOver(event: FederatedPointerEvent) {
    if (this._isDragging) {
      return;
    }
    event.target.cursor = 'grab';
    this.drawBounds(event.target as DisplayObject);
  }

  drawBounds(target: any) {
    this._gfx.clear();
    this._gfx.lineStyle(1, 0xff0000, 1, 1);
    const bounds = target.getBounds(false);
    const pos = target.parent.toGlobal(target.position);
    if (target?.anchor) {
      pos.x -= bounds.width * target.anchor.x;
      pos.y -= bounds.height * target.anchor.y;
    }
    this._gfx.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
    this._text.visible = true;
    this.setText({ x: target.x, y: target.y });
    this._text.position.set(bounds.x + bounds.width - 5, bounds.y + bounds.height - 5);
  }

  setText(data: { [prop: string]: number }) {
    let str = '';
    const keys = Object.keys(data);
    keys.forEach((key: string, idx: number) => {
      const isLast = idx === keys.length - 1;
      str += `<strong style="color:red">${key}: </strong>${Math.round(data[key])}${isLast ? '' : ', '}`;
    });
    this._text.text = str;
  }

  onChildPointerDown(event: FederatedPointerEvent) {
    this._isDragging = true;
    this._gfx.clear();
    this._selectedChild = event.target as DisplayObject;
    this.app.stage.cursor = 'grabbing';
    this._selectedChild.cursor = 'grabbing';

    this._storedStageData.hitArea = this.app.stage.hitArea;
    this._storedStageData.eventMode = this.app.stage.eventMode;

    this._offset = PointUtils.subtract(
      this._selectedChild.position,
      event!.getLocalPosition(this._selectedChild.parent),
    );

    this.app.stage.hitArea = this.app.screen;
    this.app.stage.eventMode = 'static';
    this.app.stage.on('pointermove', this.onStagePointerMove);
    this.app.stage.on('pointerup', this.onStagePointerUp);
    this.app.stage.on('pointerupoutside', this.onStagePointerUp);
  }

  onStagePointerMove(event: FederatedPointerEvent) {
    const pos = this._selectedChild!.parent.toLocal(event!.global);
    if (this._offset) {
      pos.x += this._offset.x;
      pos.y += this._offset.y;
    }
    this._selectedChild!.position.set(Math.round(pos.x), Math.round(pos.y));
    this.drawBounds(this._selectedChild!);
  }

  onStagePointerUp() {
    if (!this._selectedChild) {
      return;
    }
    const name = this.getName(this._selectedChild);
    this._data[name] = { x: this._selectedChild!.x, y: this._selectedChild!.y };

    this._selectedChild!.cursor = 'grab';

    this._isDragging = false;
    this._selectedChild = null;

    this.app.stage.off('pointermove', this.onStagePointerMove);
    this.app.stage.off('pointerup', this.onStagePointerUp);
    this.app.stage.off('pointerupoutside', this.onStagePointerUp);

    this.app.stage.hitArea = this._storedStageData.hitArea;
    this.app.stage.eventMode = this._storedStageData.eventMode;
    this._storedStageData = {};

    this.app.stage.cursor = 'default';

    this._gfx.clear();
    this._text.visible = false;

    this.outputJSON();
  }

  findChildren(container: PIXIContainer) {
    container.children.forEach((child: DisplayObject) => {
      if (child instanceof Container) {
        if (child.editable) {
          this._children.push(child);
        }
      } else {
        this._children.push(child);
      }
      if (child?.children) {
        if (child instanceof Container) {
          if (child.childrenEditable) {
            this.findChildren(child as PIXIContainer);
          }
        }
      }
    });
  }

  getName(object: any): string {
    if (object?.name) {
      return object.name;
    } else if (object?.constructor.name) {
      return object.constructor.name;
    } else {
      console.warn(`Editor:: getName() - object has no name or constructor name`, object);
    }
    return '';
  }

  outputJSON() {
    console.table(this._data);
  }
}
