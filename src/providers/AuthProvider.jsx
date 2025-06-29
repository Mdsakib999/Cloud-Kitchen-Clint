import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import axiosInstance from "../Utils/axios";
import app from "../firebase/firebase.config";

export const auth = getAuth(app);
const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const isAdmin = role === "admin";

  const actionCodeSettings = {
    url: "http://localhost:5173/handle-auth",
    handleCodeInApp: true,
  };

  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Send verification email only for email/password signup
      await sendEmailVerification(result.user, actionCodeSettings);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (!result.user.emailVerified) {
        await sendEmailVerification(result.user, actionCodeSettings);
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // No need to send verification email for Google sign-in as
      // Google accounts are already verified
      return result;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  // forgot password - Fixed the missing import
  const forgotPassword = async (email) => {
    setLoading(true);
    try {
      return await sendPasswordResetEmail(auth, email);
    } finally {
      setLoading(false);
    }
  };

  // email verification
  const resendVerificationEmail = async () => {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      try {
        await sendEmailVerification(auth.currentUser, actionCodeSettings);
        return true;
      } catch (error) {
        throw error;
      }
    }
    return false;
  };

  // Check email verification status
  const checkEmailVerification = async () => {
    if (auth.currentUser) {
      try {
        await auth.currentUser.reload();
        const isVerified = auth.currentUser.emailVerified;
        setIsEmailVerified(isVerified);

        // Update backend if verification status changed
        if (isVerified && user && !user.isEmailVerified) {
          const idToken = await auth.currentUser.getIdToken(true);
          const result = await axiosInstance.post(
            "/auth/verify-token",
            {},
            { headers: { Authorization: `Bearer ${idToken}` } }
          );
          setUser(result.data);
        }

        return isVerified;
      } catch (error) {
        console.error("Error checking email verification:", error);
        return false;
      }
    }
    return false;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          await currentUser.reload();
          const idToken = await currentUser.getIdToken(true);
          const result = await axiosInstance.post(
            "/auth/verify-token",
            {},
            { headers: { Authorization: `Bearer ${idToken}` } }
          );
          const userData = result.data;
          localStorage.setItem("token", userData?.token);
          setUser(userData);
          setRole(userData?.role);
          setIsEmailVerified(currentUser.emailVerified);
        } catch (err) {
          console.error("Failed to fetch user data:", err);
          setUser(null);
          setRole(null);
          setIsEmailVerified(false);
          setLoading(false);
        }
      } else {
        setRole(null);
        setIsEmailVerified(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    loading,
    setLoading,
    setUser,
    user,
    role,
    isAdmin,
    isEmailVerified,
    createUser,
    signIn,
    googleSignIn,
    logout,
    forgotPassword,
    resendVerificationEmail,
    checkEmailVerification,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
