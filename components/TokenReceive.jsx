"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

function TokenReceiveContent() {
  const searchParams = useSearchParams();

  let access_token = searchParams.get("access_token");
  let refresh_token = searchParams.get("refresh_token");

  Cookies.set("access_token", access_token, { expires: 1 });
  Cookies.set("refresh_token", refresh_token, { expires: 1 });

  if (typeof window !== "undefined") {
    window.location.href = "/";
  }

  return <div>Redirecting...</div>; 
}

export default function TokenReceive() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TokenReceiveContent />
    </Suspense>
  );
}
