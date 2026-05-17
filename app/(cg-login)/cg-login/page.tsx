
import { Suspense } from "react";
import LoginPageClient from "@/components/auth/LoginPageClient";

const CgLoginPage = () => {
  return (
     <Suspense fallback={<div>Loading...</div>}>
      <LoginPageClient />
    </Suspense>
  );
};

export default CgLoginPage;
