import { useEffect, useMemo, useState } from "react";
import { AdminContext } from "./AdminContext";

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  //  Admin state
const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const adminValue = useMemo(() => ({ isAdmin, setIsAdmin }), [isAdmin]);


  return (
    <AdminContext.Provider value={adminValue}>
      {children}
    </AdminContext.Provider>
  );
};

export default AppProvider;
