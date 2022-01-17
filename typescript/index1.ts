type Person = {
    team:string,
    name:string,
    phone:string,
    age:number
}

const getPerson = (team:string, name:string, age:number, phone:string):Promise<Person> =>
    Promise.resolve( name )
    .then( validateName )
    .then(
        (isValidName:boolean) => {
            if(isValidName === false) {
                return Promise.reject(new Error(`${name} is not a valid name for a Person type.`))
            } else {
                return phone
            }
        }
     )
    .then( validatePhone )
    .then(
        (isValidPhone:boolean) => {
            if(isValidPhone === false) {
                return Promise.reject(new Error(`${phone} is not a valid phone number for a Person type.`))
            } else {
                return age
            }
        }
    )
    .then( validateAge )
    .then(
        (isValidAge:boolean) => {
            if(isValidAge === false) {
                return Promise.reject(new Error(`${age} is not a valid age for a Person type.`))
            } else {
                return { name, phone, age, team}
            }
        }
    )


const validateName = (name:string):boolean => {
    // can't be 0 characters
    if(name.length < 1) {
        return false
    }
    // can't be a bunch-o-blanks
    if(name.split("").every(letter => letter === '')) {
        return false
    }
    return true
}

const validatePhone = (phone:string):boolean => {
    // must b 9 characters
    if(phone.length < 9) {
        return false
    }

    // all phone numbers are an Array of ints
    const isOkPhoneCharacter = (character:string):boolean => {
        if(character === ')'
            || character === '('
            || character === '-') {
                return true
            }
        const int = parseInt(character)
        if(typeof int === 'number' && isNaN(int) === false) {
            return true
        } else {
            return false
        }
    }

    // assuming we remove whitespace, it's should be either digits or 3 symbols
    return phone.trim().split('').every(isOkPhoneCharacter)
}

const validateAge = (age:number):boolean => {
    if(isNaN(age) === false && age > -1) {
        return true
    } else {
        return false
    }
}

if (process.argv[1].split('/')[process.argv[1].split('/').length - 1] === import.meta.url.split('/')[import.meta.url.split('/').length - 1]) {
    // getPerson("Jesse", "804-555-1234")
    getPerson("red", "804-555-1234", 42, "Jesse")
    .then(console.log)
    .catch(console.log)
}