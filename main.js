function getColumnsHtml(politician, checkBoxes, selected) {
    var newArray = [];
    
    if (checkBoxes.length == 0 && selected == ""){
        newArray = politician;
    } else if (checkBoxes.length == 0){
        politician.forEach(oneObj =>{
            if(selected.includes(oneObj.state)){
                newArray.push(oneObj);
            }
        })
    } else if(selected == ""){
        politician.forEach(oneObj =>{
            if(checkBoxes.includes(oneObj.party)){
                newArray.push(oneObj);
            }
        })
    } else {
        politician.forEach(oneObj =>{
            if(checkBoxes.includes(oneObj.party) && selected.includes(oneObj.state)){
                newArray.push(oneObj);
            }
        })
    }
    return newArray
        .map(element => {
                if(element.middle_name == null){
                    element.middle_name = "";
                } 
                    return `<tr><td><a href=${element.url} target='_blank'>${element.last_name} ${element.middle_name} ${element.first_name}</a></td><td>${element.party}</td><td>${element.state}</td><td>${element.seniority}</td><td>${element.votes_with_party_pct} %</td></tr>`;
                               
       }).join("")       
}

function getStateList (states) {
    let allStates = states.map(state => state.state);

    let nonRepeatedStates = allStates.sort().reduce((init, current) => {
        if(init.length == 0 || init[init.length - 1] != current){
            init.push(current);
        }
        return init;
    }, []);
    
    return '<option value="">All the States</option>' + nonRepeatedStates
    .map(x => {

        return `<option value="${x}">${x}</option>`;
    }).join("")  
}

function renderStateList(data) {
    document.getElementById("state").innerHTML = getStateList(data);
}

function renderColumnsHtml(data) { 
    document.getElementById("table-rows").innerHTML = getColumnsHtml(data, [], "");
}

function filter(members){
    
    console.log("members" + members);
    var checkBox = Array.from(document.querySelectorAll('input[name=party]:checked')).map(x => x.value);   
    var select = document.querySelector('#state').value;
    document.getElementById("table-rows").innerHTML = getColumnsHtml(members, checkBox, select);
}
