// Write imports go here!
import { createContext, useContext, useEffect, useState} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Write const here!
  const [currentUser, setCurrentUser] = useState(null);
  const [ loading, setLoading]        = useState(true);

  useEffect(() => {
    // code here!
    // Firebase calls this any time the user signs in or out
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
    });

    //Clean up the listener when the component unmounts
    return unsubscribe;
  }, []);

  if (loading) return <p>Loading...</p>;
  // Write your return statement here!

  return(
    <AuthContext.Provider value ={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
