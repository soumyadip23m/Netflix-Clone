import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword,
    signOut } from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyC0pXFX9w9Z0-TkqgZOHxJtT-gYyVqQ1es",
  authDomain: "netflix-clone-80b3f.firebaseapp.com",
  projectId: "netflix-clone-80b3f",
  storageBucket: "netflix-clone-80b3f.firebasestorage.app",
  messagingSenderId: "1062854206596",
  appId: "1:1062854206596:web:4ec6a897f5c02dbc2d4ed1"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app)

const signup = async (name, email, password) => {
    try {
       const res =  await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;
       await addDoc(collection(db, "user"),{
        uid: user.uid,
        name,
        authProvider: "local",
        email,
       });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout =  () => {
    signOut(auth);
}


export {auth, db, signup, login, logout };