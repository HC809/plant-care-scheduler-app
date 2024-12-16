import { Leaf, ClipboardList } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    //SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import logo from '../../public/plant-logo.png';
import Image from 'next/image';

const items = [
    {
        title: "My Plants",
        url: "/",
        icon: Leaf,
    },
    {
        title: "Watering History",
        url: "/watering-history",
        icon: ClipboardList,
    }
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="flex justify-center items-center h-32">
                <Image
                    src={logo.src}
                    width={80}
                    height={80}
                    className="hidden md:block"
                    alt="logo-white"
                    priority={true}
                />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Hector Caballero - Plant Care Scheduler</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            {/* <SidebarFooter>
                Hector Caballero
            </SidebarFooter> */}
        </Sidebar>
    )
}
