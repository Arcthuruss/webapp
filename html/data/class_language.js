class Language {

    static all_languages = []


    constructor(name, iso) {
        this._name = name
        this._iso = iso
    }

    get name() {return this._name}
    set name(newName) {this._name = newName}

    get iso() {return this._iso}
    set iso(newIso) {this._iso = newIso}

    toString() {
        return `${this.name} (${this.iso})`
    }

    static fill_languages(source) {
        source.forEach(country => {
            country.languages.forEach(e => {
                if (!(e.iso639_2 in this.all_languages)) {
                    this.all_languages[e.iso639_2] = new Language(e.name, e.iso639_2)
                }
            })
        })
    }

}

Language.fill_languages(countries)
console.log(Language.all_languages["fra"].toString())