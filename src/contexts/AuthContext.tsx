import { User, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { IUser, Setter } from "../types/types";
import { doc, getDoc } from "firebase/firestore";

interface IAuthContext {
  authUser: User | null;
  setAuthUser: Setter<User | null>;
  isAuthenticated: boolean;
  user: IUser | null;
  setUser: Setter<IUser | null>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  const isAuthenticated = authUser ? true : false;

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        getDoc(doc(db, "users", currentUser.uid)).then((userSnapshot) => {
          setUser(userSnapshot.data() as IUser);
        });
      }
    });

    return unsubscribed;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, authUser, setAuthUser, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
