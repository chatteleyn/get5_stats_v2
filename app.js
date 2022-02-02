var connexionInfos = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'get5'
};

var express = require('express');
var mysql = require('mysql');
var app = express();
var port = 8000;

app.use(express.static("public"));
app.use(express.json({limit:"1mb"}));

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});

app.get("/api_matches_list", (req,res) => {
    var db = mysql.createConnection(connexionInfos);
    db.connect(error => {
        if(error) console.log("Error: Connection to the database failed");
        else{
            var qry = "SELECT mt.matchid,mt.team1_name,mt.team1_score,mt.team2_name,mt.team2_score,mt.start_time,mp.mapname FROM get5_stats_matches mt LEFT JOIN get5_stats_maps mp ON mt.matchid = mp.matchid ORDER BY start_time;";
            db.query(qry, (error,result) => {
                if(error) res.json({ "error": error });
                else{
                    res.json(result)
                }
            });
        }
    });
});

app.get("/api_players_list", (req,res) => {
    var db = mysql.createConnection(connexionInfos);
    db.connect(error => {
        if(error) console.log("Error: Connection to the database failed");
        else{
            var qry = "SELECT pl.name,pl.steamid64,pl.rounds_played,count(*) matches_played FROM get5_stats_players pl GROUP BY pl.steamid64 ORDER BY pl.name;";
            db.query(qry, (error,result) => {
                if(error) res.json({ "error": error });
                else{
                    res.json(result)
                }
            });
        }
    });
});

app.get("/api_teams_list", (req,res) => {
    var db = mysql.createConnection(connexionInfos);
    db.connect(error => {
        if(error) console.log("Error: Connection to the database failed");
        else{
            var qry = "SELECT tm.team_name,count(*) matches,count(tm.won) win,count(*)-count(tm.won) lose FROM get5_stats_matches mt, (SELECT team1_name team_name,if(winner='team1',1,null) won FROM get5_stats_matches UNION SELECT team2_name team_name,if(winner='team2',1,null) won FROM get5_stats_matches) tm WHERE mt.team1_name = tm.team_name OR mt.team2_name = tm.team_name GROUP BY tm.team_name ORDER BY team_name;";
            db.query(qry, (error,result) => {
                if(error) res.json({ "error": error });
                else{
                    res.json(result)
                }
            });
        }
    });
});

app.get("/api_match_infos", (req,res) => {
    var matchid = req.query.id;
    var db = mysql.createConnection(connexionInfos);
    db.connect(error => {
        if(error) console.log("Error: Connection to the database failed");
        else{
            var qry = "SELECT * FROM get5_stats_matches mt,get5_stats_maps mp WHERE mt.matchid=mp.matchid AND mt.matchid="+matchid+";";
            db.query(qry, (error,result) => {
                if(error) res.json({ "error": error });
                else{
                    res.json(result);
                }
            });
        }
    });
});

app.get("/api_match_stats", (req,res) => {
    var matchid = req.query.id;
    var db = mysql.createConnection(connexionInfos);
    db.connect(error => {
        if(error) console.log("Error: Connection to the database failed");
        else{
            var qry = "SELECT * FROM get5_stats_players WHERE matchid="+matchid+";";
            db.query(qry, (error,result) => {
                if(error) res.json({ "error": error });
                else{
                    res.json(result);
                }
            });
        }
    });
});

app.get("/api_player_infos", (req,res) => {
    var steamid = req.query.id;
    var db = mysql.createConnection(connexionInfos);
    db.connect(error => {
        if(error) console.log("Error: Connection to the database failed");
        else{
            var qry = "SELECT pl.name, sum(pl.kills) kills,sum(pl.deaths) deaths, sum(pl.assists) assists, sum(pl.headshot_kills) headshots, count(*) matches, count(if(mt.winner=pl.team,1,null)) won , count(*)-count(if(mt.winner=pl.team,1,null)) lost FROM get5_stats_players pl,get5_stats_matches mt WHERE pl.matchid=mt.matchid AND pl.steamid64="+steamid+";";
            db.query(qry, (error,result) => {
                if(error) res.json({ "error": error });
                else{
                    res.json(result)
                }
            });
        }
    });
});