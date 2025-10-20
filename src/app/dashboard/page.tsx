import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import SignUpButton from "./components/sign-up-button";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h1>{session?.user?.email}</h1>
      <SignUpButton />
    </div>
  );
};

export default DashboardPage;
