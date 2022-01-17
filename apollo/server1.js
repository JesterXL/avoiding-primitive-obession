const { ApolloServer, gql } = require('apollo-server')
const fs = require('fs')

const schema1 = fs.readFileSync('./schema1.graphql').toString()
const typeDefs = gql`${schema1}`

const people = [
    { team: 'red', name: 'Jesse', age: 42, phone: '804-555-1234' },
    { team: 'red', name: 'Albus', age: 6, phone: '804-555-1234' },
    { team: 'blue', name: 'Brandy', age: 42, phone: '678-555-4321' }
]

const resolvers = {
    Mutation: {
        createPerson: (parent, args, context, info) => {
            console.log("createPerson, args:", args)
            return people[0]
        }
    },
    Query: {
        getPeople: () => people
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})