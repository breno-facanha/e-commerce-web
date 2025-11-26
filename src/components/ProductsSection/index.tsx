import { useEffect, useState } from "react";
import CustomButton from "../CustomButton";
import { productsMocks } from "@/mocks/products";
import { Product } from "@/interfaces/products";
import ProductCard from "../ProductCard";
import axios from "axios";
import instance from "@/services/api";
import requestApi from "@/helpers/requestApi";
import customToast from "@/helpers/customToast";

export default function ProductsSection(){
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        async function fetchProducts(){

            try {
                const response = await requestApi({
                    url: "/products",
                    method: "GET"
                })
    
                setProducts(response.data)
            } catch (error) {
                console.error(error)
                customToast.error({
                    message: "Erro ao buscar produtos"
                })
            }
            
        }
        
        fetchProducts()
    }, [])

    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                    Produtos em Destaque
                </h2>
                <CustomButton
                    variant="outline"
                    width="w-[100px]"
                >
                    Ver todos
                </CustomButton>
            </div>
            <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2
             max-sm:grid-cols-1 gap-6">
                {products.map((product) => {
                    return (
                        <ProductCard 
                            key={product.id}
                            product={product}
                        />
                    )
                })}
            </div>
        </section>
    )
}