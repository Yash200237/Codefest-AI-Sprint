import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/auth/validate-token",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          router.push("/login");
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Authentication check failed:", error);
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  return isAuthenticated;
};

export default useAuth;
