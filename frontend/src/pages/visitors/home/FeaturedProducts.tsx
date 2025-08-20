import { gql, useQuery } from '@apollo/client';
import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { SERVER_PATH } from '@/constants/paths';
import { Loader2 } from 'lucide-react';


const GET_PRODUCTS = gql`
  query {
    products(page: 1, search: "") {
        items {
            name
            price
            description
            image
            category
            company
            colors
            featured
            freeShipping
            inventory
            averageRating
            numOfReviews
            seller {
                _id
                name
                email
            }
            createdAt
            updatedAt
        }
        nmHits
        totalPages
        currentPage
        hasNextPage
    }
  }
`;

type Product = {
    _id: string
    name: string
    price: number
    description: string
    image: string
    category: string
    company: string
    colors: [string]
    featured: boolean
    freeShipping: boolean
    inventory: number
    averageRating: number
    numOfReviews: number
    seller: Seller
    createdAt: string
    updatedAt: string
}

type Seller = {
    _id: string
    name: String
    email: String
    company: String
}
type ProductPage = {
    items: Product[]
    nmHits: number
    totalPages: number
    currentPage: number
    hasNetPage: boolean
    hasPrevPage: boolean
}

const FeaturedProducts: React.FC = () => {
    const { loading, error, data } = useQuery<{ products: ProductPage }>(GET_PRODUCTS);

    if (loading) return <Loader2 className='animate-spin' size={64}/>;
    if (error) return <p className='bg-red-300 p-3 rounded-md text-start'>Error: {error.message}</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                data?.products.items.map((product, index) => <ProductCard key={index} {...product} />)
            }
        </div>
    );
}

export default FeaturedProducts

export function ProductCard(props: Product) {
    return (
        <Card className="w-100 p-0 overflow-hidden rounded-2xl shadow-md border">
            <div className="h-40 w-full overflow-hidden">
                <img
                    src={SERVER_PATH + props.image}
                    alt={props.name}
                    className="h-full w-full object-fit"
                />
            </div>
            <CardContent className="p-4 flex flex-col items-start">
                <h3 className="text-lg font-semibold">{props.name}</h3>
                <p className="text-sm text-gray-600">{props.price}</p>
            </CardContent>
        </Card>
    );
}