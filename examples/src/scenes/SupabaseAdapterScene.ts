import { ActionDetail, Button, FlexContainer, Logger } from 'dill-pixel';
import { BaseScene } from './BaseScene';
import { Input } from '@pixi/ui';
import { Graphics, Text } from 'pixi.js';
import { SimpleButton } from '@/popups/ExamplePopup';
import { gsap } from 'gsap';
import { Tables } from '../supabase';
import type { SaveMethod } from '@dill-pixel/storage-adapter-supabase';

// user_id, username, and score are required fields
type Score = Partial<Tables<'scores'>> & Pick<Tables<'scores'>, 'user_id' | 'username' | 'score'>;

type SaveActionData = {
  tableId: string;
  data: Score;
  method: SaveMethod
}

export class SupabaseAdapterScene extends BaseScene {
  protected readonly title = 'Supabase Storage Adapter';
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

  protected signInButton: Button;
  protected signOutButton: Button;
  protected greetingMessage: Text;

  protected authenticatedUIElements: any[] = [];
  protected unauthenticatedUIElements: any[] = [];
  private user: any = null;

  constructor() {
    super();
  }

  public async initialize() {
    await super.initialize();

    const { data } = await this.app.supabase.client.auth.getUser();
    this.user = data.user;

    // add a container for some buttons
    this.buttonContainer = this.add.flexContainer({
      gap: 10,
      justifyContent: 'center',
      alignItems: 'center',
      visible: this.user !== null,
    });
    this.buttonContainer.y -= 80;
    this.authenticatedUIElements.push(this.buttonContainer);

    // add a focus layer
    this.app.focus.addFocusLayer(this.id);

    // add a save button
    const saveButton = this.createButton('Save', 'green', () => {
      const username = this.usernameInput.value;
      const scoreAsNum = parseInt(this.scoreInput.value, 10);

      this.app.sendAction<SaveActionData>('save_to_supabase', {
        tableId: 'scores',
        data: { user_id: this.user.id, username, score: scoreAsNum },
        method: 'insert',
      });
    });
    this.buttonContainer.addChild(saveButton);

    // add a load button
    const loadButton = this.createButton('Reload', 'blue', () => {
      this.app.sendAction('load_from_supabase');
    });
    this.buttonContainer.addChild(loadButton);

    // add a clear button
    const clearButton = this.createButton('Clear', 'red', () => {
      this.app.sendAction('clear_supabase');
    });
    this.buttonContainer.addChild(clearButton);

    /// add a signin button
    this.signInButton = this.createButton('Sign In', 'yellow', () => {
      this.app.sendAction('sign_in');
    });
    this.unauthenticatedUIElements.push(this.signInButton);

    this.signOutButton = this.createButton('Sign Out', 'purple', () => {
      this.app.sendAction('sign_out');
    });
    this.authenticatedUIElements.push(this.signOutButton);

    this.add.existing(this.signInButton);
    this.add.existing(this.signOutButton);
    this.signInButton.visible = this.user === null;
    this.signOutButton.visible = this.user !== null;

    this.greetingMessage = this.add.text({
      text: `${this.user ? `Hello, ${this.user.email}` : 'Sign in to save scores'}`,
      style: { fill: 0xffffff, fontSize: 24, align: 'center' },
    });
    this.greetingMessage.anchor = 0.5;

    this.app.actions('save_to_supabase').connect(this._handleSave);
    this.app.actions('load_from_supabase').connect(this._handleLoad);
    this.app.actions('clear_supabase').connect(this._handleClear);
    this.app.actions('delete_from_supabase').connect(this._handleDelete);
    this.app.actions('sign_in').connect(this._handleSignIn);
    this.app.actions('sign_out').connect(this._handleSignOut);

    // create inputs
    this.createInputs();

    // create scoreboard
    this.createScoreboard();

    // add error text
    this.errorText = this.add.text({
      text: '',
      style: { fill: 0xf79295, fontSize: 18, align: 'center', fontWeight: 'bold' },
    });

    this.errorText.anchor = 0.5;
    this.errorText.y = this.inputContainer.y + 100;

    // refresh the scoreboard
    this.refreshScoreboard();
  }

  private async _handleSignIn() {
    const { data, error } = await this.app.supabase.client.auth.signInWithPassword({
      email: 'demo@reli.sh',
      password: 'demo',
    });

    if (error) {
      console.error('Error signing in:', error);
      this.errorText.text = error.message;
      return;
    }

    Logger.log('Signed in:', data);
    this.user = data.user;

    // hide the unauthenticated UI elements
    this.unauthenticatedUIElements.forEach((element) => {
      element.visible = false;
    });

    // show the authenticated UI elements
    this.authenticatedUIElements.forEach((element) => {
      element.visible = true;
    });

    // update the greeting message
    this.greetingMessage.text = `Hello, ${this.user.email}`;

    this.refreshScoreboard();
    this.positionScoreboard();
  }

  private async _handleSignOut() {
    const { error } = await this.app.supabase.client.auth.signOut();

    if (error) {
      console.error('Error signing out:', error);
      this.errorText.text = error.message;
      return;
    }

    Logger.log('Signed out');
    this.user = null;

    // hide the authenticated UI elements
    this.authenticatedUIElements.forEach((element) => {
      element.visible = false;
    });

    // show the unauthenticated UI elements
    this.unauthenticatedUIElements.forEach((element) => {
      element.visible = true;
    });

    // update the greeting message
    this.greetingMessage.text = 'Sign in to save scores';

    this.refreshScoreboard();
    this.positionScoreboard();
  }

  private async _handleSave(action: ActionDetail<SaveActionData>) {
    this.errorText.text = '';

    if (!action.data) {
      throw new Error('No data to save');
    }

    // Option 1: use the store
    // const res = await this.app.store.save('supabase', action.data.tableId, action.data.data, action.data.method);
    // const { data, error } = res[0];

    // Option 2: use the adapter
    const {data, error} = await this.app.supabase.save<Score>(action.data.tableId, action.data.data, action.data.method);

    if (error) {
      console.error('Error saving data:', error);

      if (error.code === '23505') {
        this.errorText.text = 'Username already exists. Please use a different one.';
      } else {
      this.errorText.text = error.details || error.message || 'An error occurred';
      }
    } else {
      Logger.log('Saved data:', data);
      const scoreToAdd = data[0];
      this.addScoreToScoreboard({
        user_id: scoreToAdd.user_id,
        username: scoreToAdd.username,
        score: scoreToAdd.score,
      });
      this.usernameInput.value = '';
      this.scoreInput.value = '';
    }
  }

  private async _handleLoad() {
      this.refreshScoreboard();
  }

  private async _handleClear() {
    this.errorText.text = '';

    // hacky way to delete all scores (i.e. all rows)
    const randomString = Math.random().toString(36).substring(7);

    // via the supabase client directly:
    const { error } = await this.app.supabase.client.from('scores').delete().neq('username', randomString);

    if (error) {
      console.error('Error clearing data:', error);
      this.errorText.text = error.details;
    } else {
      Logger.log('Cleared data');
      this.refreshScoreboard();
    }
  }

  private async _handleDelete(action: ActionDetail) {
    this.errorText.text = '';
    const { data, error } = await this.app.supabase.delete(action.data.tableId, action.data.data);

    if (error) {
      console.error('Error deleting data:', error);
      this.errorText.text = error.details;
    } else {
      Logger.log('Deleted data:', data);
      const scoreToDelete = data[0];
      this.deleteScoreFromScoreboard({
        user_id: scoreToDelete.user_id,
        username: scoreToDelete.username,
        score: scoreToDelete.score,
      });
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
      visible: this.user !== null,
    });
    this.authenticatedUIElements.push(this.inputContainer);

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
    if (!this.user) {
      this.scoreboard.y = 0;
      this.scoreboardHeading.y = this.scoreboard.y - 70;
      this.scoreboardMessage.y = this.scoreboardHeading.y + 40;
      // better way to do this?
      this.scoreboard.pivot.x = 100;
    } else {
      this.scoreboard.y = this.buttonContainer.y + 180;
      this.scoreboardHeading.y = this.scoreboard.y - 70;
      this.scoreboardMessage.y = this.scoreboardHeading.y + 40;

      // better way to do this?
      this.scoreboard.pivot.x = 120;
    }
  }

  private addScoreToScoreboard(score: Score) {
    // if there are no scores, remove the message
    if (this.scores.length === 0) {
      this.scoreboardMessage.text = '';
    }

    // add the score
    this.scores.push(score);

    const scoreUI = this.createScoreUI(score);
    this.scoreboard.addChild(scoreUI);

    gsap.fromTo(scoreUI, { alpha: 0, y: 10 }, { alpha: 1, y: 0, duration: 0.3 });
  }

  private deleteScoreFromScoreboard(score: Score) {
    // delete the score
    const scoreToDelete = this.scores.find((s) => {
      return s.user_id === score.user_id && s.username === score.username && s.score === score.score;
    }) as Score;

    const index = this.scores.indexOf(scoreToDelete);
    this.scores.splice(index, 1);

    const scoreElement = this.scoreboard.getChildAt(index);
    gsap.to(scoreElement, {
      alpha: 0,
      x: -10,
      duration: 0.3,
      onComplete: () => {
        this.scoreboard.removeChildAt(index);
        if (!this.scores.length) {
          this.scoreboardMessage.text = 'No scores yet.';
        }
      },
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
              resolve();
            }
          },
        });
      });

      // clear scores
      this.scores = [];
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

    // if user is signed in and is the owner of the score, show a delete button for it
    if (this.user && this.user.id === score.user_id) {
      const deleteButton = this.make.container();

      const deleteButtonBg = new SimpleButton();
      deleteButtonBg.accessibleTitle = 'Delete';
      deleteButtonBg.accessibleHint = 'Press to delete this score';
      deleteButtonBg.onInteraction('click').connect(() => {
        // delete the score
        Logger.log('DELETING SCORE...', score);

        // via the adapter:
        // await this.app.supabase.delete('scores', { username: score.username });
        // this.refreshScoreboard();

        // via the action:
        this.app.sendAction('delete_from_supabase', {
          tableId: 'scores',
          data: { username: score.username },
        });
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
    }

    return scoreContainer;
  }

  private async refreshScoreboard() {
    this.errorText.text = '';

    // add scores
    const { data, error } = await this.app.supabase.load('scores').order('score', { ascending: false }).limit(5);
    Logger.log("Loaded data: ", data);

    if (error) {
      console.error('Error loading data during scoreboard refresh:', error);
      this.errorText.text = error.details;
      return;
    }

    // clear the scoreboard
    await this.clearScoreboard();

    data.forEach((score: any) => {
      this.scores.push({
        user_id: score.user_id,
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

  resize() {
    super.resize();

    // top right of screen
    const position = {
      x: this.app.center.x - 230,
      y: -this.app.center.y + 80,
    };

    this.signInButton.x = position.x;
    this.signInButton.y = position.y;
    this.signOutButton.x = position.x;
    this.signOutButton.y = position.y;
    this.greetingMessage.x = position.x;
    this.greetingMessage.y = position.y + 60;
  }
}
