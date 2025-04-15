import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Button,
  Tabs,
  Tab,
} from '@mui/material'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/private/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [tabIndex, setTabIndex] = useState(0)

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }

  const { data: consuntivi, isLoading: loadingConsuntivi, isError: errorConsuntivi } = useQuery({
    queryKey: ['consuntivi', user?.id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/consuntivi?userId=${user?.id}`)
      if (!res.ok) throw new Error('Errore nel fetch dei consuntivi')
      return res.json()
    },
    enabled: !!user?.id,
  })

  const { data: eventi, isLoading: loadingEventi, isError: errorEventi } = useQuery({
    queryKey: ['eventi', user?.id],
    queryFn: async () => {
      const now = new Date()
      const anno = now.getFullYear()
      const mese = now.getMonth() + 1
      const res = await fetch(`http://localhost:3001/eventi?userId=${user?.id}&anno=${anno}&mese=${mese}`)
      if (!res.ok) throw new Error('Errore nel fetch degli eventi')
      return res.json()
    },
    enabled: !!user?.id && tabIndex === 1, // solo quando è selezionato il tab Eventi
  })

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Dashboard</Typography>
        <Button
          variant="outlined"
          onClick={() => navigate({ to: '/private/users' })}
        >
          Vai a User Info
        </Button>
      </Box>

      <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mt: 3 }}>
        <Tab label="Consuntivi" />
        <Tab label="Eventi" />
      </Tabs>

      {/* TAB 0: Consuntivi */}
      {tabIndex === 0 && (
        <Box mt={2}>
          {loadingConsuntivi && <CircularProgress />}
          {errorConsuntivi && <Alert severity="error">Errore nel caricamento dei consuntivi</Alert>}
          {consuntivi && (
            <>
              {consuntivi.length === 0 ? (
                <Typography>Nessun consuntivo disponibile.</Typography>
              ) : (
                consuntivi.map((c: any) => (
                  <Paper key={c.id} elevation={2} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h6">{c.anno} - Mese {c.mese}</Typography>
                    <Typography variant="body2">Stato: {c.stato}</Typography>
                  </Paper>
                ))
              )}
            </>
          )}
        </Box>
      )}

      {/* TAB 1: Eventi */}
      {tabIndex === 1 && (
        <Box mt={2}>
          {loadingEventi && <CircularProgress />}
          {errorEventi && <Alert severity="error">Errore nel caricamento degli eventi</Alert>}
          {eventi && (
            <>
              {eventi.length === 0 ? (
                <Typography>Nessun evento per il mese corrente.</Typography>
              ) : (
                eventi.map((e: any) => (
                  <Paper key={e.id} elevation={2} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="subtitle1">
                      {new Date(e.data).toLocaleDateString()} – {e.tipoEvento?.nome}
                    </Typography>
                    <Typography variant="body2">{e.ore} ore</Typography>
                    {e.descrizione && <Typography variant="body2">Note: {e.descrizione}</Typography>}
                  </Paper>
                ))
              )}
            </>
          )}
        </Box>
      )}
    </Box>
  )
}
