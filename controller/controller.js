const { pool } = require("../database/db.js")


exports.getHome = async (req, res) => {
    const [rows] = await pool.query('SELECT AppID, Name, Release_date FROM steamgames ORDER BY Release_date DESC LIMIT 10')
    const [q2] = await pool.query('SELECT COUNT(*) AS count FROM steamgames')
    const count = q2[0]?.count

    try {
        rows.forEach(row => {
            if (row.Release_date) {
                // Ensure Release_date is parsed as UTC
                const releaseDate = new Date(row.Release_date + 'Z');  // Append 'Z' to mark it as UTC
                row.Release_date = releaseDate.toISOString().split('T')[0];
            }
        });
        res.render('home/home', { rows, count });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

exports.getGames = async (req, res) => {
    try {
        const { query } = await req.params
        const search = query.slice(0, -1).replace("+", " ")
        const [rows] = await pool.query(`SELECT AppID, Name, Release_date FROM steamgames WHERE Name LIKE '%${search}%' OR AppID='${search}';`)

        rows.forEach(row => {
            if (row.Release_date) {
                // Ensure Release_date is parsed as UTC
                const releaseDate = new Date(row.Release_date + 'Z');  // Append 'Z' to mark it as UTC
                row.Release_date = releaseDate.toISOString().split('T')[0];
            }
        });

        res.render('search/search', { rows, count: rows.length });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}

exports.getSingleGame = async (req, res) => {
    try {
        const { id } = await req.params; 
        const [rows] = await pool.query('SELECT * FROM steamgames WHERE AppID = ' + id)

        rows.forEach(row => {
            if (row.Release_date) {
                // Ensure Release_date is parsed as UTC
                const releaseDate = new Date(row.Release_date + 'Z');  // Append 'Z' to mark it as UTC
                row.Release_date = releaseDate.toISOString().split('T')[0];
            }
        });

        res.render('edit/edit', { data : rows[0] });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

function sanitizeParams(params, id) {
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

exports.editGame = async (req, res) => {
    // Di ko linagay
    //
    // Windows = :Windows, 
    // Mac = :Mac, 
    // Linux = :Linux, 
    // 
    // dahil need pa ng react magic sa front end
    try {
        const { id } = await req.params; 
        const { body } = await req

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
    
        return res.status(200).json( { success : true })
    } catch (err) {
        console.log(err)
        return res.status(500).json( { success : false, err })
    }
}

exports.deleteGame = async (req, res) => {
    try {
        res.status(200).json({ success : true })
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}