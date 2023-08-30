import { NextResponse } from 'next/server';

const matcherGerente = {matcher: ['/gerente/:path*']};
const matcherAtentende = {matcher: ['/atentende/:path*']};
const matcherHospede = {matcher: ['/hospede/:path*']};
const matcherAuxilar = {matcher: ['/auxiliar/:path*']};

export default function middleware(request) {

    let cookie = request.cookies.get('authGerente')
    if (cookie == undefined) {
        return NextResponse.redirect(new URL('/noacess', request.url))
      }
      
};

export const config = {
    matcher: ['/hospede', 
              '/checkin', 
              '/consumo', 
              '/despesa', 
              '/governanca', 
              '/hospedagem', 
              '/hospede', 
              '/quarto', 
              '/reserva', 
              '/servico'],
}