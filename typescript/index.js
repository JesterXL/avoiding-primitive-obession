var getPerson = function (team, _a, _b, _c) {
    var name = _a.name;
    var phone = _b.phone;
    var age = _c.age;
    return Promise.resolve(name)
        .then(validateName)
        .then(function (isValidName) {
        if (isValidName === false) {
            return Promise.reject(new Error("".concat(name, " is not a valid name for a Person type.")));
        }
        else {
            return phone;
        }
    })
        .then(validatePhone)
        .then(function (isValidPhone) {
        if (isValidPhone === false) {
            return Promise.reject(new Error("".concat(phone, " is not a valid phone number for a Person type.")));
        }
        else {
            return age;
        }
    })
        .then(validateAge)
        .then(function (isValidAge) {
        if (isValidAge === false) {
            return Promise.reject(new Error("".concat(age, " is not a valid age for a Person type.")));
        }
        else {
            return { name: name, phone: phone, age: age, team: team };
        }
    });
};
var validateName = function (name) {
    // can't be 0 characters
    if (name.length < 1) {
        return false;
    }
    // can't be a bunch-o-blanks
    if (name.split("").every(function (letter) { return letter === ''; })) {
        return false;
    }
    return true;
};
var validatePhone = function (phone) {
    // must b 9 characters
    if (phone.length < 9) {
        return false;
    }
    // all phone numbers are an Array of ints
    var isOkPhoneCharacter = function (character) {
        if (character === ')'
            || character === '('
            || character === '-') {
            return true;
        }
        var int = parseInt(character);
        if (typeof int === 'number' && isNaN(int) === false) {
            return true;
        }
        else {
            return false;
        }
    };
    // assuming we remove whitespace, it's should be either digits or 3 symbols
    return phone.trim().split('').every(isOkPhoneCharacter);
};
var validateAge = function (age) {
    if (isNaN(age) === false && age > -1) {
        return true;
    }
    else {
        return false;
    }
};
if (process.argv[1].split('/')[process.argv[1].split('/').length - 1] === import.meta.url.split('/')[import.meta.url.split('/').length - 1]) {
    // getPerson("Jesse", "804-555-1234")
    getPerson("red", { name: "Jesse" }, { phone: "804-555-1234" }, { age: 42 })
        .then(console.log)["catch"](console.log);
}
export {};
