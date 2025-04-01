$(function() {
    let prec = $("button:first")
    prec.hide()
    let suiv = $("button:last")
    let headNom = $("table:first th:first")
    let headPop = $("table:first th:eq(1)")
    let headArea = $("table:first th:eq(2)")
    let headDensite = $("table:first th:eq(3)")
    let headCountry = $("table:first th:eq(4)")

    headNom.on("click",0,tri)
    headPop.on("click",1,tri)
    headArea.on("click",2,tri)
    headDensite.on("click",3, tri)
    headCountry.on("click",4, tri)

    let page = 1;
    const countriesPerPage = 25;
    let tableauCourant
    let tabTriActif = [1,1,1,1,1]


    function tri(colonne) {
        let totalCountries = Object.values(Country.all_countries);
        if(colonne.data == 0){
            totalCountries.sort((a,b) => {
                if (a._name.toLowerCase() < b._name.toLowerCase()) {
                    return -1 * tabTriActif[colonne.data];
                }
                else if (a._name.toLowerCase() > b._name.toLowerCase()) {
                    return tabTriActif[colonne.data];
                }
            });
        }
        else if(colonne.data == 1){
            totalCountries.sort((a,b) => {
                if (a.population < b.population) {
                    return -1 * tabTriActif[colonne.data];
                }
                else if (a._population > b._population) {
                    return tabTriActif[colonne.data];
                }
                else{
                    if (a._name.toLowerCase() < b._name.toLowerCase()) {
                        return -1 * tabTriActif[colonne.data];
                    }
                    else {
                        return tabTriActif[colonne.data];
                    }
                }
            });
        }
        else if(colonne.data == 2){
            totalCountries.sort((a,b) => {
                if (a._area < b._area) {
                    return -1 * tabTriActif[colonne.data];
                }
                else if (a._area > b._area) {
                    return tabTriActif[colonne.data];
                }
                else{
                    if (a._name.toLowerCase() < b._name.toLowerCase()) {
                        return -1 * tabTriActif[colonne.data];
                    }
                    else {
                        return tabTriActif[colonne.data];
                    }
                }
            });
        }
        else if(colonne.data == 3){
            totalCountries.sort((a,b) => {
                if (a.getPopDensity() < b.getPopDensity()) {
                    return -1 * tabTriActif[colonne.data];
                }
                else if (a.getPopDensity() > b.getPopDensity()) {
                    return tabTriActif[colonne.data];
                }
                else{
                    if (a._name.toLowerCase() < b._name.toLowerCase()) {
                        return -1 * tabTriActif[colonne.data];
                    }
                    else {
                        return tabTriActif[colonne.data];
                    }
                }
            });
        }
        else{
            totalCountries.sort((a,b) => {
                if (a._continent < b._continent) {
                    return -1 * tabTriActif[colonne.data];
                }
                else if (a._continent > b._continent) {
                    return tabTriActif[colonne.data];
                }
                else{
                    if (a._name.toLowerCase() < b._name.toLowerCase()) {
                        return -1 * tabTriActif[colonne.data];
                    }
                    else {
                        return tabTriActif[colonne.data];
                    }
                }
            });
        }
        if(tabTriActif[colonne.data] == 1){
            tabTriActif = [1,1,1,1,1]
            tabTriActif[colonne.data] = -1;
        }
        else{
            tabTriActif[colonne.data] = 1;
        }
        tableauCourant = totalCountries
        updateTable(tableauCourant);
    }

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    function initCountries(countries){
        Country.fill_countries(countries);
        updateTable();
    }
    
    function updateTable(tableAFiltrer = Object.values(Country.all_countries)) {
        let tableBody = $("tbody");

        let nbCountries = tableAFiltrer.length;
        tableBody.empty();
        const startIndex = (page - 1) * countriesPerPage;
        const endIndex = Math.min(startIndex + countriesPerPage, nbCountries);

        tableAFiltrer.slice(startIndex, endIndex).map((country) => {
            let ligne = $("<tr></tr>");

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
            let imgDrapeau = $("<img></img>").attr("src",country.flag).attr("width", 75)
            celluleDrapeau.append(imgDrapeau)
            ligne.append(celluleDrapeau)

            tableBody.append(ligne)
       });
       $("span").text("Page " + page);
    }
        
    prec.on("click", function() {
        if (page > 1) {
            page--;
            prec.show();
            suiv.show();
            updateTable(tableauCourant);
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
            updateTable(tableauCourant);
        }
        if(page * countriesPerPage == totalCountries){
            suiv.hide()
        }
    });
    initCountries(countries);
});
