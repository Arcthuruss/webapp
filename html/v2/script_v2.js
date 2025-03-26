$(function() {
    let prec = $("button:first")
    let suiv = $("button:last")

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

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
                let ligne = $("<tr></tr>");
    
                let celluleNom = $("<td></td>").text(country.name);
                ligne.append(celluleNom);
    
                let cellulePopulation = $("<td></td>").text(formatNumber(country.population));
            ligne.append(cellulePopulation);

            let celluleSurface = $("<td></td>").text(formatNumber(country.area));
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
