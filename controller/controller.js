const { pool } = require("../database/db.js")

const shards = {
    '1': 'http://ccscloud.dlsu.edu.ph:22250',
    '2': 'http://ccscloud.dlsu.edu.ph:22260',
    '3': 'http://ccscloud.dlsu.edu.ph:22270',
};

exports.getHome = async (req, res) => {
    const cookieValue = req.cookies.shard || '1';;

    if (!req.cookies.shard) {
        res.cookie('shard', '1');
    }

    console.log(shards[cookieValue])
    try {

        const response = await fetch(`${shards[cookieValue]}/getTopEntries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.log('Failed to fetch data from main server');
            res.redirect('/404');
        }
        const rows = await response.json();

        const countRes = await fetch(`${shards[cookieValue]}/getCount`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const countjson = await countRes.json();
        const count = countjson[0]['COUNT(*)'];

        try {
            rows.forEach(row => {
                if (row.Release_date) {
                    // Ensure Release_date is parsed as UTC
                    const releaseDate = new Date(row.Release_date);  // Append 'Z' to mark it as UTC
                    row.Release_date = releaseDate.toISOString().split('T')[0];
                }
            });
            res.render('home/home', { rows, count });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    } catch (e) {
        res.redirect('/404');
    }
}

exports.setNode = (req, res) => {
    const { node } = req.params;

    if (!['1', '2', '3'].includes(node)) {
        return res.status(400).send('Invalid node value.');
    }

    res.cookie('shard', node);
    res.status(200).json({ status: 200, message: 'Cookie set successfully' });
};

exports.getGames = async (req, res) => {
    try {
        const cookieValue = req.cookies.shard || '1';;

        if (!req.cookies.shard) {
            res.cookie('shard', '1');
        }

        const { query } = await req.params
        const response = await fetch(`${shards[cookieValue]}/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query })
        });

        const rows = await response.json();

        rows.forEach(row => {
            if (row.Release_date) {
                // Ensure Release_date is parsed as UTC
                const releaseDate = new Date(row.Release_date);  // Append 'Z' to mark it as UTC
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
        const cookieValue = req.cookies.shard || '1';;

        if (!req.cookies.shard) {
            res.cookie('shard', '1');
        }

        const { id } = await req.params;
        const response = await fetch(`${shards[cookieValue]}/getSingleGame`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ AppID: id })
        });

        let rows = await response.json();
        rows[0]['Release_date'] = new Date(rows[0]['Release_date']).toISOString().split('T')[0];

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Game not found' });
        } else {
            res.render('edit/edit', { data: rows[0] });
        }
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
        const cookieValue = req.cookies.shard || '1';;

        if (!req.cookies.shard) {
            res.cookie('shard', '1');
        }

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

        const original_date = body.original_date

        const response = await fetch(`${shards[cookieValue]}/updateEntry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sql, qparam, sanitizedParam, id })
        });

        const data = await response.json();
        console.log(data)

        return res.status(200).json({ success: true })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, err })
    }
}

exports.deleteGame = async (req, res) => {
    try {
        const cookieValue = req.cookies.shard || '1';;

        if (!req.cookies.shard) {
            res.cookie('shard', '1');
        }

        const { id } = await req.params;
        const response = await fetch(`${shards[cookieValue]}/deleteEntry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ AppID: id })
        });

        const data = await response.json();
        console.log(data)
        res.status(200).json({ success: true })
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

exports.get404 = (req, res) => {
    res.render('404/notfound');
}

exports.sync = async (req, res) => {
    try {
        const cookieValue = req.cookies.shard || '1';
        const response = await fetch(`${shards[cookieValue]}/sync`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.log('Failed to sync data');
            res.redirect('/404');
        } else {
            let data = await response.json();
            console.log(data);
            if (cookieValue == 1) {
                if (data.node2 === "Synced" && data.node3 === "Synced") {
                    res.status(200).json({ message: "Synced All Nodes Successfully" });
                } else if (data.node2 === "Failed" && data.node3 === "Failed") {
                    res.status(200).json({ message: "Failed to sync Node 2 and Node 3" });
                } else if (data.node2 === "Failed" && data.node3 === "Synced") {
                    res.status(200).json({ message: "Synced Node 3 Successfully but failed to sync Node 2" });
                } else if (data.node2 === "Synced" && data.node3 === "Failed") {
                    res.status(200).json({ message: "Synced Node 2 Successfully but failed to sync Node 3" });
                } else {
                    res.status(500).json({ message: "Server Error" });
                }
            } else {
                if (data.success) {
                    res.status(200).json({ message: "Synced Central Node Successfully" });
                }
                else {
                    res.status(200).json({ message: "Failed to sync Central Node" });
                }
            }
        }
    } catch (e) {
        console.log("Error: ", e);
        res.redirect('/404');
    }
}
