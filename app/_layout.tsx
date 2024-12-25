import React from "react";
import { Slot, usePathname, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { ClickCountProvider } from "@/contexts/ClickCountContext";
import { UserProvider } from "@/contexts/UserContext";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const currentPath = usePathname();

  React.useEffect(() => {
    const currentRoute = currentPath.split("/")[1];

    if (
      !isAuthenticated &&
      currentRoute !== "signin" &&
      currentRoute !== "signup"
    ) {
      router.replace("/signin");
    }
  }, [isAuthenticated, router]);

  return <>{children}</>;
};

const Layout = () => {
  return (
    <AuthProvider>
      <AuthGuard>
       <UserProvider>
        <ClickCountProvider>
          <Slot />
        </ClickCountProvider>
         </UserProvider>
      </AuthGuard>
    </AuthProvider>
  );
};

export default Layout;