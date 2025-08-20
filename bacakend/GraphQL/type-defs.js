import gql from "graphql-tag";

const typeDefs = gql`
  type Product {
    _id: ID!
    name: String!
    price: Float!
    description: String!
    image: String
    category: String!
    company: String!
    colors: [String!]
    featured: Boolean!
    freeShipping: Boolean!
    inventory: Float
    averageRating: Float
    numOfReviews: Float
    seller: Seller!      
    createdAt: String
    updatedAt: String
  }

  type ProductPage {
    items: [Product!]!
    nmHits: Int!
    totalPages: Int!
    currentPage: Int!
    hasNextPage: Boolean!
    hasPrevPage: Boolean!
  }

  type Query {
    products(page: Int, search: String, price: String, sort: String): ProductPage!
    product(_id: ID!): Product
  }

  type Seller {
    _id: ID!
    name: String!
    email: String!
    company: String!
  }
`;

export default typeDefs;
