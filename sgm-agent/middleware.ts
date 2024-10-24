// middleware.js
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req:NextRequest) {
    console.log('middleware')
    const token = req.cookies.get('token');
    console.log('token', token)
    if (!token) {
        return NextResponse.redirect(new URL('/auth/entrar', req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/viaturas'], // Protege todas as rotas que começam com /protected
};