import { query, where, getDocs, setDoc, doc } from '@dill-pixel/storage-adapter-firebase';

import { BaseScene } from './BaseScene';

export class FirebaseAdapterScene extends BaseScene {
  protected readonly title = 'Firebase Storage Adapter';
  protected readonly subtitle = 'Demonstrates custom adapter functionality';

  constructor() {
    super();
  }

  public async initialize() {
    await super.initialize();

    // save a user score (with custom ID)
    const newUser = await this.app.firebase.save('users', { username: 'relish', score: 50 }, 'custom-id');
    console.log('Saved user:', newUser);

    // save a user score (with auto-generated ID)
    // will create a new user document each time this is called
    // await this.app.firebase.save('users', { username: 'relish', score: 100 });

    // create user to delete below
    await this.app.firebase.save('users', { username: 'relish', score: 100 }, 'user-to-delete');

    // get all users
    const users = await this.app.firebase.getCollection('users');
    console.log('Loaded users:', users);

    // get single user by ID
    const user1 = await this.app.firebase.getDocumentById('users', 'custom-id');
    console.log('Loaded user 1:', user1);

    // get signle user by username (via helper method)
    const user2 = await this.app.firebase.getDocumentByField('users', 'username', 'relish');
    console.log('Loaded user 2:', user2);

    // get single user by username (via query)
    const results = await this.app.firebase.queryCollection('users', 'username', '==', 'relish');
    console.log('Loaded user 3:', results[0]);

    // update a user score
    const updatedUser = await this.app.firebase.save('users', { username: 'relish', score: 100 }, 'custom-id');
    console.log('Updated user:', updatedUser);

    // delete a user (via helper method)
    await this.app.firebase.deleteDocumentById('users', 'user-to-delete');
  }

  public async saveScore(username: string, score: number) {
    // check if the user exists
    // if so, update the score
    // if not, create the user

    const usersCollection = this.app.firebase.getCollection('users');

    const q = query(usersCollection, where('username', '==', username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log('Username already exists. No new user created.');

      // updating score
      querySnapshot.forEach(async (q) => {
        const userDoc = doc(usersCollection, q.id);
        await setDoc(userDoc, { score });
        console.log('Score updated for user with ID: ', q.id);
      });
    }
  }
}
