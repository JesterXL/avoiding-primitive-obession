// type team
//     = Blue
//     | Red

// type person = {
//     team:team,
//     name:string,
//     age:int,
//     phone:string
// }

// type name = Name(string)
// type age = Age(int)
// type phone = Phone(string)

// let validateName = name =>
//     switch name {
//     | Name(name) => {
//         // can't be 0 characters
//         if(Js.String.length(name) < 1) {
//             Error("name cannot be less than 1 character")
//         // can't be a bunch-o-blanks
//         } else if(name -> Js.String2.split("") -> Js.Array2.every(letter => letter === "")) {
//             Error("name cannot be a series of blanks")
//         } else {
//             Ok(name)
//         }
//     }
//     }

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

// let validatePhone = phone =>
//     switch phone {
//     | Phone(phone) => if(Js.String2.length(phone) < 9) {
//             Error("phone cannot be less than 9 characters")
//         } else {
//             switch phone
//             -> Js.String2.trim
//             -> Js.String2.split("")
//             -> Js.Array2.every(isOkPhoneCharacter) {
//             | false => Error("phone can only be spaces, ), (, -, and numbers")
//             | true => Ok(phone)
//             }
//         }
//     }

// let validateAge = age =>
//     switch age {
//     | Age(age) =>
//         switch age > -1 {
//             | false => Error("age needs to be 0 or greater")
//             | true => Ok(age)
//         }
//     }

// let getPerson = (team:team, name:name, age:age, phone:phone) =>
//     validateName(name)
//     -> Belt.Result.flatMap( _ => validatePhone(phone) )
//     -> Belt.Result.flatMap( _ => validateAge(age) )
//     -> Belt.Result.flatMap( _ => Ok(
//         switch name {
//         | Name(name) => switch phone {
//             | Phone(phone) => switch age {
//                 |Age(age) => { team, name, phone, age}
//                 }
//             }
//         }
//     ))

// if (%raw(`process.argv[1].split('/')[process.argv[1].split('/').length - 1] === import.meta.url.split('/')[import.meta.url.split('/').length - 1]`)) {
//     switch getPerson(Red, Phone("804-555-1234"), Age(42), Name("Jesse")) {
//         | Error(reason) => Js.log2("person creation failed:", reason)
//         | Ok(person) => Js.log2("person:", person)
//     }
//     //getPerson(Red, {name: "Jesse"}, {phone: "804-555-1234"}, { age: "42" })
// }

// // let yup = a => {
// //     Js.log2("a:", a)
// //     Ok(a)
// // }

// // let now = b => {
// //     Js.log2("b:", b)
// //     Ok(b)
// // }

// // let whoa = c => {
// //     Js.log2("c:", c)
// //     Error("bleh")
// // }

// // let that = d => {
// //     Js.log2("d:", d)
// //     Ok(d)
// // }
// // switch yup("hey")
// //     -> Belt.Result.flatMap(now)
// //     -> Belt.Result.flatMap(whoa)
// //     -> Belt.Result.flatMap(that) {
// //         | Error(reason) => Js.log2("error:", reason)
// //         | Ok(val) => Js.log2("val:", val)
// //     }
