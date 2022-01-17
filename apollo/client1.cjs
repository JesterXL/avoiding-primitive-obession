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
                age,
                name,
                phone
            }
        },
    })

savePerson("red", "771-555-1234", 13, "Cow")
.then(console.log)
.catch(console.log)