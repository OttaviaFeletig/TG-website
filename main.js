var senateData = new Vue ({
    
   el: '#table-and-filters',
    data: {
        senators: {},
        checkedParty: [],
    },
    computed: {
        filter: function () {
            if(!this.checkedParty.length) {
                return this.senators; 
            } else {
               return this.senators.filter(x => this.checkedParty.includes(x.party));
            }
        }
    } 
    
});









//function getColumnsHtml(politician, checkBoxes, selected) {
//   console.log(selected);
//    console.log(checkBoxes);
//    var newArray = [];
//    
//    if (checkBoxes.length == 0 && selected == ""){
//        newArray = politician;
//    } else if (checkBoxes.length == 0){
//        politician.forEach(oneObj =>{
//            if(selected.includes(oneObj.state)){
//                newArray.push(oneObj);
//            }
//        })
//    } else if(selected == ""){
//        politician.forEach(oneObj =>{
//            if(checkBoxes.includes(oneObj.party)){
//                newArray.push(oneObj);
//            }
//        })
//    } else {
//        politician.forEach(oneObj =>{
//            if(checkBoxes.includes(oneObj.party) && selected.includes(oneObj.state)){
//                newArray.push(oneObj);
//            }
//        })
//    }
//    return newArray
//        .map(element => {
//                if(element.middle_name == null){
//                    element.middle_name = "";
//                } 
//                    return `<tr><td><a href=${element.url} target='_blank'>${element.last_name} ${element.middle_name} ${element.first_name}</a></td><td>${element.party}</td><td>${element.state}</td><td>${element.seniority}</td><td>${element.votes_with_party_pct} %</td></tr>`;
//                               
//       }).join("")       
//}
//
//function getStateList (states) { 
//    var nonRepeatedStates = [];
//    for(var i = 0; i < states.length; i++){
//        for (var h = i + 1; h < states.length; h++){
//            if(states[i].state !== states[h].state){
//                if(!nonRepeatedStates.includes(states[i].state)){
//                    nonRepeatedStates.push(states[i].state);
//                }
//            }
//        }
//    } 
//    nonRepeatedStates.sort();
//    console.log(nonRepeatedStates);
//    
//    return '<option value="">All the States</option>' + nonRepeatedStates
//    .map(x => {
//        
//        //return '<option value="' + x + '">' + x + "</option>";
//        return `<option value="${x}">${x}</option>`;
//    }).join("")  
//}
//
//function renderStateList(data) { 
//    document.getElementById("state").innerHTML = getStateList(data);
//}
//
//
//
//function renderColumnsHtml(data) { 
//    document.getElementById("table-rows").innerHTML = getColumnsHtml(data, [], "");
//}
//
//
//function filter(members){
//    
//    console.log("members" + members);
//    var checkBox = Array.from(document.querySelectorAll('input[name=party]:checked')).map(x => x.value);   
//    var select = document.querySelector('#state').value;
//    document.getElementById("table-rows").innerHTML = getColumnsHtml(members, checkBox, select);
//    
//}








//function getColumnsHtml(politician, checkBoxes, selected) {
//
//    var newArray = [];
//
//    //    if (checkBoxes.length == 0 && selected == ""){
//    //        newArray = politician;
//    //    } 
//    //    
//    //    else if (checkBoxes.length == 0 ){
//    //        politician.forEach(oneObj =>{
//    //            if(selected.includes(oneObj.state)){
//    //                newArray.push(oneObj);
//    //            }
//    //        })
//    //    } else if(selected == ""){
//    //        politician.forEach(oneObj =>{
//    //            if(checkBoxes.includes(oneObj.party)){
//    //                newArray.push(oneObj);
//    //            }
//    //        })
//    //    } 
//    //    else {
//    //        politician.forEach(oneObj =>{
//    //            if(checkBoxes.includes(oneObj.party) && selected.includes(oneObj.state)){
//    //                newArray.push(oneObj);
//    //            }
//    //        })
//    //    }
//
//    if (checkBoxes.length == 0 && selected == "") {
//        newArray = politician;
//    } else if (checkBoxes.length == 0 || selected == "") {
//        politician.forEach(oneObj => {
//            if (selected.includes(oneObj.state) || checkBoxes.includes(oneObj.party)) {
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
//
//
//
//
//
//
//
//    console.log(newArray);
//
//
//
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
//    console.log("This is da checbox: " + checkedBox.length);
//    var nonRepeatedStates = [];
//
//    if (checkedBox.length == 0) {
//        for (var i = 0; i < states.length; i++) {
//            for (var h = i + 1; h < states.length; h++) {
//                if (states[i].state !== states[h].state) {
//                    if (!nonRepeatedStates.includes(states[i].state)) {
//
//                        nonRepeatedStates.push(states[i].state);
//
//                    }
//                }
//            }
//        }
//    } else {
//
//        for(var i = 0; i < states.length; i++){
//            if(checkedBox.includes(states[i].party) && !nonRepeatedStates.includes(states[i].state)){
//                nonRepeatedStates.push(states[i].state)
//            }
//        }
//    }
//
//    
//    //nonRepeatedStates = [];
//    //                        for (var g = 0; g < states.length; g++){
//    //                            //here i repeat the check on the array -- not good
//    //                            if (checkedBox.includes(states[g].party) && !nonRepeatedStates.includes(states[g].state)) {
//    //                                nonRepeatedStates.push(states[g].state);
//    //                            }
//    //                        }
//
//
//
//    nonRepeatedStates.sort();
//
//    console.log(nonRepeatedStates);
//    document.getElementById("state").innerHTML = '<option value="">All the States</option>' + nonRepeatedStates
//        .map(x => `<option value="${x}">${x}</option>`)
//}
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
//    console.log("ottavia " + checkBox.length)
//    getStateList(data.results[0].members, checkBox);
//}
//filter();
