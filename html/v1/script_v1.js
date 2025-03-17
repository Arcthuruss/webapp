$(function() {
    function affichageAllCountries(countries) {
        Country.fill_countries(countries);
        let tableBody = $("tbody");

        Object.values(Country.all_countries).map((country) => {
            console.log("coucou")
            let ligne = $("<tr></tr>");

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

            let celluleDrapeau = $("<td></td>");
            let imgDrapeau = $("<img></img>").attr("src",country.flag).attr("width", 75);
            celluleDrapeau.append(imgDrapeau)
            ligne.append(celluleDrapeau);

            tableBody.append(ligne);
        });
    }


    affichageAllCountries(countries);
});
