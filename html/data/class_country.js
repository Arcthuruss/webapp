import { countries } from "./countries.js";

class Country {

    static all_countries = [];

    constructor(alpha3, name, capitale, continent, population, neighbour) {
        this._alpha3 = alpha3
        this._name = name
        this._capitale = capitale
        this._continent = continent
        this._population = population
        this._neighbour = neighbour
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

    toString() {
        return `${this.alpha3}, ${this.name}, ${this.capitale}, ${this.continent}, \
${this.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} hab, \
(${this.neighbour.map(e => Country.all_countries[e].name).sort().join(', ')})`
    }

    static fill_countries(source) {
        source.forEach(country => {
            this.all_countries[country.alpha3Code] = new Country(
                country.alpha3Code,
                country.translations.fr,
                country.capital,
                country.region,
                country.population,
                country.borders
            )
        })
    }
}

Country.fill_countries(countries);
console.log(Country.all_countries["AND"].toString())