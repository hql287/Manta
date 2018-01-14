import currencies from './currencies.json';
import cryptocurrencies from 'cryptocurrencies';

const Crypto = () => {
    let cryptocurrencie = {};

    const keys = Object.keys(cryptocurrencies)

    for (let index = 0; index < keys.length; index++) {
        
        cryptocurrencie[keys[index]] = {
            "symbol": keys[index],
            "name":  cryptocurrencies[keys[index]],
            "symbol_native": keys[index],
            "decimal_digits": 2,
            "rounding": 0,
            "code": keys[index],
            "name_plural": ""
        }
    }

    return cryptocurrencie;
}

const All = () => (Object.assign({}, currencies, Crypto()))

const List = () => ({ currencies, cryptocurrencies: Crypto()});

export {
    All,
    List
}