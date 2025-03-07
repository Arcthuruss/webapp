class Country{
    constructor(codeAlpha3, nom, capitale, continent, population, listeNomsPaysVoisins){
        this.codeAlpha3 = codeAlpha3;
        this.nom = nom;
        this.capitale = capitale;
        this.continent = continent;
        this.population = population;
        this.listeNomsPaysVoisins = [];
    }

    toString(){
        return this.codeAlpha3 + ", "+ this.nom + ", " + this.capitale + ", "
            + this.continent + ", " + this.population + ", " + this.listeNomsPaysVoisins;
    }

    static fill_countries(){

    }

    getPopDensity(){

    }

    getBorders(){

    }

    getCurrencies(){

    }

    getLanguages(){
        
    }
}

Country.fill_countries();

