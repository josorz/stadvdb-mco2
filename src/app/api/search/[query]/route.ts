import { NextResponse } from "next/server"
import { pool } from "@/config/db";

export async function GET(req: any, { params }: { params: { query: string } }) {
    try {
        const { query } = await params
        const search = query.slice(0, -1)
        console.log(search)
        const [rows] = await pool.query(`SELECT AppID, Name, Release_date FROM steamgames WHERE Name LIKE '%${search}%' OR AppID='${search}';`)
        console.log(rows)
        return NextResponse.json(rows)
    } catch (err) {
        console.log(err)
        return NextResponse.json({ err }, { status : 500 })
    }
}