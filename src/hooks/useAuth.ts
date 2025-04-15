import { useUserInfo } from '@iad-os/react-ghost-auth'

export function useAuth() {
  const userInfo = useUserInfo()

  return {
    user: {
      id: userInfo?.oid, // Object ID Entra ID
      name: userInfo?.name,
      email: userInfo?.email,
      raw: userInfo,
    },
    isAuthenticated: !!userInfo,
  }
}
