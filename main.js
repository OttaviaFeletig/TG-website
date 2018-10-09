function getColumnsHtml (row) {
    return row.results[0].members
        .map (element => {
        if(element.middle_name == null){
            return element.middle_name = "";
        } else {
          return "<tr><td><a href='" + element.url + "' target='_blank'>" + element.last_name + " " + element.middle_name + " " + element.first_name + "</a></td>" + "<td>" + element.party + "</td>" + "<td>" + element.state + "</td>" + "<td>" + element.seniority + "</td>" + "<td>" + element.votes_with_party_pct + "%" + "</td></tr>";  
        }     
    })
        .join("")
}
getColumnsHtml(data);

function renderColumnsHtml (data) {
    var html = getColumnsHtml(data);
    document.getElementById("table-rows").innerHTML = html;
}
renderColumnsHtml(data);