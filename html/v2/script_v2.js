$(function() {
    let prec = $("button:first")
    prec.hide()
    let suiv = $("button:last")

    let page = 1;
    const countriesPerPage = 25;

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
    initCountries(countries);
});
