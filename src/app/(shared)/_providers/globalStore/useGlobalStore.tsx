import { useContext } from "react"
import { GlobalStore } from "./providers"

export default function useGlobalStore() {
  const { tenants } = useContext(GlobalStore)
  return {
    tenants,
  }
}
