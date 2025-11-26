import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";

export default function NewsletterSection(){
    return (
        <section className="bg-[#21252b80] rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
                Fique por dentro das novidades
            </h3>
            <p className="mb-6 max-w-md mx-auto text-gray-400">
                Receba ofertas exclusivas, lançamentos e dicas diretamente no seu email
            </p>
            <div className="flex gap-4 max-w-md mx-auto max-sm:flex-col">
                <CustomInput 
                    type="email"
                    placeholder="Seu melhor email"
                />

                <CustomButton
                    className="w-[150px] text-sm" 
                >
                    Inscreva-se
                </CustomButton>
            </div>
        </section>
    )
}