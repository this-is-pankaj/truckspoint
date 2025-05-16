"use client"

import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useState } from "react"
import { switchTenantAction } from "@/app/actions/tenants.action"
import { TenantSummary } from "@/lib/types"
import Link from "next/link"

export type TenantSwitcherProps = {
  teams: TenantSummary[]
  active: TenantSummary | null
}

export function TenantSwitcher({ teams, active }: TenantSwitcherProps) {
  const { isMobile } = useSidebar()

  const [activeTenant, setActiveTenant] = useState(active || teams[0])

  const handleTeamChange = async (tenant: any) => {
    try {
      const data = await switchTenantAction(tenant.tenantId)
      console.log("Tenant switched", data)
      setActiveTenant(tenant)
    } catch (error) {
      alert('Unable to switch tenant')
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {/* <activeTenant.logo className="size-4" /> */}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTenant?.name || 'No active tenant'}
                </span>
                <span className="truncate text-xs">{activeTenant?.description || ''}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.tenantId}
                onClick={() => handleTeamChange(team)}
                className="gap-2 p-2"
                disabled={activeTenant.tenantId === team.tenantId}
              >
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <Link href="/tenants/new" className="flex items-center">
                <Plus className="size-4" />
                <span className="font-medium text-muted-foreground">Add tenant</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
