import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import requestApi from "@/helpers/requestApi";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { FiLoader, FiXCircle } from "react-icons/fi";
import { RiLoader4Line } from "react-icons/ri";

export default function ActiveUser(){
    const [ status, setStatus ] = useState('loading'); // loading, success, error

    const router = useRouter();

    const { token } = router.query;
    
    useEffect(() => {
        if(!token) return;

        async function activeUSer(){
            try {
                setStatus('loading');
                const response = await requestApi({
                    url: '/active-user',
                    method: "POST",
                    data: {
                        token
                    }
                })
                setStatus('success');
                console.log('Breno: ',response);
            } catch (error) {
                console.error(error);
                setStatus('error');
            }
        }

        activeUSer();
    }, [token]);
    return (
       <div className="min-h-screen flex items-center justify-center
        bg-[#111418] overflow-hidden relative
       ">
        <div className="relative z-10 w-full max-w-md px-4">
            <Card className="backdrop-blur-sm">
                <CardHeader className="mx-auto space-y-2">
                    <div className="mx-auto mb-4">
                        <div className={
                            cn("w-20 h-20 rounded-full  flex items-center justify-center text-[45px]", 
                            status === 'loading' && "bg-[#5593f7]/10 text-[#5593f7]",
                            status === 'success' && "bg-green-500/10 text-green-500",
                            status === 'error' && "bg-red-500/10 text-red-500",
                            )
                         }>
                            {status === 'loading' && (
                                <RiLoader4Line className="animate-spin"/>
                            )}

                            {status === 'success' && (
                                <CiCircleCheck />   
                            )}

                            {status === 'error' && (
                                <FiXCircle /> 
                            )}

                        </div>
                    </div>

                    <CardTitle className="text-2xl font-bold text-center">
                        {status === 'loading' && 'Ativando sua conta...'}
                        {status === 'success' && 'Conta ativada com sucesso!'}
                        {status === 'error' && 'Erro ao ativar a conta!'}
                    </CardTitle>
                    <CardDescription className="text-center text-gray-400">
                        {status === 'loading' && 'Por favor, aguarde enquanto verificamos suas informações.'}
                        {status === 'success' && 'Sua conta foi ativada com sucesso. Agora você pode fazer login e aproveitar nossos serviços.'}
                        {status === 'error' && 'Ocorreu um erro ao ativar sua conta. Por favor, verifique o link de ativação ou entre em contato com o suporte.'}
                    </CardDescription>
                    <CardContent className="space-y-4">
                        { status === 'success' && (
                            <Button className="w-full bg-[#5593f7]" asChild>
                                <Link href="/login" className="w-full">
                                    Ir para o Login
                                </Link>
                            </Button> 
                        )}

                        { status === 'error' && (
                            <div className="space-y-3">
                                <Button asChild variant="outline" className="w-full">
                                    <Link href="/register">
                                        Criar nova conta
                                    </Link>
                                </Button>
                                <Button asChild variant="ghost" className="w-full">
                                    <Link href="/login">
                                        Gerar novo link
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
       </div>
    )
}