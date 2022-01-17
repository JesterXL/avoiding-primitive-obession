/*
    This is a failed experiement. TypeScript makes it extremely difficult
    to make a Result, then chain it with pipelines... it's just not ready
    for this level of FP.
*/
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

type Ok<a> = {
    value: a
}

type Err = {
    reason: string
}

type Result<a>
    = Ok<a>
    | Err

function isOk<a>(a:unknown): a is Ok<a> {
    return typeof (a as Ok<a>)?.value === 'string'
}

function isErr(a:unknown): a is Err {
    return typeof (a as Err)?.reason === 'string'
}

function makeOk<a>(value:a):Ok<a> { 
    return { value: value }
}

function andThen<a>(fn:<a>(something:a) => a, result:Result<a>):Result<a> {
    if(isOk(result)) {
        let unbox = (result as Ok<a>).value
        let functionResult = fn(unbox)
        let newOk = makeOk(functionResult)
        return newOk
    } else {
        return result
    }
}

const getPerson = (team:Team, name:Name, age:Age, phone:Phone):Promise<Person> =>
    validateName(name)
    |> andThen (_ => validateAge(age))
    |> andThen (_ => validatePhone(phone))
    |> andThen (_ => 
        ([ { name }, { age }, { phone } ]) => makeOk({ name, age, phone, team })
    )


const validateName = (nameType:Name):Result<Name> => {
    // can't be 0 characters
    if(nameType.name.length < 1) {
        return Err('name cannot be less than 1 character')
    }
    return Ok(nameType)
}
    Promise.resolve(nameType)
    .then(
        nameType => { 
            
                return Promise.reject(new Error())
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