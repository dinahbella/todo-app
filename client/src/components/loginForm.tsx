import { auth, signIn } from "@/auth";
import SubmitButton from "./SubmitButton";
import { Facebook, Google } from "./socialIcons";

const LoginForm = async () => {
  return (
    <div className="flex flex-col gap-4">
      <form
        action={async () => {
          await signIn("github", {
            redirectTo: "/onboarding",
          });
        }}
      >
        <SubmitButton
          text="Login with Github"
          variant="outline"
          width="w-full"
          icon={<Facebook />}
        />
      </form>
      <form
        action={async () => {
          await signIn("google", {
            redirectTo: "/onboarding",
          });
        }}
      >
        <SubmitButton
          text="Login with Google"
          variant="outline"
          width="w-full"
          icon={<Google />}
        />
      </form>
    </div>
  );
};

export default LoginForm;
