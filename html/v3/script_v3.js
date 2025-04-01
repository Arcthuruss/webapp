$(function() {
    let prec = $("button:first")
    let suiv = $("button:last")

    function initCountries(countries) {
        Country.fill_countries(countries);
        let tableBody = $("tbody");
        const countriesPerPage = 25;
        let page = 1;
        let totalCountries = Object.values(Country.all_countries).length;

        function updateTable() {
            tableBody.empty();
            const startIndex = (page - 1) * countriesPerPage;
            const endIndex = Math.min(startIndex + countriesPerPage, totalCountries);
    
            Object.values(Country.all_countries).slice(startIndex, endIndex).map((country) => {
                let ligne = $(`<tr id="${country.alpha3}" onclick="afficherDetails(event)" ></tr>`);
    
                let celluleNom = $("<td></td>").text(country.name);
                ligne.append(celluleNom);
    
                let cellulePopulation = $("<td></td>").text(country.population);
                ligne.append(cellulePopulation);
    
                let celluleSurface = $("<td></td>").text(country.area);
                ligne.append(celluleSurface);
    
                let celluleDensite = $("<td></td>").text(country.getPopDensity().toFixed(2));
                ligne.append(celluleDensite);
    
                let celluleContinent = $("<td></td>").text(country.continent);
                ligne.append(celluleContinent);
    
                let celluleDrapeau = $("<td></td>")
                let imgDrapeau = $("<img></img>").attr("src",country.flag).attr("width", 75).attr("onclick", "afficherDrapeau(event)")
                celluleDrapeau.append(imgDrapeau)
                ligne.append(celluleDrapeau)
    
                tableBody.append(ligne)
           });
           $("button + span").text("Page " + page);
        }
        
        prec.on("click", function() {
            if (page > 1) {
                page--;
                updateTable();
            }
        });
    
        suiv.on("click", function() {
            if (page * countriesPerPage < totalCountries) {
                page++;
                updateTable();
            }
        });

        updateTable()
    }

    initCountries(countries);
});

function afficherDetails(event) {
    if ($("section").css("display") == "none") {
        let alpha3 = event.target.parentElement.id
        country = Country.all_countries[alpha3]
        $("section").css("display", "grid")
        $("section").css("gap", "10px")
        $("section").append(`<table><tr><th>Code Alpha3:</th></tr><tr><td>${country.alpha3}</td></tr></table>`)
        $("section").append(`<table><tr><th>Nom (fr):</th></tr><tr><td>${country.name}</td></tr></table>`)
        $("section").append(`<table><tr><th>Nom (en):</th></tr><tr><td>${country.nameEn}</td></tr></table>`)
        $("section").append(`<table><tr><th>Capitale:</th></tr><tr><td>${country.capitale}</td></tr></table>`)
        $("section").append(`<table><tr><th>Continent:</th></tr><tr><td>${country.continent}</td></tr></table>`)
        $("section").append(`<table><tr><th>Population:</th></tr><tr><td>${country.population}</td></tr></table>`)
        $("section").append(`<table><tr><th>Surface:</th></tr><tr><td>${country.area}</td></tr></table>`)
        $("section").append(`<table><tr><th>Extension:</th></tr><tr><td>${country.topLevelDomain}</td></tr></table>`)
        $("section").append(`<table><tr><th>Voisins:</th></tr></table>`)
        if (country.neighbour != undefined) {
            country.neighbour.forEach(e => {
                $("tbody").last().append(`<tr><td>${Country.all_countries[e].name}</td></tr>`)
            });
        } else {
            $("tbody").last().append(`<tr><td>aucun</td></tr>`)
        }
        $("section").append(`<table><tr><th>Monnaies:</th></tr></table>`)
        if (country.currencies != undefined) {
            country.currencies.forEach(e => {
                $("tbody").last().append(`<tr><td>${e.name} ${e.symbol}</td></tr>`)
            });
        } else {
            $("tbody").last().append(`<tr><td>aucune</td></tr>`)
        }
        $("section").append(`<table><tr><th>Langues:</th></tr></table>`)
        if (country.languages != undefined) {
            country.languages.forEach(e => {
                $("tbody").last().append(`<tr><td>${e.name}</td></tr>`)
            });
        } else {
            $("tbody").last().append(`<tr><td>aucune</td></tr>`)
        }
    }
}

function closeDetails() {
    $("section").css("display", "none")
    $("section > table").remove()
}

function afficherDrapeau(event) {
    event.stopPropagation()
    $("section + img").toggle().attr("src", event.target.src)
    $("img + span").toggle()
}

function enleverDrapeau(event) {
    event.stopPropagation()
    $("section + img").toggle().attr("src", '')
    $("img + span").toggle()
}