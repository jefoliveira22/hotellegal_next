import { NextResponse } from 'next/server';

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