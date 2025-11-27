import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthContext"
import Image from "next/image"
import { Button } from "../ui/button"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"
import { useCookies } from "react-cookie"

export function AdminSidebar(){
    const { user } = useAuth()
    const [cookies , setCookies] = useCookies(['sidebar'])
    const [open, setOpen] = useState(false)

    useEffect(() => {
      setOpen(cookies.sidebar)
    }, [])

    function handleSwitchSidebar(){
        setCookies('sidebar', open ? "false" : "true")
        setOpen(!open)
    }

    return (
        <aside className={cn(
            "border-r bg-[#111418] transition-all durantion-300 border-[#343942]",
            cookies.sidebar ? "w-64" : "w-16"
        )}>
            <div className="border-b p-3 border-[#343942]">
                <div className={`flex items-center gap-2
                     ${cookies.sidebar ? "justify-between" : "flex-col"}`}>
                    
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <>
                                {user?.image ? (
                                    <Image
                                    src={user.image}
                                    alt="imagem do usuário"
                                    width={40}
                                    height={40}
                                    className="w-10 h-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <button className="w-10 h-10 rounded-full bg-gradient-to-r
                                    from-[#5593f7] to-[#1d47d7] flex items-center justify-center
                                    text-white font-semibold">
                                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                                    </button>
                                )}

                                {cookies.sidebar && (
                                    <div className="flex-1 text-left">
                                        <p className="text-sm font-medium">{user?.name}</p>
                                        <p className="text-xs text-[#848E9C]">{user?.email}</p>
                                    </div>
                                )}
                            </>
                        </DropdownMenuTrigger>
                    </DropdownMenu>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleSwitchSidebar}
                        className={cookies.sidebar ? "h-8 w-8" : "h-7 w-7"}
                    >
                        {cookies.sidebar ? <LuChevronLeft /> : <LuChevronRight />}
                    </Button>
                </div>
            </div>
        </aside>
    )
}