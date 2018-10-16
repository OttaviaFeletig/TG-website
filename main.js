function getColumnsHtml(politician, checkBoxes, selected) {
   console.log(selected);
    console.log(checkBoxes);
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
    var nonRepeatedStates = [];
    for(var i = 0; i < states.length; i++){
        for (var h = i + 1; h < states.length; h++){
            if(states[i].state !== states[h].state){
                if(!nonRepeatedStates.includes(states[i].state)){
                    nonRepeatedStates.push(states[i].state);
                }
            }
        }
    } 
    nonRepeatedStates.sort();
    console.log(nonRepeatedStates);
    
    return '<option value="">All the States</option>' + nonRepeatedStates
    .map(x => {
        
        //return '<option value="' + x + '">' + x + "</option>";
        return `<option value="${x}">${x}</option>`;
    }).join("")  
}

function renderStateList(data) { 
    document.getElementById("state").innerHTML = getStateList(data.results[0].members);
}
renderStateList(data);


function renderColumnsHtml(data) { 
    document.getElementById("table-rows").innerHTML = getColumnsHtml(data.results[0].members, [], "");
}
renderColumnsHtml(data);

function filter(){
    var checkBox = Array.from(document.querySelectorAll('input[name=party]:checked')).map(x => x.value);   
    var select = document.querySelector('#state').value;
    document.getElementById("table-rows").innerHTML = getColumnsHtml(data.results[0].members, checkBox, select);
    
}
filter();







//function getColumnsHtml(politician, checkBoxes, selected) {
//
//    var newArray = [];
//
//    if (checkBoxes.length == 0 && selected == "") {
//        newArray = politician;
//    } else if (checkBoxes.length == 0) {
//        politician.forEach(oneObj => {
//            if (selected.includes(oneObj.state)) {
//                newArray.push(oneObj);
//            }
//        })
//    } else if (selected == "") {
//        politician.forEach(oneObj => {
//            if (checkBoxes.includes(oneObj.party)) {
//                newArray.push(oneObj);
//            }
//        })
//    } else {
//        politician.forEach(oneObj => {
//            if (checkBoxes.includes(oneObj.party) && selected.includes(oneObj.state)) {
//                newArray.push(oneObj);
//            }
//        })
//    }
//    return newArray
//        .map(element => {
//            if (element.middle_name == null) {
//                element.middle_name = "";
//            }
//            return `<tr><td><a href=${element.url} target='_blank'>${element.last_name} ${element.middle_name} ${element.first_name}</a></td><td>${element.party}</td><td>${element.state}</td><td>${element.seniority}</td><td>${element.votes_with_party_pct} %</td></tr>`;
//
//        }).join("")
//}
//
//function getStateList(states, checkedBox) {
//    console.log(checkedBox);
//    var nonRepeatedStates = [];
//    for (var i = 0; i < states.length; i++) {
//        for (var h = i + 1; h < states.length; h++) {
//            if (states[i].state !== states[h].state) {
//                if (!nonRepeatedStates.includes(states[i].state)) {
//                    if (checkedBox.length == 0) {
//                        
//                            nonRepeatedStates.push(states[i].state);
//                        
//                    } else {
//                        nonRepeatedStates.length = 0;
//                        for (var g = 0; g < states.length; g++){
//                            //here i repeat the check on the array -- not good
//                            if (checkedBox.includes(states[g].party) && !nonRepeatedStates.includes(states[g].state)) {
//                                nonRepeatedStates.push(states[g].state);
//                            }
//                        }
//                            
//                        
//                    }
//                }
//            }
//        }
//    }
//    nonRepeatedStates.sort();
//
//    console.log(nonRepeatedStates);
//
//    return '<option value="">All the States</option>' + nonRepeatedStates
//        .map(x => {
//
//            //return '<option value="' + x + '">' + x + "</option>";
//            return `<option value="${x}">${x}</option>`;
//        })
//    document.getElementById("state").innerHTML = getStateList(nonRepeatedStates);
//}
//
//function renderStateList(data) {
//    document.getElementById("state").innerHTML = getStateList(data.results[0].members, []);
//}
//renderStateList(data);
//
//
//function renderColumnsHtml(data) {
//    document.getElementById("table-rows").innerHTML = getColumnsHtml(data.results[0].members, [], "");
//}
//renderColumnsHtml(data);
//
//function filter() {
//    var checkBox = Array.from(document.querySelectorAll('input[name=party]:checked')).map(x => x.value);
//    var select = document.querySelector('#state').value;
//    document.getElementById("table-rows").innerHTML = getColumnsHtml(data.results[0].members, checkBox, select);
//    getStateList(data.results[0].members, checkBox);
//}
//filter();












