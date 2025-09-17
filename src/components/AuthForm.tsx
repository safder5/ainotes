"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { loginAction, signUpAction } from "@/actions/user";

type Props = {
  type: "login" | "signUp";
};

function AuthForm({ type }: Props) {
  const isLoginform = type === "login";
  const router = useRouter();
  //   const toaster = toast();

  const [isPending, startTransition] = useTransition();

  const handdleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      let errorMessage;
      let title;
      let description;
      if (isLoginform) {
        errorMessage = (await loginAction(email, password)).errorMessage;
        title = "Logged In";
        description = " You have been successfully logged in ";
      } else {
        errorMessage = (await signUpAction(email, password)).errorMessage;
        title = "Signed Up";
        description = " Check your email for confirmation link ";
      }

      if (!errorMessage) {
        toast(title, {
          description: description,
        });
        router.push("/");
      } else {
        toast("Error", {
          description: errorMessage,
        });
      }
    });
  };

  return (
    <form action={handdleSubmit}>
      <CardContent className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label>
            E-mail
            <Input
              id="email"
              name="email"
              placeholder="enter your email"
              type="email"
              required
              disabled={isPending}
            ></Input>
          </Label>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label>
            Password
            <Input
              id="password"
              name="password"
              placeholder="enter your Password"
              type="password"
              required
              disabled={isPending}
            ></Input>
          </Label>
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex flex-col gap-6">
        <Button className="w-full">
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isLoginform ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </Button>
        <p className="text-xs ">
          {isLoginform
            ? "Don't have an account yet? "
            : " Already have an account?"}{" "}
          <Link
            href={isLoginform ? "/sign-up" : "/login"}
            className={`text-blue-500 underline ${isPending ? "pointer-events-none opacity-50" : ""}`} // a real nice learning right here
          >
            {isLoginform ? "Sign Up" : "Login"}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
}

export default AuthForm;

// function SignUpAction(email: string, password: string) {
//     throw new Error("Function not implemented.");
// }
