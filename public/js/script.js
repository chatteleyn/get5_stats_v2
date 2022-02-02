function twoDigits(number){
    //Add a 0 at the beginning of one digit numbers

    return number >= 10 ? number : "0" + number;
}

function dateStringify(date){
    year = twoDigits(date.getFullYear());
    month = twoDigits(date.getMonth());
    day = twoDigits(date.getDay());
    month = twoDigits(date.getMonth());
    hours = twoDigits(date.getHours());
    minutes = twoDigits(date.getMinutes());

    return day + "/" + month + "/" + year + " " + hours + ":" + minutes
}

function newElement(type="p",content=undefined,cssClass=undefined,parent=document.body,child=undefined){
    //Create HTML elements quickly

    var element = document.createElement(type);
    if(typeof content != "undefined") element.innerHTML = String(content);
    if(typeof cssClass == "string") element.classList.add(cssClass);
    else if(typeof cssClass == "object"){
        cssClass.forEach(i => {
            element.classList.add(i);
        })
    }
    if(parent) parent.appendChild(element);
    if(child) element.appendChild(child);
    return element;
}

function getUrlVars(){
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

async function getData(api){
    //Fetch data from the db

    var response = await fetch(api);
    var data = await response.json();
    if(!data.error){
        return data;
    }
    else{
        document.write("Error\n");
    }
}