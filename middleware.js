import { NextResponse } from 'next/server'
import { NextRequest } from "next/server";


export default function middleware(request) {

    let cookie = request.cookies.get('auth')
    if (cookie == undefined) {
        return NextResponse.json(
          {
            success: false,
            message: "Sem permissão de acesso",
          },
          {
            status: 401,
          }
        );
      }
      
}

// Limit the middleware to paths starting with `/admin/`
export const config = {
    matcher: '/admin/:path*',
}