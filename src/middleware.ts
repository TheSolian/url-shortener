import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const AUTH_ROUTES = ['/sign-in', '/sign-up'];
const PUBLIC_ROUTES = ['/'];
const PRIVATE_ROUTES = ['/dashboard'];

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (AUTH_ROUTES.includes(pathname)) {
        if (session) {
            return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.next();
    }

    if (PUBLIC_ROUTES.includes(pathname)) {
        return NextResponse.next();
    }

    if (PRIVATE_ROUTES.includes(pathname)) {
        if (!session) {
            return NextResponse.redirect(new URL('/sign-in', request.url));
        }
        return NextResponse.next();
    }
}

export const config = {
    runtime: 'nodejs',
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
