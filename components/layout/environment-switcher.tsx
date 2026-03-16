"use client"

import { useEnvironmentStore, type Environment } from "@/lib/stores/environment-store"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Server } from "lucide-react"
import { useRouter } from "next/navigation"

export function EnvironmentSwitcher() {
  const { environment, setEnvironment } = useEnvironmentStore()
  const router = useRouter()

  const handleChange = (value: Environment) => {
    setEnvironment(value)
    router.refresh()
  }

  return (
    <div className="flex items-center gap-2">
      <Server className="size-4 shrink-0" />
      <Select value={environment} onValueChange={handleChange}>
        <SelectTrigger className="h-8 flex-1 text-xs group-data-[collapsible=icon]:hidden">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="production">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-green-500" />
              Production
            </div>
          </SelectItem>
          <SelectItem value="staging">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-amber-500" />
              Staging
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}