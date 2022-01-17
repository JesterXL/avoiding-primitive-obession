const fetch = require('cross-fetch')
const { ApolloClient, HttpLink, gql } = require("@apollo/client/core")
const { InMemoryCache, Reference } = require('@apollo/client/cache')

const client = new ApolloClient({
    cache: new InMemoryCache({}),
    uri: "http://localhost:4000/graphql",
    link: new HttpLink({ uri: 'http://localhost:4000/graphql', fetch })
})

const getPeople = () =>
    client
    .query({
        query: gql`
            query Query {
                getPeople {
                    team
                    name
                    age
                    phone
                }
            }
        `
    })

const Name = name => ({ name })
const Age = age => ({ age })
const Phone = phone => ({ phone })

const savePerson = (team, name, age, phone) =>
    client
    .mutate({
        mutation: gql`mutation Mutation($person: PersonInput) {
                createPerson(person: $person) {
                    team
                    name
                    age
                    phone
                }
        }`,
        variables: { 
            person: {
                team,
                name,
                age,
                phone
            }
        },
    })

savePerson("red", Name("Cow"), Age(13),  Phone("771-555-1234"))
.then(console.log)
// .catch(error => console.log(error.networkError.result))
.catch(error => console.log(error))

// 'graphQLErrors',
//   'clientErrors',
//   'networkError',
//   'message',
//   'extraInfo'