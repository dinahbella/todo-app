"use server";

import { signIn } from "@/auth";
import React from "react";
import { Button } from "./ui/button";
import { Google } from "@/app/login/page";
import { Facebook } from "@/app/login/page";

async function handleGoogleSignIn() {
  await signIn("google", {
    callbackUrl: "http://localhost:3000/onboarding",
    redirectTo: "/onboarding",
  });
}

async function handleFacebookSignIn() {
  await signIn("facebook", {
    callbackUrl: "http://localhost:3000/onboarding",
    redirectTo: "/onboarding",
  });
}

const LoginForm = () => {
  return (
    <div>
      <form action={handleGoogleSignIn}>
        <Button variant="outline" className="w-full" type="submit">
          <Google />
          Google
        </Button>
      </form>
      <form action={handleFacebookSignIn}>
        <Button variant="outline" className="w-full" type="submit">
          <Facebook />
          Facebook
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
