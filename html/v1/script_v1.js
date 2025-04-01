$(function() {
    // change le format des nombre décimaux avec 2 chiffres après la virgule
    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    // insère et affiche les données de all_countries de la classe Country
    function affichageAllCountries(countries) {
        Country.fill_countries(countries);
        let tableBody = $("tbody");

        Object.values(Country.all_countries).map((country) => {
            let ligne = $("<tr></tr>");

            // cellule du nom
            let celluleNom = $("<td></td>").text(country.name);
            ligne.append(celluleNom);

            // cellule de la population
            let cellulePopulation = $("<td></td>").text(formatNumber(country.population));
            ligne.append(cellulePopulation);

            // cellule de la surface
            let celluleSurface = $("<td></td>");

            if(country.area != null){
                celluleSurface = celluleSurface.text(formatNumber(country.area));
            }
            
            ligne.append(celluleSurface);

            // cellule de la densité
            let celluleDensite = $("<td></td>").text(formatNumber(country.getPopDensity().toFixed(2)));
            ligne.append(celluleDensite);

            // cellule du continent
            let celluleContinent = $("<td></td>").text(country.continent);
            ligne.append(celluleContinent);

            // cellule du drapeau
            let celluleDrapeau = $("<td></td>");
            let imgDrapeau = $("<img></img>").attr("src",country.flag).attr("width", 75);
            celluleDrapeau.append(imgDrapeau)
            ligne.append(celluleDrapeau);

            tableBody.append(ligne);
        });
    }

    affichageAllCountries(countries);
});
