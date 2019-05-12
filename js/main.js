var search = document.getElementById("search");
var matchList = document.getElementById("match-list");

// search through states.json and filter it
var searchStates = async searchText => {
  var res = await fetch("../data/states.json");
  var states = await res.json();

  // get matches to current text input
  var matches = states.filter(state => {
    var regex = new RegExp(`^${searchText}`, "gi");
    return state.name.match(regex) || state.abbr.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }

  outputHtml(matches);
};

var outputHtml = matches => {
  if (matches.length > 0) {
    var html = matches
      .map(
        match => `<div class="card card-body mb-1">
        <h4>${match.name} (${match.abbr}) <span class="text-primary">${
          match.capital
        }</span></h4>
      <small>Lat: ${match.lat} / Long: ${match.long}</small>
      </div>`
      )
      .join("");
  }

  matchList.innerHTML = html;
};

search.addEventListener("input", () => searchStates(search.value));
