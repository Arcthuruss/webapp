let prec
let suiv
let page = 1;
const countriesPerPage = 25;

let currentTable = [];
tabFiltre = [];
let tabTriActif = [1,1,1,1,1]

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function initCountries(countries){
    Country.fill_countries(countries);
    currentTable = Country.all_countries
    tabFiltre = Country.all_countries
    updateTable();
}

function initLanguages(countries) {
    Language.fill_languages(countries)
}

function updateTable(table = currentTable) {
    tableAFiltrer = Object.values(table)
    let tableBody = $("tbody");

    let nbCountries = tableAFiltrer.length;
    tableBody.empty();
    const startIndex = (page - 1) * countriesPerPage;
    const endIndex = Math.min(startIndex + countriesPerPage, nbCountries);

    tableAFiltrer.slice(startIndex, endIndex).map((country) => {
        let ligne = $(`<tr id="${country.alpha3}" onclick="afficherDetails(event)" ></tr>`);

        let celluleNom = $("<td></td>").text(country.name);
        ligne.append(celluleNom);

        let cellulePopulation = $("<td></td>").text(formatNumber(country.population));
        ligne.append(cellulePopulation);
        
        let celluleSurface = $("<td></td>");
        
        if(country.area != null){
            celluleSurface = celluleSurface.text(formatNumber(country.area));
        }
        
        ligne.append(celluleSurface);
    
        let celluleDensite = $("<td></td>").text(formatNumber(country.getPopDensity().toFixed(2)));
        ligne.append(celluleDensite);

        let celluleContinent = $("<td></td>").text(country.continent);
        ligne.append(celluleContinent);

        let celluleDrapeau = $("<td></td>")
        let imgDrapeau = $("<img></img>").attr("src",country.flag).attr("width", 75).attr("onclick", "afficherDrapeau(event)")

        celluleDrapeau.append(imgDrapeau)
        ligne.append(celluleDrapeau)

        tableBody.append(ligne)
   });
   $("aside").text("Page " + page);
}

function initFiltres() {
    let continents = []
    Object.values(Country.all_countries).forEach(country => {
        if (!(continents.includes(country.continent))) {
            continents.push(country.continent)
        }
    })
    continents.sort()
    continents.forEach(e => {
        $("#filtreContinent").append(`<option value="${e}">${e}</option>`)
    })

    Object.values(Language.all_languages).forEach(e => {
        $("#filtreLangue").append(`<option value="${e.iso}">${e.name}</option>`)
    })
}

$(function() {
    prec = $("button:first")
    prec.hide()
    suiv = $("button:last")
    let headNom = $("table:first th:first")
    let headPop = $("table:first th:eq(1)")
    let headArea = $("table:first th:eq(2)")
    let headDensite = $("table:first th:eq(3)")
    let headCountry = $("table:first th:eq(4)")

    headNom.on("click", {colonne: 0},tri)
    headPop.on("click", {colonne: 1},tri)
    headArea.on("click", {colonne: 2},tri)
    headDensite.on("click", {colonne: 3}, tri)
    headCountry.on("click", {colonne: 4}, tri)

    function tri(event) {
        headNom.css("font-weight","normal");
        headPop.css("font-weight","normal");
        headArea.css("font-weight","normal");
        headDensite.css("font-weight","normal");
        headCountry.css("font-weight","normal");

        let totalCountries = Object.values(tabFiltre);
        if(event.data.colonne == 0){
            headNom.css("font-weight","bold");
            totalCountries.sort((a,b) => {
                if (a._name.toLowerCase() < b._name.toLowerCase()) {
                    return -1 * tabTriActif[event.data.colonne];
                }
                else if (a._name.toLowerCase() > b._name.toLowerCase()) {
                    return tabTriActif[event.data.colonne];
                }
            });
        }
        else if(event.data.colonne == 1){
            headPop.css("font-weight","bold");
            totalCountries.sort((a,b) => {
                if (a.population < b.population) {
                    return -1 * tabTriActif[event.data.colonne];
                }
                else if (a._population > b._population) {
                    return tabTriActif[event.data.colonne];
                }
                else{
                    if (a._name.toLowerCase() < b._name.toLowerCase()) {
                        return -1 * tabTriActif[event.data.colonne];
                    }
                    else {
                        return tabTriActif[event.data.colonne];
                    }
                }
            });
        }
        else if(event.data.colonne == 2){
            headArea.css("font-weight","bold");
            totalCountries.sort((a,b) => {
                if(a._area == null && b._area == null){
                    if (a._name.toLowerCase() < b._name.toLowerCase()) {
                        return -1 * tabTriActif[event.data.colonne];
                    }
                    else {
                        return tabTriActif[event.data.colonne];
                    }
                }
                if(a._area == null){
                    return -1 * tabTriActif[event.data.colonne];
                }
                if(b._area == null){
                    return tabTriActif[event.data.colonne];
                }
                if (a._area < b._area) {
                    return -1 * tabTriActif[event.data.colonne];
                }
                else if (a._area > b._area) {
                    return tabTriActif[event.data.colonne];
                }
                else{
                    if (a._name.toLowerCase() < b._name.toLowerCase()) {
                        return -1 * tabTriActif[event.data.colonne];
                    }
                    else {
                        return tabTriActif[event.data.colonne];
                    }
                }
            });
        }
        else if(event.data.colonne == 3){
        headDensite.css("font-weight","bold");
            totalCountries.sort((a,b) => {
                if(isNaN(a.getPopDensity()) && isNaN(b.getPopDensity())){
                    if (a._name.toLowerCase() < b._name.toLowerCase()) {
                        return -1 * tabTriActif[event.data.colonne];
                    }
                    else {
                        return tabTriActif[event.data.colonne];
                    }
                }
                else if ((isNaN(a.getPopDensity()) && isNaN(b.getPopDensity()) == false) || a.getPopDensity() < b.getPopDensity()) {
                    return -1 * tabTriActif[event.data.colonne];
                }
                else if ((isNaN(b.getPopDensity()) && isNaN(a.getPopDensity()) == false) || a.getPopDensity() > b.getPopDensity()) {
                    return tabTriActif[event.data.colonne];
                }
                else {
                    if (a._name.toLowerCase() < b._name.toLowerCase()) {
                        return -1 * tabTriActif[event.data.colonne];
                    }
                    else {
                        return tabTriActif[event.data.colonne];
                    }
                }
            });
        }
        else{
            headCountry.css("font-weight","bold");
            totalCountries.sort((a,b) => {
                if (a._continent < b._continent) {
                    return -1 * tabTriActif[event.data.colonne];
                }
                else if (a._continent > b._continent) {
                    return tabTriActif[event.data.colonne];
                }
                else{
                    if (a._name.toLowerCase() < b._name.toLowerCase()) {
                        return -1 * tabTriActif[event.data.colonne];
                    }
                    else {
                        return tabTriActif[event.data.colonne];
                    }
                }
            });
        }
        if(tabTriActif[event.data.colonne] == 1){
            tabTriActif = [1,1,1,1,1]
            tabTriActif[event.data.colonne] = -1;
        }
        else{
            tabTriActif[event.data.colonne] = 1;
        }

        
        currentTable = totalCountries
        updateTable();
    }

    prec.on("click", function() {
        if (page > 1) {
            page--;
            prec.show();
            suiv.show();
            updateTable();
        }
        if(page == 1){
            prec.hide();
        }
    });
    
    suiv.on("click", function() {
        let totalCountries = Object.values(Country.all_countries).length;
        if (page * countriesPerPage < totalCountries) {
            page++;
            suiv.show();
            prec.show();
            updateTable();
        }
        if(page * countriesPerPage == totalCountries){
            suiv.hide()
        }
    });

    initLanguages(countries)
    initCountries(countries);
    initFiltres()
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

function filtrer(event) {
    let filtreContinent = document.getElementById("filtreContinent").value
    let filtrePays = document.getElementById("filtrePays").value
    let filtreLangue = document.getElementById("filtreLangue").value
    function filtrerParContinent(country) {
        return country.continent == filtreContinent || filtreContinent == "all"
    }
    function filtrerParLangue(country) {
        return country.languages.some(l => {return l.iso639_2 == filtreLangue}) || filtreLangue == "all"
    }
    function filtrerParPays(country) {
        return country.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                           .startsWith(filtrePays.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) ||
         country.nameEn.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                       .startsWith(filtrePays.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
    }
    page = 1
    tabFiltre = Object.values(currentTable).filter(e => {
        return filtrerParContinent(e) && filtrerParLangue(e) && filtrerParPays(e)
    })
    updateTable(tabFiltre)
}