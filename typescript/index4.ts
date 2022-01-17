type Team = "blue" | "red"

type Person = {
    team:Team,
    name:string,
    phone:string,
    age:number
}

type Name = {
    name:string
}

type Phone = {
    phone:string
}
type Age = {
    age:number
}

const getPerson = (team:Team, name:Name, age:Age, phone:Phone):Promise<Person> =>
    Promise.all([ validateName(name), validateAge(age), validatePhone(phone) ])
    .then(
        ([ { name }, { age }, { phone } ]) => ({ name, age, phone, team })
    )


const validateName = (nameType:Name):Promise<Name> =>
    Promise.resolve(nameType)
    .then(
        nameType => { 
            // can't be 0 characters
            if(nameType.name.length < 1) {
                return Promise.reject(new Error('name cannot be less than 1 character'))
            }
            return nameType
        }
    )
    .then(
        nameType => {
            if(nameType.name.split("").every(letter => letter === '') ) {
                return Promise.reject(new Error('name cannot be a series of blanks'))
            }
            return nameType
        }
    )

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

const validatePhone = (phoneType:Phone):Promise<Phone> =>
    Promise.resolve(phoneType)
    .then(
        phoneType => {
            // must be 9 characters
            if(phoneType.phone.length < 9) {
                return Promise.reject(new Error('phone must be at least 9 characters'))
            }
            return phoneType
        }
    )
    .then(
        phoneType => {
            // assuming we remove whitespace, it's should be either digits or 3 symbols
            if(phoneType.phone.trim().split('').every(isOkPhoneCharacter) === false) {
                return Promise.reject(new Error('phone number must be (, ), -, blanks, and numbers only'))
            }
            return phoneType
        }
    )

const validateAge = (ageType:Age):Promise<Age> =>
    Promise.resolve(ageType)
    .then(
        ageType => {
            if(isNaN(ageType.age) === true || ageType.age < 0) {
                return Promise.reject(new Error('age must be a number that is 0 or greater'))
            }
            return ageType
        }
    )

if (process.argv[1].split('/')[process.argv[1].split('/').length - 1] === import.meta.url.split('/')[import.meta.url.split('/').length - 1]) {
    // getPerson("Jesse", "804-555-1234")
    getPerson("red", {phone: "804-555-1234"}, { age: 42 }, {name: "Jesse"})
    .then(console.log)
    .catch(console.log)
}