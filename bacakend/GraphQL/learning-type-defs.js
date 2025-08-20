import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: ID
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User!]
    favoriteMovies: [Movie!]
  }

  type Movie {
    id: ID
    name: String!
    released: String!
    IsNetflix: Boolean!
  }

  type Query {
    users: [User!]!
    user(id:ID):User

    movies: [Movie!]!
    movie(name:String):Movie!
  }

    input _User {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = PAKISTAN
  }
    type Mutation {
    createUser(input: _User) : User!
    updateUser(input: _User,_id: ID) : User!
    deleteUser(_id: ID) : ID
    }

  enum Nationality{
    CANADA
    CHILI
    PAKISTAN
    US
    ENGLAND
  }
`;

export default typeDefs;