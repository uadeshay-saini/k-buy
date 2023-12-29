import { NextResponse } from "next/server"
export async function GET(){
    return NextResponse.json(
        [
            124001,
            122001, 
            10010,
            191910
        ]
    );
}