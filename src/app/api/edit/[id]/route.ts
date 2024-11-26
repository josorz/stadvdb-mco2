import { pool } from "@/config/db";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params; 

    const [rows] = await pool.query('SELECT * FROM steamgames WHERE AppID = ' + id)
    return NextResponse.json( rows[0] )

}

function sanitizeParams(params : any, id : any) {
    // Loop through each key in the object
    for (let key in params) {
      // If the value is undefined, replace it with null
      if (params[key] === undefined) {
        params[key] = null;
      }
      // Optionally, if you want to treat empty strings as null, uncomment this:
      if (params[key] === '') {
        params[key] = null;
      }
    }
    return params
  }

export async function PUT(req: any, { params }: { params: { id: string } }) {
    // Di ko linagay
    //
    // Windows = :Windows, 
    // Mac = :Mac, 
    // Linux = :Linux, 
    // 
    // dahil need pa ng react magic sa front end
    try {
        const { id } = await params; 
        const body = await req.json()

        const sanitizedParam = sanitizeParams(body, id)

        const sql = `UPDATE steamgames
            SET \`Name\` = ?, 
            \`Release_date\` = ?, 
            \`Estimated_owners\` = ?, 
            \`Peak_CCU\` = ?, 
            \`Required_age\` = ?, 
            \`Price\` = ?, 
            \`DiscountDLC_count\` = ?, 
            \`About_the_game\` = ?, 
            \`Supported_languages\` = ?, 
            \`Full_audio_languages\` = ?, 
            \`Reviews\` = ?, 
            \`Header_image\` = ?, 
            \`Website\` = ?, 
            \`Support_url\` = ?, 
            \`Support_email\` = ?, 
            \`Metacritic_score\` = ?, 
            \`Metacritic_url\` = ?, 
            \`User_score\` = ?, 
            \`Positive\` = ?, 
            \`Negative\` = ?, 
            \`Score_rank\` = ?, 
            \`Achievements\` = ?, 
            \`Recommendations\` = ?, 
            \`Notes\` = ?, 
            \`Average_playtime_forever\` = ?, 
            \`Average_playtime_two_weeks\` = ?, 
            \`Median_playtime_forever\` = ?, 
            \`Median_playtime_two_weeks\` = ?, 
            \`Developers\` = ?, 
            \`Publishers\` = ?, 
            \`Categories\` = ?, 
            \`Genres\` = ?, 
            \`Tags\` = ?, 
            \`Screenshots\` = ?, 
            \`Movies\` = ?
            WHERE \`AppID\` = ?;
        `

        const qparam = [
            sanitizedParam.Name,
            sanitizedParam.Release_date,
            sanitizedParam.Estimated_owners,
            sanitizedParam.Peak_CCU,
            sanitizedParam.Required_age,
            sanitizedParam.Price,
            sanitizedParam.DiscountDLC_count,
            sanitizedParam.About_the_game,
            sanitizedParam.Supported_languages,
            sanitizedParam.Full_audio_languages,
            sanitizedParam.Reviews,
            sanitizedParam.Header_image,
            sanitizedParam.Website,
            sanitizedParam.Support_url,
            sanitizedParam.Support_email,
            sanitizedParam.Metacritic_score,
            sanitizedParam.Metacritic_url,
            sanitizedParam.User_score,
            sanitizedParam.Positive,
            sanitizedParam.Negative,
            sanitizedParam.Score_rank,
            sanitizedParam.Achievements,
            sanitizedParam.Recommendations,
            sanitizedParam.Notes,
            sanitizedParam.Average_playtime_forever,
            sanitizedParam.Average_playtime_two_weeks,
            sanitizedParam.Median_playtime_forever,
            sanitizedParam.Median_playtime_two_weeks,
            sanitizedParam.Developers,
            sanitizedParam.Publishers,
            sanitizedParam.Categories,
            sanitizedParam.Genres,
            sanitizedParam.Tags,
            sanitizedParam.Screenshots,
            sanitizedParam.Movies,
            id
        ]

        await pool.query(sql, qparam)
    
        return NextResponse.json( { success : true }, { status : 200 })
    } catch (err) {
        console.log(err)
        return NextResponse.json( { success : false, err }, { status : 500 })
    }
}

export async function DELETE(req: any, { params }: { params: { id: string } }) {
    try {
        const { id } = await params

        await pool.execute(`DELETE FROM steamgames WHERE AppID = ${id}`)
        return NextResponse.json( { success : true }, { status : 200 })
    } catch (err) {
        console.log(err)
        return NextResponse.json( { success : false, err }, { status : 500 })
    }
}