import { pool } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {
    const [rows] = await pool.query('SELECT AppID, Name, Release_date FROM steamgames ORDER BY Release_date DESC LIMIT 10')
    const [q2] = await pool.query('SELECT COUNT(*) AS count FROM steamgames');
    const count = q2[0]?.count; // Extract the count value
    return NextResponse.json({rows, count})
}