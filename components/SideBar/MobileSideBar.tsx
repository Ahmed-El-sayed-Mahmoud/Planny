import { Menu } from "lucide-react"
import { SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet"
import SideBar from "./SideBar"
import { Sheet } from "../ui/sheet"

export const MobileSidebar = () => {
    return (
        <div className="block lg:hidden">
            <Sheet>
                <SheetTrigger>
                    <Menu className="text-black" />
                </SheetTrigger>
                <SheetContent side={"left"} className="w-[80%] sm:w-[80%]">
                    <SideBar/>
                </SheetContent>
            </Sheet>
        </div>
    )
}