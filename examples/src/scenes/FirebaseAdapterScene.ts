import { ActionDetail, Button, FlexContainer } from 'dill-pixel';
import { BaseScene } from './BaseScene';
import { Input } from '@pixi/ui';
import { Graphics, Text } from 'pixi.js';
import { SimpleButton } from '@/popups/ExamplePopup';
import { gsap } from 'gsap';
import { collection, DocumentData, limit, onSnapshot, orderBy, QuerySnapshot, where } from 'firebase/firestore';

type Score = {
  id: string;
  username: string;
  score: number;
};

export class FirebaseAdapterScene extends BaseScene {
  protected readonly title = 'Firebase Storage Adapter';
  protected readonly subtitle = 'Demonstrates custom adapter functionality';

  protected buttonContainer: FlexContainer;
  protected buttons: Button[] = [];

  protected inputContainer: FlexContainer;
  protected usernameInput: Input;
  protected scoreInput: Input;
  protected errorText: Text;

  protected scoreboardHeading: Text;
  protected scoreboardMessage: Text;
  protected scoreboard: FlexContainer;

  protected scores: Score[] = [];

  constructor() {
    super();
  }

  public async initialize() {
    await super.initialize();

    // add a container for some buttons
    this.buttonContainer = this.add.flexContainer({
      gap: 10,
      justifyContent: 'center',
      alignItems: 'center',
    });
    this.buttonContainer.y -= 80;

    // add a focus layer
    this.app.focus.addFocusLayer(this.id);

    // add a save button
    const saveButton = this.createButton('Save', 'green', () => {
      const username = this.usernameInput.value;
      const scoreAsNum = parseInt(this.scoreInput.value, 10);

      this.app.sendAction('save_to_firebase', {
        collection: 'users',
        data: { username, score: scoreAsNum },
      });
    });
    this.buttonContainer.addChild(saveButton);

    // add a load button
    const loadButton = this.createButton('Reload', 'blue', () => {
      this.app.sendAction('load_from_firebase');
    });
    this.buttonContainer.addChild(loadButton);

    // add a clear button
    const clearButton = this.createButton('Clear', 'red', () => {
      this.app.sendAction('clear_firebase', {
        collection: 'users',
      });
    });
    this.buttonContainer.addChild(clearButton);

    this.app.actions('save_to_firebase').connect(this._handleSave);
    this.app.actions('load_from_firebase').connect(this._handleLoad);
    this.app.actions('clear_firebase').connect(this._handleClear);
    this.app.actions('delete_from_firebase').connect(this._handleDelete);

    // create inputs
    this.createInputs();

    // create scoreboard
    this.createScoreboard();

    // add error text
    this.errorText = this.add.text({
      text: '',
      style: { fill: 0xff0000, fontSize: 18, align: 'center' },
    });

    this.errorText.anchor = 0.5;
    this.errorText.y = this.inputContainer.y + 130;

    // listen for changes to the users collection
    const colRef = collection(this.app.firebase.db, 'users');

    // runs immediately
    onSnapshot(colRef, (snapshot: QuerySnapshot<DocumentData>) => {
      snapshot.docChanges().forEach((change) => {
        console.log(`Change type: ${change.type}`);
        console.log(`Change details: ${JSON.stringify(change.doc.data())}`);
      });

      snapshot.docChanges().length && this.refreshScoreboard();
    });
  }

  private async _handleSave(action: ActionDetail) {
    this.errorText.text = '';

    try {
      // await this.app.store.save('firebase', action.data.collection, action.data.data);
      await this.app.firebase.save(action.data.collection, action.data.data);
      this.usernameInput.value = '';
      this.scoreInput.value = '';
    } catch (error: any) {
      console.error('Error saving data:', error);
      this.errorText.text = error.message || 'An error occurred';
    }
  }

  private _handleLoad() {
    this.refreshScoreboard();
  }

  private async _handleClear(action: ActionDetail) {
    this.errorText.text = '';
    try {
      await this.app.firebase.deleteCollection(action.data.collection);
      // this.refreshScoreboard();
    } catch (error: any) {
      console.error('Error clearing data:', error);
      this.errorText.text = error.message || 'An error occurred';
    }
  }

  private async _handleDelete(action: ActionDetail) {
    this.errorText.text = '';

    try {
      await this.removeScoreFromScoreboard(action.data.data);
      await this.app.firebase.deleteDocumentById('users', action.data.data.id);
    } catch (error: any) {
      console.error('Error deleting data:', error);
      this.errorText.text = error.message || 'An error occurred';
    }
  }

  private createButton(label: string, color: string, callback: () => void) {
    const btn = this.make.button({
      scale: 0.4,
      cursor: 'pointer',
      textures: { default: `btn/${color}`, hover: 'btn/yellow', disabled: 'btn/grey', active: 'btn/red' },
      sheet: 'ui.json',
      accessibleTitle: label,
      accessibleHint: `Press me to play a sound`,
    });

    btn.add.text({
      text: label,
      anchor: 0.5,
      style: { fill: 0xffffff, fontWeight: 'bold', fontSize: 48, align: 'center' },
    });

    this.addSignalConnection(btn.onClick.connect(callback));

    this.buttons.push(btn);

    btn.label = label;
    this.app.focus.add(btn, this.id, false);
    return btn;
  }

  private createInputs() {
    // add a container for some inputs
    this.inputContainer = this.add.flexContainer({
      gap: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    });

    this.inputContainer.y = this.buttonContainer.y - 160;

    // add inputs
    this.usernameInput = this.createInput('Username');
    this.scoreInput = this.createInput('Score');

    this.inputContainer.addChild(this.usernameInput);
    this.inputContainer.addChild(this.scoreInput);
  }

  private createInput(placeholder: string) {
    return new Input({
      bg: new Graphics()
        .roundRect(0, 0, 320, 70, 11 + 5)
        .fill('#DCB000')
        .roundRect(5, 5, 320 - 5 * 2, 70 - 5 * 2, 11)
        .fill('#FFFFFF'),
      textStyle: {
        fill: '#728779',
        fontSize: 22,
        fontWeight: 'bold',
      },
      align: 'center',
      placeholder,
    });
  }

  private createScoreboard() {
    this.scoreboard = this.add.flexContainer({
      gap: 10,
      alignItems: 'flex-start',
      flexDirection: 'column',
    });

    // scoreboard heading
    this.scoreboardHeading = this.add.text({
      text: 'Scoreboard',
      style: { fill: 0xffffff, fontSize: 42, align: 'center', fontWeight: 'bold' },
    });

    this.scoreboardHeading.anchor = 0.5;

    // scoreboard message
    this.scoreboardMessage = this.add.text({
      text: '',
      style: { fill: 0xffffff, fontSize: 18, align: 'center' },
    });
    this.scoreboardMessage.anchor = 0.5;

    this.positionScoreboard();
  }

  private positionScoreboard() {
    this.scoreboard.y = this.buttonContainer.y + 180;
    this.scoreboardHeading.y = this.scoreboard.y - 70;
    this.scoreboardMessage.y = this.scoreboardHeading.y + 40;

    // better way to do this?
    this.scoreboard.pivot.x = 120;
  }

  private removeScoreFromScoreboard(score: Score): Promise<void> {
    return new Promise((resolve) => {
      // delete the score
      const scoreToDelete = this.scores.find((s) => {
        return s.id === score.id;
      });

      if (!scoreToDelete) {
        this.errorText.text = 'Score not found';
        resolve();
        return;
      }

      const index = this.scores.indexOf(scoreToDelete);
      this.scores.splice(index, 1);

      const scoreElement = this.scoreboard.getChildAt(index);
      gsap.to(scoreElement, {
        alpha: 0,
        x: -10,
        duration: 0.3,
        onComplete: () => {
          // this.scoreboard.removeChildAt(index);
          resolve();
        },
      });
    });
  }

  private async clearScoreboard(): Promise<void> {
    return new Promise((resolve) => {
      // clear the scoreboard
      if (!this.scoreboard.children.length) {
        this.scores = [];
        resolve();
        return;
      }

      const reversedChildren = [...this.scoreboard.children].reverse(); // makes for a nicer animation
      reversedChildren.forEach((child, idx) => {
        gsap.to(child, {
          alpha: 0,
          x: '-=10',
          duration: 0.3,
          delay: idx * 0.1,
          onComplete: () => {
            // resolve when the last child is removed
            if (idx === reversedChildren.length - 1) {
              this.scoreboard.removeChildren();
              // clear scores
              this.scores = [];
              resolve();
            }
          },
        });
      });
    });
  }

  private createScoreUI(score: Score) {
    const scoreContainer = this.scoreboard.add.flexContainer({
      alignItems: 'center',
      gap: 4,
    });

    scoreContainer.alpha = 0;

    const scoreUI = this.make.container();

    const bg = new Graphics()
      .roundRect(0, 0, 200, 45, 25 + 5)
      .fill('#FFFFFF')
      .roundRect(5, 5, 200 - 5 * 2, 45 - 5 * 2, 25)
      .fill('#DCB000');

    const text = this.make.text({
      text: `${score.username}: ${score.score}`,
      style: { fill: 0xffffff, fontSize: 18, align: 'center', fontWeight: 'bold' },
    });
    text.anchor = 0.5;
    text.x = bg.width / 2;
    text.y = bg.height / 2;

    scoreUI.addChild(bg);
    scoreUI.addChild(text);
    scoreContainer.addChild(scoreUI);

    const deleteButton = this.make.container();

    const deleteButtonBg = new SimpleButton();
    deleteButtonBg.accessibleTitle = 'Delete';
    deleteButtonBg.accessibleHint = 'Press to delete this score';
    deleteButtonBg.onInteraction('click').connect(async () => {
      // 1. via the adapter:
      await this.removeScoreFromScoreboard(score);

      // using field value
      await this.app.firebase.deleteDocumentWhere('users', 'username', score.username);

      // using ID
      // await this.app.firebase.deleteDocumentById('users', 'id-here');

      // 2. via the action:
      // this.app.sendAction('delete_from_firebase', {
      //   collection: 'users',
      //   data: score,
      // });
    });
    deleteButton.scale = 0.7;

    const deleteButtonText = this.make.text({
      text: '✖',
      style: { fill: 0xffffff, align: 'center' },
    });
    deleteButtonText.anchor = 0.5;
    deleteButtonText.x = deleteButtonBg.width / 2;
    deleteButtonText.y = deleteButtonBg.height / 2;
    deleteButtonText.eventMode = 'none';

    deleteButton.addChild(deleteButtonBg);
    deleteButton.addChild(deleteButtonText);
    scoreContainer.addChild(deleteButton);

    return scoreContainer;
  }

  private async refreshScoreboard() {
    console.log('Refreshing scoreboard...');
    this.errorText.text = '';
    let data;

    // add scores
    try {
      //* Option 1:
      // data = await this.app.firebase.getCollection('users');

      //* Option 2:
      data = await this.app.firebase.queryCollection(
        'users',
        orderBy('score', 'desc'),
        limit(5),
        where('score', '>', 0),
      );
    } catch (error: any) {
      console.error('Error loading data during scoreboard refresh:', error);
      this.errorText.text = error.message || 'An error occurred';
      return;
    }

    // clear the scoreboard
    await this.clearScoreboard();

    data.forEach((score: any) => {
      this.scores.push({
        id: score.id,
        username: score.username,
        score: score.score,
      });
    });

    if (this.scores.length) {
      this.scoreboardMessage.text = '';
      this.scores.forEach((score: any, idx: number) => {
        const scoreUI = this.createScoreUI(score);
        this.scoreboard.addChild(scoreUI);
        gsap.fromTo(scoreUI, { alpha: 0, y: 10 }, { alpha: 1, y: 0, duration: 0.3, delay: idx * 0.1 });
      });

      // if scoreboard has text, remove it
    } else {
      this.scoreboardMessage.text = 'No scores yet.';
    }
  }
}
