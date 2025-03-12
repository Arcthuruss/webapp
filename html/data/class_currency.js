class Currency{

    static all_currencies = [];
    constructor(code, name, symbol){
        this._code = code;
        this._name = name;
        this._symbol = symbol;
    }

    get code() {return this._code}
    set code(newCode) {this._code = newCode}

    get name() {return this._name}
    set name(newName) {this._name = newName}

    get symbol() {return this._symbol}
    set symbol(newSymbol) {this._symbol = newSymbol}

    toString(){
        return this.code + ", " + this.name + ", " + this.symbol;
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