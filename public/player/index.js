var configKdChart = {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [],
        backgroundColor: [
          'rgb(0, 255, 0)',
          'rgb(255, 0, 0)'
          ],
        hoverOffset: 4
      }]
    },
    options: {
      tooltips: {enabled: false},
      hover: {mode: null},
    }
};

async function generatePlayerStats(){
    var infos = await getData("/api_player_infos?id="+getUrlVars()["id"]);
    document.querySelector("#player-name").innerHTML = infos[0].name;
    document.querySelector("#kd-value").innerHTML = (infos[0].kills / infos[0].deaths).toFixed(2);
    configKdChart.data.datasets[0].data = [infos[0].kills,infos[0].deaths];
    new Chart("kd-chart-canvas",configKdChart);
    document.querySelector("#winrate-value").innerHTML = (infos[0].won*100/infos[0].matches).toFixed(0) + "%";
    document.querySelector("#matches").innerHTML = infos[0].matches;
    document.querySelector("#won").innerHTML = infos[0].won;
    document.querySelector("#lost").innerHTML = infos[0].lost;
    document.querySelector("#hs-value").innerHTML = (infos[0].headshots*100/infos[0].kills).toFixed(0) + "%";
    document.querySelector("#kills").innerHTML = infos[0].kills;
    document.querySelector("#deaths").innerHTML = infos[0].deaths;
    document.querySelector("#assists").innerHTML = infos[0].assists;
    document.querySelector("#hs").innerHTML = infos[0].headshots;
}

generatePlayerStats();