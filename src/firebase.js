import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, off } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAtc1-Jp4NudoGc-u-yRBvII0ZgD4DFifQ",
  authDomain: "econoclassroom-9780e.firebaseapp.com",
  databaseURL: "https://econoclassroom-9780e-default-rtdb.firebaseio.com",
  projectId: "econoclassroom-9780e",
  storageBucket: "econoclassroom-9780e.firebasestorage.app",
  messagingSenderId: "862250663734",
  appId: "1:862250663734:web:efbc2b50568341fa6e7d97"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export function saveToFirebase(path, data) {
  return set(ref(db, path), data);
}

export function subscribeToFirebase(path, callback) {
  const r = ref(db, path);
  onValue(r, snapshot => callback(snapshot.val()));
  return () => off(r);
}