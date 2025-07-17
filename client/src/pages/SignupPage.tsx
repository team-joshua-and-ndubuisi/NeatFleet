import React, { useEffect } from "react";
import SignupForm from "@/features/auth/components/SignupForm";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { SignupBodyT } from "@/features/auth";
import { useAuthStore } from "@/features/auth/stores";
export default function SignupPage() {
  const { signup } = useAuth();
  const initAuth = useAuthStore((state) => state.initAuth);
  const {
    mutateAsync: signupMutate,
    data,
    isError,
    isPending,
    isSuccess,
  } = signup;

  //when data resolves, initialize auth store
  useEffect(() => {
    console.log("LoginPage init auth");
    if (data) {
      initAuth(data);
    }
  }, [data]);

  const handleSignup = async (userCredentials: SignupBodyT) => {
    await signupMutate(userCredentials);
  };

  let displayComponent: React.ReactNode = <SignupForm apiCall={handleSignup} />;

  if (isSuccess && data) {
    console.log("data", data);
  }
  if (isError) {
    console.error("Signup failed");
  }

  if (isPending) {
    displayComponent = <div>Loading...</div>;
  }
  return (
    <div className="w-full flex justify-center h-screen">
      {displayComponent}
    </div>
  );
}
