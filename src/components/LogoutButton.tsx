"use client";

import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import "react-hook-toast/dist/style.css";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logOutAction } from "@/actions/user";

function LogOutButton() {
  // const loading = false;
  //   const toast = useToast();
  //   const {toast} = toast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    // console.log("Loggin Out....");
    const { errorMessage } = await logOutAction();

    if (!errorMessage) {
      toast("Logged out", {
        description: "You have been successfully logged out",
        action: {
          label: "logging out",
          onClick: () => console.log("logged out"),
        },
      });
      router.push("/");
    } else {
      toast("Error", {
        description: errorMessage,
        action: {
          label: " Error Logging Out",
          onClick: () => console.log("Error, couldn't log out"),
        },
      });
    }

    setLoading(false);
  };
  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      disabled={loading}
      className="w-24"
    >
      {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
    </Button>
  );
}

export default LogOutButton;
