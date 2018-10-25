//STATISTICS
//
//function myStatistics(members) {
//
//    var statistic = new Vue({
//        el: '#statistics-table',
//        data: {
//            politician: [],
//            democratsMembersList: [],
//            republicansMembersList: [],
//            independentsMembersList: [],
//
//            democratsMembersNumber: 0,
//            republicansMembersNumber: 0,
//            independentsMembersNumber: 0,
//            totalMembersNumber: 0,
//
//            democratsMembersPct: 0,
//            republicansMembersPct: 0,
//            independentsMembersPct: 0,
//            totalMembersPct: 0,
//
//            mostLoyal: [],
//            leastLoyal: [],
//
//            mostEngaged: [],
//            leastEngaged: [],
//            isLoading: true
//        },
//        created() {
//            if(document.title == "Senate Party Loyalty" || document.title == "Senate Party Attendance") {
//                this.loadFetchSenate();
//            } else {
//                this.loadFetchHouse();
//            }
//            
//        },
//        methods: {
//            getMembersNumber: function () {
//
//                this.democratsMembersList = this.politician.filter(onePolitician => onePolitician.party.includes("D"));
//
//                this.democratsMembersNumber = this.democratsMembersList.length;
//
//
//                this.republicansMembersList =
//                    this.politician.filter(onePolitician => onePolitician.party.includes("R"));
//
//                this.republicansMembersNumber = this.republicansMembersList.length;
//
//
//                this.independentsMembersList = this.politician.filter(onePolitician => onePolitician.party.includes("I"));
//
//                this.independentsMembersNumber = this.independentsMembersList.length;
//
//                this.totalMembersNumber = this.democratsMembersNumber + this.republicansMembersNumber + this.independentsMembersNumber;
//
//            },
//            getMembersPct: function () {
//
//                this.democratsMembersPct = Math.round(this.democratsMembersList.map(pct => pct.votes_with_party_pct).reduce((a, b) => a + b, 0) / this.democratsMembersList.length * 100) / 100 || 0;
//
//                this.republicansMembersPct = Math.round(this.republicansMembersList.map(pct => pct.votes_with_party_pct).reduce((a, b) => a + b, 0) / this.republicansMembersList.length * 100) / 100 || 0;
//
//                this.independentsMembersPct = Math.round(this.independentsMembersList.map(pct => pct.votes_with_party_pct).reduce((a, b) => a + b, 0) / this.independentsMembersList.length * 100) / 100 || 0;
//
//                this.totalMembersPct = Math.round((this.democratsMembersPct + this.republicansMembersPct + this.independentsMembersPct) / 3 * 100) / 100;
//
//            },
//            get10Pct: function () {
//
//                if (document.title == "Senate Party Loyalty" || document.title == "House Party Loyalty") {
//
//                    var whoMostOftenVoteWithTheParty = this.politician.map(el => el.votes_with_party_pct).sort((a, b) => b - a);
//
//                    var whoLeastOftenVoteWithTheParty = whoMostOftenVoteWithTheParty.slice().reverse();
//
//                    var index10Percent = Math.round(10 * this.politician.length / 100) - 1;
//
//                    var votes10PercentMostLoyal = whoMostOftenVoteWithTheParty[index10Percent];
//
//                    var votes10PercentLeastLoyal = whoLeastOftenVoteWithTheParty[index10Percent];
//
//                    this.mostLoyal = this.politician
//                        .filter(x => x.votes_with_party_pct >= votes10PercentMostLoyal)
//                        .sort((a, b) => b.votes_with_party_pct - a.votes_with_party_pct);
//
//                    this.leastLoyal = this.politician
//                        .filter(x => x.votes_with_party_pct <= votes10PercentLeastLoyal)
//                        .sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct);
//                } else {
//
//                    var whoMostOftenAttend = this.politician.map(el => el.missed_votes_pct).sort((a, b) => a - b);
//
//                    var whoLeastOftenAttend = whoMostOftenAttend.slice().reverse();
//
//                    var index10Percent = Math.round(10 * this.politician.length / 100) - 1;
//
//                    var votes10PercentMostEngaged = whoMostOftenAttend[index10Percent];
//
//                    var votes10PercentLeastEngaged = whoLeastOftenAttend[index10Percent];
//
//                    this.mostEngaged = this.politician
//                        .filter(x => x.missed_votes_pct <= votes10PercentMostEngaged)
//                        .sort((a, b) => a.missed_votes_pct - b.missed_votes_pct);
//
//                    this.leastEngaged = this.politician
//                        .filter(x => x.missed_votes_pct >= votes10PercentLeastEngaged)
//                        .sort((a, b) => b.missed_votes_pct - a.missed_votes_pct);
//                    console.log(whoMostOftenAttend)
//
//                }
//            },
//            loadFetchSenate: function () {
//                 fetch('https://api.propublica.org/congress/v1/113/senate/members.json', {
//                        method: 'GET',
//                        headers: {
//                            'X-API-Key': 'LFCEVBEkx4netIVuHk7KU0nh79yiglVnKgXTutlh'
//                        }
//
//                    })
//                    .then(function (response) {
//                        return response.json()
//                    })
//                    .then(function (data) {
//                        statistic.isLoading = false;
//                       
//                        statistic.politician = data.results[0].members;
//                        statistic.getMembersNumber();
//                        statistic.getMembersPct();
//                        statistic.get10Pct();
//                    })
//            },
//            loadFetchHouse: function () {
//                
//                fetch('https://api.propublica.org/congress/v1/113/house/members.json', {
//                        method: 'GET',
//                        headers: {
//                            'X-API-Key': 'LFCEVBEkx4netIVuHk7KU0nh79yiglVnKgXTutlh'
//                        }
//
//                    })
//                    .then(function (response) {
//                        return response.json()
//                    })
//                    .then(function (data) {
//                        statistic.isLoading = false;
//                       
//                        statistic.politician = data.results[0].members;
//                        statistic.getMembersNumber();
//                        statistic.getMembersPct();
//                        statistic.get10Pct();
//                    })
//                
//            }
//        }
//    })
//}
