import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";

function removeUndefined(obj: any): any{
    if(obj === null || obj === undefined) return null;

    if(Array.isArray(obj)) {
        return obj.map(removeUndefined)
    }

    const cleaned: any = {};
    for (const key in obj){
        if(obj[key] !== undefined){
            cleaned[key] = removeUndefined(obj[key])
        }
    }

    return cleaned;
}

export function withAuth(gssp?: GetServerSideProps) {
    return async (context: GetServerSidePropsContext) => {
        const session = await getServerSession(context.req, context.res, authOptions)
        
        if(!session) {
            return {
                redirect: {
                    destination: "/login",
                    permanent: false
                }
            }
        }

        const cleanedSession = {
            user: {
                id: session.user?.id || null,
                email: session.user?.email || null,
                name: session.user?.name || null,
                image: session.user?.image || null
            },
            accessToken: session.accessToken || null,
            expires: session.expires || null
        }

        if(gssp) {
            const gsspData = await gssp(context)

            if('props' in gsspData) {
                return {
                    props: {
                        ...gsspData.props,
                        session: cleanedSession
                    }
                }
            }

            return gsspData
        }

        return {
            props: {
                session: cleanedSession
            }
        }
    }
}