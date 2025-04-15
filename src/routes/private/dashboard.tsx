import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material'

// 🔐 Supponiamo che tu abbia un hook di auth per ottenere l'utente loggato
import { useAuth } from '../../hooks/useAuth'

export const Route = createFileRoute('/private/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useAuth() // user.id è l'Object ID di Entra ID

  const { data, isLoading, isError } = useQuery({
    queryKey: ['consuntivi', user?.id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/consuntivi?userId=${user?.id}`)
      if (!res.ok) throw new Error('Errore nel fetch dei consuntivi')
      return res.json()
    },
    enabled: !!user?.id,
  })

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {isLoading && <CircularProgress />}
      {isError && (
        <Alert severity="error">Errore nel caricamento dei consuntivi</Alert>
      )}

      {data && (
        <Box mt={3}>
          {data.length === 0 ? (
            <Typography>Nessun consuntivo disponibile.</Typography>
          ) : (
            data.map((consuntivo: any) => (
              <Paper key={consuntivo.id} elevation={2} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6">
                  {consuntivo.anno} - Mese {consuntivo.mese}
                </Typography>
                <Typography variant="body2">Stato: {consuntivo.stato}</Typography>
              </Paper>
            ))
          )}
        </Box>
      )}
    </Box>
  )
}
