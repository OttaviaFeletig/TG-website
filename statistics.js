//STATISTICS

//var a = 1 + 2;
//console.log(a);
//
//var b = "1" + "2";
//console.log(b);
//
//var c = 1 + "2";
//console.log(c);
//
//var d = "1" + 2;
//console.log(d);
//
//var e = + "2";
//console.log(e);
//
//var f = "" + 2;
//console.log(f);
//
//var g = + "abc";
//console.log(g);



function getMembersPartyList(object) {

    var republicansMembersList = [];
    var democraticsMembersList = [];
    var independentsMembersList = [];

    var listMembers = object.forEach(x => {
        if (x.party.includes("R")) {
            republicansMembersList.push(x);
        } else if (x.party.includes("D")) {
            democraticsMembersList.push(x);
        } else {
            independentsMembersList.push(x);
        }
    });

    getTheNumberOfMembers(republicansMembersList, democraticsMembersList, independentsMembersList);
    calculateAverageVotesWithParty(republicansMembersList, democraticsMembersList, independentsMembersList);
}
getMembersPartyList(data.results[0].members);


function getTheNumberOfMembers(republicansArray, democraticsArray, independentsArray) {

    var republicansMembersNumber = republicansArray.length;
    var democraticsMembersNumber = democraticsArray.length;
    var independentsMembersNumber = independentsArray.length;
    var totalMembersNumber = republicansMembersNumber + democraticsMembersNumber + independentsMembersNumber;

    statistics.senate_at_glance[0]["number_of_members"] = democraticsMembersNumber;
    statistics.senate_at_glance[1]["number_of_members"] = republicansMembersNumber;
    statistics.senate_at_glance[2]["number_of_members"] = independentsMembersNumber;
    statistics.senate_at_glance[3]["number_of_members"] = totalMembersNumber;

}


function calculateAverageVotesWithParty(republicansArray, democraticsArray, independentsArray) {

    var republicansMembersPercentage = [];
    var democraticsMembersPercentage = [];
    var independentsMembersPercentage = [];

    republicansArray.forEach(x => {
        republicansMembersPercentage.push(x.votes_with_party_pct);
    })
    democraticsArray.forEach(x => {
        democraticsMembersPercentage.push(x.votes_with_party_pct);
    })
    independentsArray.forEach(x => {
        independentsMembersPercentage.push(x.votes_with_party_pct);
    })

    var republicansMembersAveragePercentage = [];
    var democraticsMembersAveragePercentage = [];
    var independentsMembersAveragePercentage = [];
    var totalAveragePercentage = [];

    republicansMembersAveragePercentage = Math.round(republicansMembersPercentage.reduce((a, b) => a + b, 0) / republicansMembersPercentage.length * 100) / 100 || 0;
    democraticsMembersAveragePercentage = Math.round(democraticsMembersPercentage.reduce((a, b) => a + b, 0) / democraticsMembersPercentage.length * 100) / 100 || 0;
    independentsMembersAveragePercentage = Math.round(independentsMembersPercentage.reduce((a, b) => a + b, 0) / independentsMembersPercentage.length * 100) / 100 || 0;
    totalAveragePercentage = Math.round((republicansMembersAveragePercentage + democraticsMembersAveragePercentage + independentsMembersAveragePercentage) / 3 * 100) / 100;


    statistics.senate_at_glance[0]["percentage_voted_with_party"] = democraticsMembersAveragePercentage;
    statistics.senate_at_glance[1]["percentage_voted_with_party"] = republicansMembersAveragePercentage;
    statistics.senate_at_glance[2]["percentage_voted_with_party"] = independentsMembersAveragePercentage;
    statistics.senate_at_glance[3]["percentage_voted_with_party"] = totalAveragePercentage;


}


function getSortedPercentageOfVotes(object) {

    var whoMostOftenVoteWithTheParty = object.map(el => el.votes_with_party_pct).sort((a, b) => b - a);


    var whoLeastOftenVoteWithTheParty = whoMostOftenVoteWithTheParty.slice().reverse();
    console.log(whoLeastOftenVoteWithTheParty);

    //change between whoLeastOftenVoteWithTheParty and whoMostOftenVoteWithTheParty to get different results at get10Percent
    get10Percentage(whoMostOftenVoteWithTheParty, "most_loyal");
    get10Percentage(whoLeastOftenVoteWithTheParty, "least_loyal");


}
getSortedPercentageOfVotes(data.results[0].members);

function getSortedPercentageOfAttendance(object) {

    var whoLeastOftenAttend = object.map(el => el.missed_votes_pct).sort((a, b) => a - b);

    var whoMostOftenAttend = whoLeastOftenAttend.slice().reverse();

    get10Percentage(whoLeastOftenAttend, "most_attendance");
    get10Percentage(whoMostOftenAttend, "least_attendance");
}
getSortedPercentageOfAttendance(data.results[0].members)


function get10Percentage(array, direction) {

    var index10Percent = Math.round(10 * array.length / 100) - 1;

    var votes10Percent = array[index10Percent];

    //    for(var i = 0; i <= index10Percent; i++) {
    //        for(var h = 1; h < array.length; h++) {
    //            if(array[index10Percent] == (array[h])){
    //                index10Percent = h;
    //            } 
    //        } votes10Percent.push(array[i]);   
    //    }

    console.log(index10Percent);
    console.log(votes10Percent);

    if (direction == "most_loyal") {

        statistics["most_loyal"] = data.results[0].members
            .filter(x => x.votes_with_party_pct >= votes10Percent)
            .sort((a, b) => b.votes_with_party_pct - a.votes_with_party_pct);

    } else if (direction == "least_loyal") {

        statistics["least_loyal"] = data.results[0].members
            .filter(x => x.votes_with_party_pct <= votes10Percent)
            .sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct);

    } else if (direction == "most_attendance") {

        statistics["most_engaged"] = data.results[0].members
            .filter(x => x.missed_votes_pct <= votes10Percent)
            .sort((a, b) => a.missed_votes_pct - b.missed_votes_pct);

    } else {

        statistics["least_engaged"] = data.results[0].members
            .filter(x => x.missed_votes_pct >= votes10Percent)
            .sort((a, b) => b.missed_votes_pct - a.missed_votes_pct);
    }

}

//console.log(statistics);
//console.log(JSON.stringify(statistics));

function getSenateAtGlanceTableHtml(senateAtGlance) {

    return senateAtGlance
        .map(element => {
            return `<tr><td>${element.name}</td><td>${element.number_of_members}</td><td>${element.percentage_voted_with_party}%</td></tr>`;

        }).join("")

}

function renderSenateAtGlanceTableHtml(statistics) {

    document.getElementById("at_glance_table").innerHTML = getSenateAtGlanceTableHtml(statistics.senate_at_glance);

}
renderSenateAtGlanceTableHtml(statistics);






if (document.title == "Party Loyalty") {


    function getLeastLoyalTableHtml(leastLoyal) {

        return leastLoyal
            .map(element => {
                if (element.middle_name == null) {
                    element.middle_name = "";
                }
                return `<tr><td><a href=${element.url} target='_blank'>${element.last_name} ${element.middle_name} ${element.first_name}</a></td><td>${element.total_votes - element.missed_votes}</td><td>${element.votes_with_party_pct}%</td></tr>`;

            }).join("")

    }

    function renderLeastLoyalTableHtml(statistics) {

        document.getElementById("least_loyal_table").innerHTML = getLeastLoyalTableHtml(statistics.least_loyal);

    }
    renderLeastLoyalTableHtml(statistics);


    function getMostLoyalTableHtml(mostLoyal) {

        return mostLoyal
            .map(element => {
                if (element.middle_name == null) {
                    element.middle_name = "";
                }
                return `<tr><td><a href=${element.url} target='_blank'>${element.last_name} ${element.middle_name} ${element.first_name}</a></td><td>${element.total_votes - element.missed_votes}</td><td>${element.votes_with_party_pct}%</td></tr>`;

            }).join("")

    }

    function renderMostLoyalTableHtml(statistics) {

        document.getElementById("most_loyal_table").innerHTML = getMostLoyalTableHtml(statistics.most_loyal);

    }
    renderMostLoyalTableHtml(statistics);


} else {

    function getLeastEngagedTableHtml(leastEngaged) {

        return leastEngaged
            .map(element => {
                if (element.middle_name == null) {
                    element.middle_name = "";
                }
                return `<tr><td><a href=${element.url} target='_blank'>${element.last_name} ${element.middle_name} ${element.first_name}</a></td><td>${element.total_present}</td><td>${element.missed_votes_pct}%</td></tr>`;

            }).join("")

    }

    function renderLeastEngagedTableHtml(statistics) {

        document.getElementById("least_engaged_table").innerHTML = getLeastEngagedTableHtml(statistics.least_engaged);

    }
    renderLeastEngagedTableHtml(statistics);


    function getMostEngagedTableHtml(mostEngaged) {

        return mostEngaged
            .map(element => {
                if (element.middle_name == null) {
                    element.middle_name = "";
                }
                return `<tr><td><a href=${element.url} target='_blank'>${element.last_name} ${element.middle_name} ${element.first_name}</a></td><td>${element.total_present}</td><td>${element.missed_votes_pct}%</td></tr>`;

            }).join("")

    }

    function renderMostEngagedTableHtml(statistics) {

        document.getElementById("most_engaged_table").innerHTML = getMostEngagedTableHtml(statistics.most_engaged);

    }
    renderMostEngagedTableHtml(statistics);


}









//
//function getWhoLeastOftenVoteWithTheParty (object) {
//    
//    var missedVotes = [];
//    
//    object.forEach(x => {
//        missedVotes.push(x.missed_votes_pct);
//    })
//    missedVotes.sort((a, b) => b - a);
//    
//    console.log(missedVotes);
//    
//    var index10Percent = Math.round(10 * missedVotes.length / 100 - 1);
//    console.log(index10Percent);
//    
//    var missedVotes10percent = [];
//    
//    for(var i = 0; i <= index10Percent; i++) {
//        for(var h = 1; h < missedVotes.length; h++) {
//            if(missedVotes[index10Percent] == (missedVotes[h])){
//                index10Percent = h;
//            } 
//        } missedVotes10percent.push(missedVotes[i]);   
//    }
//    
//    
//    console.log(index10Percent);
//    console.log(missedVotes10percent);
//}
//getWhoLeastOftenVoteWithTheParty(objectData);


//function getWhoLeastOftenVoteWithTheParty () {
//    
//    var missedVotes = [8, 7, 6, 6, 6,6,6,6,5, 4, 3, 3, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0];
//    
//    console.log(missedVotes.length);
//    
////    console.log(missedVotes);
//    
//    
//    var index10Percent = Math.round(10 * missedVotes.length / 100 - 1);
//    console.log(index10Percent);
//    var missedVotes10percent = [];
//    
//    for(var i = 0; i <= index10Percent; i++) {
//        for(var h = 1; h < missedVotes.length; h++) {
//            if(missedVotes[index10Percent] == (missedVotes[h])){
//                index10Percent = h;
//            }
//            
//        } missedVotes10percent.push(missedVotes[i]);
//        
//    }
//    console.log(index10Percent);
//    console.log(missedVotes10percent);
//}
//getWhoLeastOftenVoteWithTheParty();
