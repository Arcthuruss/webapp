import { countries } from "./countries.js";

class Currency{

    static all_currencies = [];
    constructor(code, nom, symbole){
        this.code = code;
        this.nom = nom;
        this.symbole = symbole;
    }

    toString(){
        return this.code + ", " + this.nom + ", " + this.symbole;
    }

    static fill_currencies(){
        countries.forEach(country => {
            if (country.currencies !== undefined) {
                country.currencies.forEach(currency => {
                    this.all_currencies[currency.code] = new Currency(currency.code,currency.name,currency.symbol);
                })
            }
        })
    }
}


Currency.fill_currencies();
console.log(Currency.all_currencies["EUR"].toString());