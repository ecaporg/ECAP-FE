import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <ShieldAlert className="size-8 text-red-500" />
          <h1 className="text-2xl font-semibold">403</h1>
        </div>
        <h2 className="text-xl font-medium">Access Forbidden</h2>
        <p className="max-w-md text-darker-gray">
          You don't have permission to access this page. Please contact your
          administrator if you believe this is a mistake.
        </p>
      </div>
      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link href="/">Go to Home</Link>
        </Button>
        <Button asChild>
          <Link href="/auth/login">Sign In</Link>
        </Button>
      </div>
    </div>
  );
}
