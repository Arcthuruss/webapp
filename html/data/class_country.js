class Country {

    static all_countries = [];

    constructor(alpha3, name, capitale, continent, population, neighbour, area, currencies, languages, flag,topLevelDomain) {
        this._alpha3 = alpha3
        this._name = name
        this._capitale = capitale
        this._continent = continent
        this._population = population
        this._neighbour = neighbour
        this._area = area
        this._currencies = currencies
        this._languages = languages
        this._flag = flag
        this._topLevelDomain = topLevelDomain
    }

    get alpha3() {return this._alpha3}
    set alpha3(newAlpha3) {this._alpha3 = newAlpha3}

    get name() {return this._name}
    set name(newName) {this._name = newName}

    get capitale() {return this._capitale}
    set capitale(newCapitale) {this._capitale = newCapitale}

    get continent() {return this._continent}
    set continent(newContinent) {this._continent = newContinent}

    get population() {return this._population}
    set population(newPopulation) {this._population = newPopulation}

    get neighbour() {return this._neighbour}
    set neighbour(newNeighbour) {this._neighbour = newNeighbour}

    get area() {return this._area}
    set area(newArea) {this._area = newArea}

    get currencies() {return this._currencies}
    set currencies(newCurrencies) {this._currencies = newCurrencies}

    get languages() {return this._languages}
    set languages(newLanguages) {this._languages = newLanguages}

    get flag() {return this._flag}
    set flag(newFlag) {this._flag = newFlag}

    get topLevelDomain() {return this._topLevelDomain}
    set topLevelDomain(newTopLevelDomain) {this._topLevelDomain = newTopLevelDomain}

    toString() {
        return `${this.alpha3}, ${this.name}, ${this.capitale}, ${this.continent}, \
${this.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} hab, \
(${this.neighbour == undefined ? '' : this.neighbour.map(e => Country.all_countries[e].name).sort().join(', ')})`
    }

    static fill_countries(source) {
        source.forEach(country => {
            this.all_countries[country.alpha3Code] = new Country(
                country.alpha3Code,
                country.translations.fr,
                country.capital,
                country.region,
                country.population,
                country.borders,
                country.area,
                country.currencies,
                country.languages,
                country.flags.svg,
                country.topLevelDomain
            )
        })
    }

    getPopDensity(){
        return this._population / this._area
    }

    getBorders(){
        let res = []
        this._neighbour.forEach(e => {
            res.push(Country.all_countries[e])
        })
        return res
    }

    getCurrencies(){
        let res = []
        this._currencies.forEach(e => {
            res.push(new Currency(e["code"],e["name"],e["symbol"]))
        })
        return res
    }

    getLanguages(){
        let res = []
        this._languages.forEach(e => {
            res.push(new Language(e.name,e.iso639_2))
        })
        return res
    }
}