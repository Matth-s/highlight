import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import authConfig from './lib/auth/auth.config';
import { apiAuthPrefix, authRoutes } from './route';

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isAuthApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAuthApiRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(
      new URL('/authentification/connexion', req.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
