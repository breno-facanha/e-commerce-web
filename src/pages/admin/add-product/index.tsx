import CustomButton from "@/components/CustomButton";
import { PageWrapper } from "@/components/PageWrapper";
import requestApi from "@/helpers/requestApi";
import { withAuth } from "@/lib/withAuth";

export default function AddProduct(){

    async function handleExecute(){
        try {
            const response = await requestApi({
                url: "/products/service",
                method: "GET",
            })
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao adicionar o produto:", error);
        }
    }
    return (
        <PageWrapper.Root sidebar={true}>
            <PageWrapper.Content>
                <p>Add Product</p>
                <CustomButton
                    onClick={handleExecute}
                >
                    Executar
                </CustomButton>
            </PageWrapper.Content>
        </PageWrapper.Root>
    )
}

export const getServerSideProps = withAuth()