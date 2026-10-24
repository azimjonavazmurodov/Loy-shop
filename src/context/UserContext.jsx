import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

const EMPTY_PROFILE = { name: "", phone: "", address: "" };

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = window.localStorage.getItem("loy_user_profile");
      return saved ? JSON.parse(saved) : EMPTY_PROFILE;
    } catch {
      return EMPTY_PROFILE;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem("loy_user_profile", JSON.stringify(profile));
    } catch {
    }
  }, [profile]);

  function updateProfile(data) {
    setProfile((p) => ({ ...p, ...data }));
  }

  return (
    <UserContext.Provider value={{ profile, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
}
