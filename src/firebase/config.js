// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBJg1DREC1ZFmLPEPUMRupjrzYwjCriAkg",
	authDomain: "facebook-clone-d9bea.firebaseapp.com",
	projectId: "facebook-clone-d9bea",
	storageBucket: "facebook-clone-d9bea.appspot.com",
	messagingSenderId: "551571516547",
	appId: "1:551571516547:web:b340405f8bc6faed8f3fb6",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage(firebaseApp);

export { db, auth, storage };
