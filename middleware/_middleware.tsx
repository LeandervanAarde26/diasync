import { NextResponse } from "next/server";

const signedInPages = ['/home']

export default function middleware(req: any){
    if(signedInPages.find((p) => p === req.nextUrl.pathname)){
        const {TOKEN: token} = req.cookies;

        if(!token){
            return NextResponse.redirect('/')
        }
    }
}