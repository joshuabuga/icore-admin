"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import {
  Users,
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  Megaphone,
  UserCog,
  LayoutDashboard,
  Gift,
  Gamepad,
    DatabaseBackup,
  ChevronRight, Plus, Edit,
} from "lucide-react"
import Image from "next/image"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import ThemeToggle from "@/components/providers/ThemeToggle"

const navigationItems = [
  {
    title: "Summary",
    icon: LayoutDashboard,
    items : [
      { title: "Summary Metabase", url: "/summary", icon: LayoutDashboard },
      { title: "Legacy Dashboard", url: "/summary/legacy", icon: DatabaseBackup },
    ]
  },
  {
    title: "Players",
    url: "/players",
    icon: Users,
  },
  {
    title: "Cashflow",
    icon: Wallet,
    items: [
      { title: "Deposits", url: "/cashflow/deposits", icon: ArrowDownToLine },
      { title: "Withdrawals", url: "/cashflow/withdrawals", icon: ArrowUpFromLine },
      { title: "Credit", url:"/payments/crediting",icon:Plus },
      { title: "Payments", url:"/payments/batch",icon:ArrowUpFromLine },
    ],
  },
  {
    title: "Promos",
    icon: Megaphone,
    items: [
      { title: "New Promo", url: "/promos", icon: Plus },
      { title: "Saved Promos", url: "/promos/saved", icon: Edit },
    ],
  },
  {
    title: "Bonus Engine",
    url: "/bonus-engine",
    icon: Gift,
  },
  {
    title: "Games",
    url: "/games",
    icon: Gamepad,
  },
  {
    title: "Staff",
    url: "/staff",
    icon: UserCog,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  const isActive = (url: string) => {
    if (url === "/") return pathname === url
    return pathname === url || pathname.startsWith(url + "/")
  }

  const isParentActive = (items: { url: string }[]) => {
    return items.some((item) => isActive(item.url))
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/summary">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
                  <Image src="/logo.png" alt="Tucheze Logo" width={24} height={24} />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Tucheze</span>
                  <span className="truncate text-xs">Admin Console</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) =>
                item.items ? (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={isParentActive(item.items)}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                          <item.icon />
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isActive(subItem.url)}
                              >
                                <Link href={subItem.url}>
                                  <subItem.icon />
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      tooltip={item.title}
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="cursor-default hover:bg-transparent">
              <UserButton
                afterSignOutUrl="/sign-in"
                appearance={{
                  elements: {
                    avatarBox: "size-8",
                  },
                }}
              />
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">Account</span>
                <span className="truncate text-xs text-muted-foreground">
                  Manage profile
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Toggle theme">
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <span className="group-data-[collapsible=icon]:hidden">Theme</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
