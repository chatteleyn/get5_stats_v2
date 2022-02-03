var wrappers = {
    "special":"3",
    "bomb":"2",
    "fk":"4",
    "vx":"5",
    "xk":"4"
}

function ratingCalculator(player){
    var impact = 2.13*(player.kills/player.rounds_played)+0.42*(player.assists/player.rounds_played)-0.41;
    var rating = 0.0073*player.kast+0.3591*(player.kills/player.rounds_played)-0.5329*(player.deaths/player.rounds_played)+0.2372*impact+0.0032*(player.damage/player.rounds_played)+0.1587;

    return rating;
}

function hideElements(){
    document.querySelectorAll(".unwrap").forEach(element => {
        element.style.visibility = "hidden";
        element.hidden = true;
    });
}

function cellWrapper(wrapper,name,table){
    if(wrapper.classList.contains("wrapped")){
        wrapper.colSpan = wrappers[name];
        wrapper.classList.remove("wrapped");
        table.querySelectorAll(".unwrap."+name).forEach(element => {
            element.style.visibility = "visible";
            element.hidden = false;
        })
        table.querySelectorAll(".wrap."+name).forEach(element => {
            element.style.visibility = "hidden";
            element.hidden = true;
        })
    }
    else{
        wrapper.colSpan = "1";
        wrapper.classList.add("wrapped");
        table.querySelectorAll(".unwrap."+name).forEach(element => {
            element.style.visibility = "hidden";
            element.hidden = true;
        })
        table.querySelectorAll(".wrap."+name).forEach(element => {
            element.style.visibility = "visible";
            element.hidden = false;
        })
    }
}

async function generateMatchStats(){
    try{
        var infos = await getData("/api_match_infos?id="+getUrlVars()["id"]);
    }
    catch(e){
        console.log(e);
    }
    document.querySelector("#team1-name").innerHTML = infos[0].team1_name;
    document.querySelector("#team1-score").innerHTML = infos[0].team1_score;
    document.querySelector("#team2-name").innerHTML = infos[0].team2_name;
    document.querySelector("#team2-score").innerHTML = infos[0].team2_score;
    document.querySelector("#map-name").innerHTML = infos[0].mapname;
    document.querySelector("#match-date").innerHTML = dateStringify(new Date(infos[0].start_time));
    document.querySelector("#team1-name-small").innerHTML = infos[0].team1_name;
    document.querySelector("#team2-name-small").innerHTML = infos[0].team2_name;
    
    
    var stats = await getData("/api_match_stats?id="+getUrlVars()["id"])
    var team1HTMLTable = document.querySelector("#team1-stats-table");
    var team2HTMLTable = document.querySelector("#team2-stats-table");

    if(infos[0].winner == "team1"){
        document.querySelector("#team1-table-head").classList.add("green-background");
        document.querySelector("#team1-score").classList.add("green");
        //document.querySelector("#team2-table-head").classList.add("red-background");
        document.querySelector("#team2-score").classList.add("red");
    }
    else{
        document.querySelector("#team1-table-head").classList.add("red-background");
        document.querySelector("#team1-score").classList.add("red");
        //document.querySelector("#team2-table-head").classList.add("green-background");
        document.querySelector("#team2-score").classList.add("green");
    }

    team1HTMLTable.querySelectorAll(".wrapper").forEach(wrapper => {
        Object.keys(wrappers).forEach(key =>{
            if(wrapper.classList.contains(key)){
                wrapper.addEventListener("click", () => {
                    cellWrapper(wrapper,key,team1HTMLTable);
                });
            };
        });
    });

    team2HTMLTable.querySelectorAll(".wrapper").forEach(wrapper => {
        Object.keys(wrappers).forEach(key =>{
            if(wrapper.classList.contains(key)){
                wrapper.addEventListener("click", () => {
                    cellWrapper(wrapper,key,team2HTMLTable);
                });
            };
        });
    });

    stats.forEach(player => {
        if(player.team == "team1") var row = newElement("tr",undefined,"table-row",team1HTMLTable);
        else var row = newElement("tr",undefined,"table-row",team2HTMLTable);
        newElement("td",player.name,undefined,row);
        newElement("td",player.kills,undefined,row);
        newElement("td",player.deaths,undefined,row);
        newElement("td",player.assists,undefined,row);
        if(player.kills-player.deaths >= 0) newElement("td",player.kills-player.deaths,"green",row);
        else newElement("td",player.kills-player.deaths,"red",row);
        newElement("td",(player.kills/player.deaths).toFixed(2),undefined,row);
        newElement("td",(player.headshot_kills*100/player.kills).toFixed(0)+"%",undefined,row);
        newElement("td",(player.damage/player.rounds_played).toFixed(1),undefined,row);
        newElement("td",player.kast+"%",undefined,row);
        var rating = ratingCalculator(player);
        var cell = newElement("td","",undefined,row)
        if(rating >= 1) newElement("div",ratingCalculator(player).toFixed(2),["rating","green-background"],cell);
        else newElement("div",ratingCalculator(player).toFixed(2),["rating","red-background"],cell);
        newElement("td",player.enemies_flashed,undefined,row);
        newElement("td",player.flashbang_assists,["special","unwrap"],row);
        newElement("td",player.utility_damage,["special","unwrap"],row);
        newElement("td",player.bomb_plants,"bomb",row);
        newElement("td",player.bomb_defuses,["bomb","unwrap"],row);
        newElement("td",(player.firstkill_t+player.firstkill_ct)-(player.firstdeath_t+player.firstdeath_ct),["fk","wrap"],row);
        newElement("td",player.firstkill_t,["fk","unwrap"],row);
        newElement("td",player.firstkill_ct,["fk","unwrap"],row);
        newElement("td",player.firstdeath_t,["fk","unwrap"],row);
        newElement("td",player.firstdeath_ct,["fk","unwrap"],row);
        newElement("td",player.v1+player.v2+player.v3+player.v4+player.v5,["vx","wrap"],row);
        newElement("td",player.v1,["vx","unwrap"],row);
        newElement("td",player.v2,["vx","unwrap"],row);
        newElement("td",player.v3,["vx","unwrap"],row);
        newElement("td",player.v4,["vx","unwrap"],row);
        newElement("td",player.v5,["vx","unwrap"],row);
        newElement("td",player["3k"]+player["4k"]+player["5k"],["xk","wrap"],row);
        newElement("td",player["2k"],["xk","unwrap"],row);
        newElement("td",player["3k"],["xk","unwrap"],row);
        newElement("td",player["4k"],["xk","unwrap"],row);
        newElement("td",player["5k"],["xk","unwrap"],row);
    })
    
    hideElements();
}

generateMatchStats()