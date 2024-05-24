import { StorageAdapter as a, Logger as s } from "dill-pixel";
import { initializeApp as n } from "firebase/app";
import { getFirestore as d, addDoc as l, collection as r, getDocs as c, doc as p, getDoc as h } from "firebase/firestore";
export * from "firebase/firestore";
class u extends a {
  initialize(t, e) {
    s.log("FirebaseAdapter initialized"), this._options = e, this._firebaseApp = n(this._options), this._db = d(this._firebaseApp);
  }
  get firebaseApp() {
    return this._firebaseApp;
  }
  get db() {
    return this._db;
  }
  async save(t, e) {
    if (!this._db)
      throw new Error("Firestore has not been initialized. Call initialize() first.");
    try {
      const i = await l(r(this._db, t), e);
      console.log("Document written with ID: ", i.id);
    } catch (i) {
      console.error("Error adding document: ", i);
    }
  }
  async loadAll(t) {
    if (!this._db)
      throw new Error("Firestore has not been initialized. Call initialize() first.");
    return (await c(r(this._db, t))).docs.map((i) => ({
      id: i.id,
      data: i.data()
    }));
  }
  async load(t, e) {
    if (!this._db)
      throw new Error("Firestore has not been initialized. Call initialize() first.");
    const i = p(this._db, t, e), o = await h(i);
    return o.exists() ? console.log("Document data:", o.data()) : console.log("No such document!"), o.data();
  }
  getCollection(t) {
    return r(this._db, t);
  }
  // async delete(collection: string, id: string): Promise<void> {
  //   if (!this._db) {
  //     throw new Error('Firestore has not been initialized. Call initialize() first.');
  //   }
  //   await deleteDoc(doc(this._db, collection, id));
  //   console.log('Document successfully deleted!');
  // }
}
export {
  u as default
};
//# sourceMappingURL=dill-pixel-storage-adapter-firebase.mjs.map
