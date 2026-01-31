import {
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub, SidebarMenuSubButton,
    SidebarMenuSubItem
} from "@/components/ui/sidebar";
import { useRouter } from 'next/navigation'
import { Tag, Plus, Edit } from "lucide-react";

export default function PromoLayout() {
    const router = useRouter()
    return (
        <SidebarMenuItem>
            <SidebarMenuButton className="gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <Tag className="h-4 w-4" />
                Promos
            </SidebarMenuButton>
            <SidebarMenuSub>
                <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                        onClick={() => router.push('/promos')}
                        className="gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                        <Plus className="h-4 w-4" />
                        New Promo
                    </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                        onClick={() => router.push('/promos/saved')}
                        className="gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                        <Edit className="h-4 w-4" />
                        Saved Promos
                    </SidebarMenuSubButton>
                </SidebarMenuSubItem>
            </SidebarMenuSub>
        </SidebarMenuItem>
    )
}