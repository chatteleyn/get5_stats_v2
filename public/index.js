async function generateMatchesListTable(){
    //Generate a HTML table with the matches list

    var data = await getData("/api_matches_list");
    var matchesHTMLTable = document.querySelector("#matches-list-table");
    data.forEach(match => {
        var row = newElement("tr",undefined,"table-row",matchesHTMLTable);
        var score = twoDigits(match.team1_score) + " - " + twoDigits(match.team2_score)
        var startTime = dateStringify(new Date(match.start_time));
        var link = newElement("a","[+]");
        link.href = "/match?id="+match.matchid;
        newElement("td",match.matchid,undefined,row);
        newElement("td",match.team1_name,undefined,row);
        newElement("td",score,undefined,row);
        newElement("td",match.team2_name,undefined,row);
        newElement("td",match.mapname,undefined,row);
        newElement("td",startTime,undefined,row);
        newElement("td",undefined,undefined,row,link);
    })
}

async function generatePlayersListTable(){
    //Generate a HTML table with the players list

    var data = await getData("/api_players_list");
    var playersHTMLTable = document.querySelector("#players-list-table");
    data.forEach(player => {
        var row = newElement("tr",undefined,"table-row",playersHTMLTable);
        var link = newElement("a","[+]");
        link.href = "/player?id="+player.steamid64;
        newElement("td",player.name,undefined,row);
        newElement("td",player.steamid64,undefined,row);
        newElement("td",player.matches_played,undefined,row);
        newElement("td",player.rounds_played,undefined,row);
        newElement("td",undefined,undefined,row,link);
    })
}

async function generateTeamsListTable(){
    //Generate a HTML table with the teams list

    var data = await getData("/api_teams_list");
    console.log(data)
    var teamsHTMLTable = document.querySelector("#teams-list-table");
    data.forEach(team => {
        var row = newElement("tr",undefined,"table-row",teamsHTMLTable);
        var link = newElement("a","[+]");
        link.href = "/team?id="+team.team_name;
        newElement("td",team.team_name,undefined,row);
        newElement("td",team.matches,undefined,row);
        newElement("td",team.win,undefined,row);
        newElement("td",team.lose,undefined,row);
        newElement("td",undefined,undefined,row,link);
    })
}

generateMatchesListTable();
generatePlayersListTable();
generateTeamsListTable();