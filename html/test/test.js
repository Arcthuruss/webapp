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
        //Q5
        /*let res = []
        Country.fill_countries(countries)
        Language.fill_languages(countries   )
        for (let country in Country.all_countries) {
            let neighbors = Country.all_countries[country].neighbour
            let languages = Country.all_countries[country].languages
            res[Country.all_countries[country]] = {}
            if(neighbors == undefined) {continue}
            for(let neighbor of neighbors){
                for(let language of languages){
                    neighborObject = Country.all_countries[neighbor]
                    countryObject = Country.all_countries[country]
                    if(Country.all_countries[neighbor].languages.some((e) => e.iso639_2 == language.iso639_2)){
                        res[countryObject] = {neighborObject: Language.all_languages[language.iso639_2]}
                        
                            //res[countryObject][neighborObject].push(Language.all_languages[language.iso639_2])
                        
                    }
                }
            }
        }
        console.log(res)*/
    }

    function withoutCommonCurrency() {
        let resWithCommonCurrency = []
        let test = true
        Country.fill_countries(countries)
        for (let country in Country.all_countries) {
            test = true
            let neighbors = Country.all_countries[country].neighbour
            let currencies = Country.all_countries[country].currencies
            if(neighbors == undefined) {continue}
            for(let neighbor of neighbors){
                for(let currency of currencies){
                    if(Country.all_countries[neighbor].currencies.some((e) => e.code == currency.code)){
                        test = false
                    }
                }
            }
            if(test == true && resWithCommonCurrency.indexOf(Country.all_countries[country]) == -1){
                resWithCommonCurrency.push(Country.all_countries[country])
            }
        }
        console.log(resWithCommonCurrency)
    }

    function sortingDecreasingDensity() {
    }

    function moreTopLevelDomains() {
    }
});