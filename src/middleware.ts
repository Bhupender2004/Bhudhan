// Temporarily disable middleware to get basic authentication working
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware() {
  // Just pass through all requests
  return NextResponse.next();
}

// Configure the middleware to run on minimal routes for now
export const config = {
  matcher: [],
};
