import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-analytics.js";
import {
  getDatabase,
  ref,
  onValue,
  child,
  get,
  update,
} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";

export let firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

async function initializeFirebase() {
  const config = await axios.get("https://lgiralt.com:3017/api/v1/get-service");

  Object.assign(firebaseConfig, config.data.data);

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getDatabase(app);
  const dbRef = ref(getDatabase());

  return { app, analytics, db, dbRef };
}

export const firebase = await initializeFirebase();
