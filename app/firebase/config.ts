import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBqsopuB0BP251xmdO7KaednoSL-SAVzwc",
  authDomain: "mav360-974cd.firebaseapp.com",
  projectId: "mav360-974cd",
  storageBucket: "mav360-974cd.appspot.com",
  messagingSenderId: "154961888598",
  appId: "1:154961888598:web:1eb163bfceef41256142f7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 