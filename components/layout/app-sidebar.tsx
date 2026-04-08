"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton, useUser } from "@clerk/nextjs"
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
  BarChart3,
  DatabaseBackup,
  ChevronRight,
  Plus,
  Edit,
  LogIn,
  TrendingUp,
  Activity,
  DollarSign, CreditCard, Share2,
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
import { EnvironmentSwitcher } from "@/components/layout/environment-switcher"
import { usePermissions } from "@/hooks/use-permissions"
import { PERMISSIONS } from "@/lib/permissions"
import type { LucideIcon } from "lucide-react"

interface NavSubItem {
  title: string
  url: string
  icon: LucideIcon
  requiredPermission?: string | string[]
}

interface NavItem {
  title: string
  icon: LucideIcon
  url?: string
  items?: NavSubItem[]
  requiredPermission?: string | string[]
}

const navigationItems: NavItem[] = [
  {
    title: "Dashboards",
    icon: LayoutDashboard,
    items: [
      { title: "Summary", url: "/summary/legacy", icon: DatabaseBackup, requiredPermission: PERMISSIONS.SUMMARY_READ },
      { title: "Graph Analytics", url: "/analytics", icon: BarChart3, requiredPermission: PERMISSIONS.ANALYTICS_READ },
      { title: "Financial Flow", url: "/analytics/financial", icon: DollarSign, requiredPermission: PERMISSIONS.ANALYTICS_READ },
      { title: "Growth", url: "/analytics/growth", icon: TrendingUp, requiredPermission: PERMISSIONS.ANALYTICS_READ },
      { title: "Engagement & Games", url: "/analytics/engagement", icon: Activity, requiredPermission: PERMISSIONS.ANALYTICS_READ },
    ],
  },
  {
    title: "Players",
    url: "/players",
    icon: Users,
    requiredPermission: PERMISSIONS.PLAYERS_READ,
  },
  {
    title: "Cashflow",
    icon: Wallet,
    items: [
      { title: "Deposits", url: "/cashflow/deposits", icon: ArrowDownToLine, requiredPermission: PERMISSIONS.CASHFLOW_READ },
      { title: "Withdrawals", url: "/cashflow/withdrawals", icon: ArrowUpFromLine, requiredPermission: PERMISSIONS.CASHFLOW_READ },
      { title: "Credit", url: "/payments/crediting", icon: Plus, requiredPermission: PERMISSIONS.CASHFLOW_WRITE },
      { title: "Payments", url: "/payments/batch", icon: ArrowUpFromLine, requiredPermission: PERMISSIONS.BATCHES_READ },
    ],
  },
  {
    title: "Promos",
    icon: Megaphone,
    items: [
      { title: "New Promo", url: "/promos", icon: Plus, requiredPermission: PERMISSIONS.PROMOS_WRITE },
      { title: "Saved Promos", url: "/promos/saved", icon: Edit, requiredPermission: PERMISSIONS.PROMOS_READ },
    ],
  },
  // {
  //   title: "Bonus Engine",
  //   url: "/bonus-engine",
  //   icon: Gift,
  //   requiredPermission: PERMISSIONS.BONUS_READ,
  // },
  {
    title: "Games",
    url: "/games",
    icon: Gamepad,
    requiredPermission: PERMISSIONS.GAMES_READ,
  },
  {
    title: "Tpay",
    url: "/tpay",
    icon: CreditCard,
    requiredPermission: PERMISSIONS.TPAY_READ,
  },
  // {
  //   title: "Affiliate",
  //   icon: Share2,
  //   requiredPermission: PERMISSIONS.AFFILIATE_READ,
  //   items: [
  //     { title: "Affiliates", url: "/affiliate", icon: Users, requiredPermission: PERMISSIONS.AFFILIATE_READ },
  //     { title: "Payout Requests", url: "/affiliate/payout-requests", icon: ArrowUpFromLine, requiredPermission: PERMISSIONS.AFFILIATE_READ },
  //   ],
  // },
  {
    title: "Staff",
    url: "/staff",
    icon: UserCog,
    requiredPermission: PERMISSIONS.STAFF_READ,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { isSignedIn, user } = useUser()
  const { hasPermission, hasAnyPermission, isLoading: permissionsLoading } = usePermissions()

  const isActive = (url: string) => {
    if (url === "/") return pathname === url
    return pathname === url || pathname.startsWith(url + "/")
  }

  const isParentActive = (items: { url: string }[]) => {
    return items.some((item) => isActive(item.url))
  }

  const canAccess = (requiredPermission?: string | string[]): boolean => {
    if (!requiredPermission) return true
    if (permissionsLoading) return false
    if (Array.isArray(requiredPermission)) {
      return hasAnyPermission(requiredPermission)
    }
    return hasPermission(requiredPermission)
  }

  // Filter navigation items based on permissions
  const filteredItems = navigationItems
    .map((item) => {
      if (item.items) {
        const visibleChildren = item.items.filter((sub) => canAccess(sub.requiredPermission))
        if (visibleChildren.length === 0) return null
        return { ...item, items: visibleChildren }
      }
      if (!canAccess(item.requiredPermission)) return null
      return item
    })
    .filter((item): item is NavItem => item !== null)

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
              {filteredItems.map((item) =>
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
                      isActive={isActive(item.url!)}
                      tooltip={item.title}
                    >
                      <Link href={item.url!}>
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
          {isSignedIn ? (
            // Authenticated user - show UserButton
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
                  <span className="truncate font-semibold">
                    {user?.firstName || "User"}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    Manage profile
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : (
            // Unauthenticated user - show Login button
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link
                  href="/sign-in"
                  className="flex items-center gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <LogIn className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold">Sign In</span>
                    <span className="truncate text-xs text-muted-foreground">
                      Access your account
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Environment">
              <EnvironmentSwitcher />
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
