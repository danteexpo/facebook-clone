import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyBJg1DREC1ZFmLPEPUMRupjrzYwjCriAkg",
	authDomain: "facebook-clone-d9bea.firebaseapp.com",
	projectId: "facebook-clone-d9bea",
	storageBucket: "facebook-clone-d9bea.appspot.com",
	messagingSenderId: "551571516547",
	appId: "1:551571516547:web:b340405f8bc6faed8f3fb6",
};

// init firebase app
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// init timestamp
const timestamp = firebase.firestore.Timestamp;

// export everything
export { projectFirestore, projectAuth, projectStorage, timestamp };
