import { pool } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {
    const [rows] = await pool.query('SELECT AppID, Name, Release_date FROM steamgames ORDER BY Release_date DESC LIMIT 10')
    return NextResponse.json(rows)
}