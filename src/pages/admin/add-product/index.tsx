import { PageWrapper } from "@/components/PageWrapper";
import { withAuth } from "@/lib/withAuth";

export default function AddProduct(){
    return (
        <PageWrapper.Root sidebar={true}>
            <PageWrapper.Content>
                <p>Add Product</p>
            </PageWrapper.Content>
        </PageWrapper.Root>
    )
}

export const getServerSideProps = withAuth()