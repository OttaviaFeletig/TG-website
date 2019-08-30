onload = (() => {
  let chamber;
  if (document.title.includes("Senate")) {
    chamber = "senate";
  } else {
    chamber = "house";
  }
  getData(chamber);
})();

function getData(chamber) {
  fetch(`https://api.propublica.org/congress/v1/113/${chamber}/members.json`, {
    method: "GET",
    headers: {
      "X-API-Key": apiKey
    }
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let members = data.results[0].members;
      callingFunctions(members);
    });
}

function callingFunctions(members) {
  if (
    document.title == "Congress 113: Senate" ||
    document.title == "Congress 113: House"
  ) {
    renderStateList(members);
    renderColumnsHtml(members);
  } else {
    getMembersPartyList(members);
    getSortedPercentageOfVotes(members);
    getSortedPercentageOfAttendance(members);
    renderSenateAtGlanceTableHtml(statistics);
    if (document.title == "Party Loyalty") {
      renderLeastLoyalTableHtml(statistics);
      renderMostLoyalTableHtml(statistics);
    } else {
      renderLeastEngagedTableHtml(statistics);
      renderMostEngagedTableHtml(statistics);
    }
  }
}
