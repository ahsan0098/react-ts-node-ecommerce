/*===========*****===========imports===========*****===========*/
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { GQL_PATH } from "@/constants/paths";
/*===========*****===========imports===========*****===========*/


/*===========*****===========client===========*****===========*/
const client = new ApolloClient({
    uri: GQL_PATH, // your GraphQL server endpoint
    cache: new InMemoryCache(),
});
/*===========*****===========client===========*****===========*/


/*===========*****===========props===========*****===========*/
type Props = {
    children: React.ReactNode;
};
/*===========*****===========props===========*****===========*/


/*===========*****===========provider===========*****===========*/
const ApolloAppProvider: React.FC<Props> = ({ children }) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
/*===========*****===========provider===========*****===========*/


/*===========*****===========export===========*****===========*/
export default ApolloAppProvider;