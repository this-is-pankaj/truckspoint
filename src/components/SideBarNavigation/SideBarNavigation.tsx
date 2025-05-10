"use client"

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  Network,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "../ui/sidebar"
import { ComponentProps, Suspense, useEffect, useState } from "react"
import { NavMain } from "./NavMain"
import { NavProjects } from "./NavProjects"
import { NavUser } from "./NavUser"
import Image from "next/image"
import { getAllTenantsAction } from "@/app/actions/tenants.action"
import { getActiveTenantId } from "@/app/actions/auth.action"
import { TenantSummary } from "@/lib/types"
import { TenantSwitcher } from "./TenantSwitcher"


// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Tenants",
      url: "/tenants",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Manage Tenants",
          url: "/tenants",
        },
        {
          title: "Create Tenant",
          url: "/tenants/new",
        },
      ],
    },
    {
      title: "Branches",
      url: "/branches",
      icon: Network,
      items: [
        {
          title: "Manage Branches",
          url: "/branches",
        },
        {
          title: "Create Branch",
          url: "/branches/new",
        },
      ],
    },
    {
      title: "Clients",
      url: "/clients",
      icon: Bot,
      items: [
        {
          title: "Manage Clients",
          url: "/clients",
        },
        {
          title: "Create Client",
          url: "/clients/new",
        },
      ],
    },
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const [tenants, setTenants] = useState<{all: TenantSummary[]; active: TenantSummary | null}>({all: [], active: null})

  useEffect(() => {
    const fetchData = async () => {
      const { status, data } = await getAllTenantsAction()
      if(status !== 200 || !data) {
        setTenants({all: [], active: null})
        return
      }
      const activeTenantId = await getActiveTenantId()
      const activeTenant = data.find((tenant: TenantSummary) => tenant.tenantId === activeTenantId)
      setTenants({all: data, active: activeTenant || data[0]})
    }
    fetchData()
  }, [])
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Suspense fallback={<div className="h-8 w-8 animate-pulse bg-muted rounded-full" />}>
          <TenantSwitcher teams={tenants.all} active={tenants.active} key={tenants.all.length} />
        </Suspense>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
