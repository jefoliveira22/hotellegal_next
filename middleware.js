import { NextResponse } from 'next/server';

export default function middleware(request) {

    let cookie = request.cookies.get('hotelLegal')
    if (!cookie) {
        if (request.nextUrl.pathname === "/") {
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL('/noacess', request.url))
    }

    /*if (request.nextUrl.pathname === "/") {
        if (cookie.value === "authAtendente") {
            return NextResponse.redirect(new URL('/atendentes', request.url))
        }
        else if (cookie.value === "authAuxiliar") {
            return NextResponse.redirect(new URL('/auxiliares', request.url))
        }
        else if (cookie.value === "authHospede") {
            return NextResponse.redirect(new URL('/hospedes', request.url))
        }
        else if (cookie.value === "authGerente") {
            return NextResponse.redirect(new URL('/gerentes', request.url))
        } 
    }*/

    if (request.nextUrl.pathname === "/atendentes" ) {
        if (cookie.value === 'authAtendente') {
            return NextResponse.next()
        }
        else {
            return NextResponse.redirect(new URL('/noacess', request.url))
        }
    }

    if (request.nextUrl.pathname === "/auxiliares" ) {
        if (cookie.value === 'authAuxiliar') {
            return NextResponse.next()
        }
        else {
            return NextResponse.redirect(new URL('/noacess', request.url))
        }
    }

    if (request.nextUrl.pathname === "/hospedes" ) {
        if (cookie.value === 'authHospede') {
            return NextResponse.next()
        }
        else {
            return NextResponse.redirect(new URL('/noacess', request.url))
        }
    }

    if (request.nextUrl.pathname === "/gerentes" ) {
        if (cookie.value === 'authGerente') {
            return NextResponse.next()
        }
        else {
            return NextResponse.redirect(new URL('/noacess', request.url))
        }
    }
};

export const config = {
    matcher: ['/', '/atendentes', '/auxiliares', '/hospedes', '/gerentes'],
}