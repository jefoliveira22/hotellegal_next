import { NextResponse } from 'next/server';

export default function middleware(request) {

    let cookie = request.cookies.get('hotelLegal')
    if (!cookie) {
        if (request.nextUrl.pathname === "/") {
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL('/noacess', request.url))
    }

    if (request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL('/hospede', request.url))
    }

    if (request.nextUrl.pathname === "/hospede" ) {
        if (cookie.value === 'authGerente') {
            return NextResponse.next()
        }
        else if (cookie.value === 'authAtendente') {
            return NextResponse.next()
        }
        else {
            return NextResponse.redirect(new URL('/noacess', request.url))
        }
    }

    if (request.nextUrl.pathname === "/checkin" ) {
        if (cookie.value === 'authGerente') {
            return NextResponse.next()
        }
        else if (cookie.value === 'authAtendente') {
            return NextResponse.next()
        }
        else {
            return NextResponse.redirect(new URL('/noacess', request.url))
        }
    }

    if (request.nextUrl.pathname === "/consumo" ) {
        if (cookie.value === 'authGerente') {
            return NextResponse.next()
        }
        else if (cookie.value === 'authAtendente') {
            return NextResponse.next()
        }
        else {
            return NextResponse.redirect(new URL('/noacess', request.url))
        }
    }

    if (request.nextUrl.pathname === "/despesa" ) {
        if (cookie.value === 'authGerente') {
            return NextResponse.next()
        }
        else {
            return NextResponse.redirect(new URL('/noacess', request.url))
        }
    }
    
    if (request.nextUrl.pathname === "/governança" ) {
        if (cookie.value === 'authGerente') {
            return NextResponse.next()
        }
        else if (cookie.value === 'authAuxiliar') {
            return NextResponse.next()
        }
        else {
            return NextResponse.redirect(new URL('/noacess', request.url))
        }
    }

    if (request.nextUrl.pathname === "/hospedagem" ) {
        if (cookie.value === 'authGerente') {
            return NextResponse.next()
        }
        else if (cookie.value === 'authAtendente') {
            return NextResponse.next()
        }
        else {
            return NextResponse.redirect(new URL('/noacess', request.url))
        }
    }

    if (request.nextUrl.pathname === "/quarto" ) {
        if (cookie.value === 'authGerente') {
            return NextResponse.next()
        }
        else if (cookie.value === 'authAtendente') {
            return NextResponse.next()
        }
        else if (cookie.value === 'authAuxiliar') {
            return NextResponse.next()
        }
        else {
            return NextResponse.redirect(new URL('/noacess', request.url))
        }
    }

    if (request.nextUrl.pathname === "/reserva" ) {
        if (cookie.value === 'authGerente') {
            return NextResponse.next()
        }
        else if (cookie.value === 'authAtendente') {
            return NextResponse.next()
        }
        else if (cookie.value === 'authHospede') {
            return NextResponse.next()
        }
        else {
            return NextResponse.redirect(new URL('/noacess', request.url))
        }
    }
    
    if (request.nextUrl.pathname === "/servico" ) {
        if (cookie.value === 'authGerente') {
            return NextResponse.next()
        }
        else if (cookie.value === 'authAtendente') {
            return NextResponse.next()
        }
        else if (cookie.value === 'authAuxiliar') {
            return NextResponse.next()
        }
        else {
            return NextResponse.redirect(new URL('/noacess', request.url))
        }
    }
};

export const config = {
    matcher: ['/', '/hospede', '/checkin', '/consumo', '/despesa', '/governanca', '/hospedagem', '/quarto', '/reserva', 
    '/servico'],
}