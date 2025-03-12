$(function() {
    $("button:first").on("click",outsideTheContinent);
    $("button:eq(1)").on("click",moreNeighbors);
    $("button:eq(2)").on("click",neighborless);
    $("button:eq(3)").on("click",moreLanguages);
    $("button:eq(4)").on("click",withCommonLanguage);
    $("button:eq(5)").on("click",withoutCommonCurrency);
    $("button:eq(6)").on("click",sortingDecreasingDensity);
    $("button:last").on("click",moreTopLevelDomains);

    function outsideTheContinent() {
        outside = []
        Country.fill_countries(countries)
        for (var code in Country.all_countries) {
            let country = Country.all_countries[code]
            if (country.neighbour == undefined) {continue}
            country.neighbour.forEach(e => {
                if (country.continent != Country.all_countries[e].continent) {
                    if (!outside.includes(country)) {
                        outside.push(country)
                    }
                }
            })
        }
        console.log(outside)
    }

    function moreNeighbors() {
        let result = []
        let max = 0
        Country.fill_countries(countries)
        for (var code in Country.all_countries) {
            let country = Country.all_countries[code]
            if (country.neighbour == undefined) {continue}
            if (country.neighbour.length > max) {
                max = country.neighbour.length
                result = [[country.name, country.neighbour.map(cd => Country.all_countries[cd].name)]]
            } else if (country.neighbour.length == max) {
                result.push([country.name, country.neighbour.map(cd => Country.all_countries[cd].name)])
            }
            
        }
        console.log(result)
    }

    function neighborless() {
        result = []
        Country.fill_countries(countries)
        for (var code in Country.all_countries) {
            let country = Country.all_countries[code]
            if (country.neighbour == undefined) {
                result.push(country.name)
            }
            
        }
        console.log(result)
    }

    function moreLanguages() {
        let result = []
        let max = 0
        Country.fill_countries(countries)
        for (var code in Country.all_countries) {
            let country = Country.all_countries[code]
            if (country.languages.length > max) {
                max = country.languages.length
                result = [[country.name, country.getLanguages()]]
            } else if (country.languages.length == max) {
                result.push([country.name, country.getLanguages()])
            }
        }
        console.log(result)
    }

    function withCommonLanguage() {
    }

    function withoutCommonCurrency() {
    }

    function sortingDecreasingDensity() {
    }

    function moreTopLevelDomains() {
    }
});