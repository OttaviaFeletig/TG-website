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

function getMembersPartyList (object) {
    
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

    statistics.senate_at_glance[1]["number_of_republicans"] = republicansMembersNumber;
    statistics.senate_at_glance[0]["number_of_democrats"] = democraticsMembersNumber;
    statistics.senate_at_glance[2]["number_of_independents"] = independentsMembersNumber;
    statistics.senate_at_glance[3]["total_number"] = totalMembersNumber;
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
    
   republicansMembersAveragePercentage = Math.round(republicansMembersPercentage.reduce((a, b) => a + b) / republicansMembersPercentage.length * 100) / 100;
    democraticsMembersAveragePercentage = Math.round(democraticsMembersPercentage.reduce((a, b) => a + b) / democraticsMembersPercentage.length * 100) / 100;
    independentsMembersAveragePercentage = Math.round(independentsMembersPercentage.reduce((a, b) => a + b) / independentsMembersPercentage.length * 100) / 100;
    totalAveragePercentage = Math.round((republicansMembersAveragePercentage + democraticsMembersAveragePercentage + independentsMembersAveragePercentage) / 3 * 100) / 100;

    
    statistics.senate_at_glance[1]["percentage_voted_with_party"] = republicansMembersAveragePercentage;
    statistics.senate_at_glance[0]["percentage_voted_with_party"] = democraticsMembersAveragePercentage;
    statistics.senate_at_glance[2]["percentage_voted_with_party"] = independentsMembersAveragePercentage;
    statistics.senate_at_glance[3]["total_percentage"] = totalAveragePercentage;
}


function getSortedPercentageOfVotes (object) {
    
    var whoLeastOftenVoteWithTheParty = [];
     //change x.missed_votes_pct with votes_with_party_pct for the most loyal and the difference between this and 100% for the least loyal
    object.forEach(x => {
        whoLeastOftenVoteWithTheParty.push(x.missed_votes_pct);
    })
    whoLeastOftenVoteWithTheParty.sort((a, b) => b - a);
    
    var whoMostOftenVoteWithTheParty = whoLeastOftenVoteWithTheParty.slice().reverse();
    
    //change between whoLeastOftenVoteWithTheParty and whoMostOftenVoteWithTheParty to get different results at get10Percent
    get10Percentage(whoMostOftenVoteWithTheParty);
    
}
getSortedPercentageOfVotes(data.results[0].members);

function getSortedPercentageOfAttendance (object) {
    var whoLeastOftenAttend = [];
    
    object.forEach(x => {
        whoLeastOftenAttend.push(x.missed_votes_pct)
    })
    
}
getSortedPercentageOfAttendance(data.results[0].members)

    
function get10Percentage (array) {
    
    var index10Percent = Math.round(10 * array.length / 100 - 1);
  
    var votes10Percent = [];
    
    for(var i = 0; i <= index10Percent; i++) {
        for(var h = 1; h < array.length; h++) {
            if(array[index10Percent] == (array[h])){
                index10Percent = h;
            } 
        } votes10Percent.push(array[i]);   
    }
   
    console.log(votes10Percent);
    console.log(votes10Percent[votes10Percent.length - 1]);

        statistics["most_loyal"] = data.results[0].members.filter(x => x.votes_with_party_pct === votes10Percent[votes10Percent.length - 1]);    
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




console.log(statistics);
console.log(JSON.stringify(statistics));
