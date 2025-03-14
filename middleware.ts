// /middleware.ts

import { NextResponse } from "next/server";

export async function middleware(request) {
  // This simplified middleware just passes all requests through
  // without any prerendering logic
  return NextResponse.next();
}
