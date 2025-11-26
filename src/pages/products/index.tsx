import AsideFilters from "@/components/AsideFilters";
import CustomInput from "@/components/CustomInput";
import { PageWrapper } from "@/components/PageWrapper";
import ProductsSection from "@/components/ProductsSection";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { withAuth } from "@/lib/withAuth";
import { IoSearch } from "react-icons/io5";

export default function ProductsPage(){
    return (
        <PageWrapper.Root>
            <PageWrapper.Header />

            <PageWrapper.Content
                title="Todos os Produtos"
                subtitle="8 produtos encontrados"
            >
                <div className="mb-8 space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <CustomInput
                            type="text"
                            placeholder="Buscar produtos"
                            icon={<IoSearch />}
                        />

                        <Select>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Ordenar por" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="name">Nome A-Z</SelectItem>
                                <SelectItem value="price-low">Menor preço</SelectItem>
                                <SelectItem value="price-high">Maior preço</SelectItem>
                                <SelectItem value="rating">Melhor avaliação</SelectItem>
                                <SelectItem value="reviews">Mais avaliados</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex gap-8">
                    <AsideFilters />
                    <ProductsSection />
                </div>
            </PageWrapper.Content>
        </PageWrapper.Root>
    )
}

export const getServerSideProps = withAuth()