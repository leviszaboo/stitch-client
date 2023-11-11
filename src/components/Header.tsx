import { PawPrint } from "lucide-react";
import { Button } from "./ui/button";
import SignUpDialog from "./auth/SignUpDialog";
import SignInDialog from "./auth/SignInDialog";

export default function Header() {
  return (
    <div className="flex gap-6 m-6">
      <div>
        <PawPrint size={44}/>
      </div>
      <div className="flex items-center align-center">
        <h1 className="font-bold text-3xl mr-auto">
          stitch.
        </h1>
      </div>
      <div className="flex gap-3 ml-auto">
        <SignInDialog />
        <SignUpDialog />
      </div>
    </div>
  )
}
