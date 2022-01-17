// type team
//     = Blue
//     | Red

// type person = {
//     team:team,
//     name:string,
//     age:int,
//     phone:string
// }

// type name = string
// type age = int
// type phone = string

// let validateName = name => {
//     // can't be 0 characters
//     if(Js.String.length(name) < 1) {
//         Error("name cannot be less than 1 character")
//     // can't be a bunch-o-blanks
//     } else if(name -> Js.String2.split("") -> Js.Array2.every(letter => letter === "")) {
//         Error("name cannot be a series of blanks")
//     } else {
//         Ok(name)
//     }
// }

// let isOkPhoneCharacter = character => {
//     if(character === ")" || character === "(" || character === "-") {
//         true
//     } else {
//         switch Belt.Int.fromString(character) {
//             | None => false
//             | Some(_) => true 
//         }
//     }
// }

// let validatePhone = phone => {
//     if(Js.String2.length(phone) < 9) {
//         Error("phone cannot be less than 9 characters")
//     } else {
//         switch phone
//         -> Js.String2.trim
//         -> Js.String2.split("")
//         -> Js.Array2.every(isOkPhoneCharacter) {
//         | false => Error("phone can only be spaces, ), (, -, and numbers")
//         | true => Ok(phone)
//         }
//     }
// }

// let validateAge = age => {
//     switch age > -1 {
//     | false => Error("age needs to be 0 or greater")
//     | true => Ok(age)
//     }
// }

// let getPerson = (team:team, name:name, age:age, phone:phone) =>
//     validateName(name)
//     -> Belt.Result.flatMap( _ => validatePhone(phone) )
//     -> Belt.Result.flatMap( _ => validateAge(age) )
//     -> Belt.Result.flatMap( _ => Ok(
//         { team, name, phone, age }
//     ))

// if (%raw(`process.argv[1].split('/')[process.argv[1].split('/').length - 1] === import.meta.url.split('/')[import.meta.url.split('/').length - 1]`)) {
//     switch getPerson(Red, "804-555-1234", "Jesse", 42) {
//         | Error(reason) => Js.log2("person creation failed:", reason)
//         | Ok(person) => Js.log2("person:", person)
//     }
//     //getPerson(Red, {name: "Jesse"}, {phone: "804-555-1234"}, { age: "42" })
// }