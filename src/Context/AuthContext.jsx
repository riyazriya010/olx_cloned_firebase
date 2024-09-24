
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/Config.jsx"
import { addDoc } from 'firebase/firestore'



const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});


  const signUp = async (userName, email, phone, password) => {
    try {
      // Create the user with email and password
      let userDetails = await createUserWithEmailAndPassword(auth, email, password);
  
      // If user doesn't exist, update the profile with username
      await updateProfile(userDetails.user, {
        displayName: userName,
      });
  
      // Add user to Firestore 'users' collection
      await addDoc(userRef, {
        id: userDetails.user.uid,
        userName,
        email,
        phone,
      });
  
      return { success: true };
      
    } catch (error) {
      if(error.code === 'auth/email-already-in-use'){
        console.log('userExits')
        return { userExits: true }
      }
      console.log(error);
      return { success: false };
    }
  };

  

  const logIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      return { success: true };
      
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  const logOut = async () => {
    
    await signOut(auth);
    
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, signUp, logOut, logIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;