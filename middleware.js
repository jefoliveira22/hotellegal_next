import { NextResponse } from 'next/server';

export default function middleware(request) {

    let cookie = request.cookies.get('authGerente')?.value
    if (!cookie) {
        if (request.nextUrl.pathname === "/") {
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL('/noacess', request.url))
    }
    if (request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL('/hospede', request.url))
    }
      
};

export const config = {
    matcher: ['/', '/hospede', '/checkin', '/consumo', '/despesa', '/governanca', '/hospedagem', '/hospede', '/quarto', 
    '/reserva', '/servico'],
}