# Ghost OAuth2 Playground

Progetto frontend sviluppato con **React**, **Vite**, **TanStack Router**, **TanStack Query** e **Material UI**, integrato con **Microsoft Entra ID** per l'autenticazione OAuth2.

---

## 🚀 Avvio del progetto

### 1. Clona il repository

```bash
git clone https://github.com/pciaco/Consuntivi-FE.git
cd Consuntivi-FE
```

### 2. Installa le dipendenze

```bash
npm install
```

### 3. Configura le variabili ambiente

Copia il file `.env.example` in `.env` e inserisci i tuoi valori reali:

```bash
cp .env.example .env
```

### 4. Avvia il server di sviluppo

```bash
npm run dev
```

Apri [http://localhost:3100](http://localhost:3100) nel browser per vedere l'app in esecuzione.

> 🔄 Il progetto è configurato per usare la porta `3100`. Se vuoi modificarla, puoi farlo nel file `vite.config.ts`.

---

## ⚙️ Variabili ambiente richieste

Nel file `.env`, definisci i parametri per l’autenticazione Microsoft:

```dotenv
VITE_AUTH_CLIENT_ID=your-client-id
VITE_AUTH_TENANT_ID=your-tenant-id
VITE_AUTH_REDIRECT_URI=http://localhost:3100/protected
VITE_AUTH_LOGOUT_URI=http://localhost:3100
```

---

## 🏗️ Build per produzione

```bash
npm run build
```

Compila l'applicazione per la produzione nella cartella `dist`.  
Il codice è minificato e ottimizzato per il deploy.

---

## 🔐 Autenticazione con Microsoft Entra ID

L’app utilizza `@iad-os/react-ghost-auth` per gestire l’autenticazione OAuth2 tramite Microsoft Entra ID.

Assicurati che:

- Il `client_id` e `tenant_id` siano corretti
- Il `redirect_uri` sia autorizzato nel portale Azure

---

## 📚 Documentazione utile

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/)
- [Material UI](https://mui.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [TanStack Router](https://tanstack.com/router/latest)
- [Formik](https://formik.org/docs/overview)
- [Preact Signals](https://github.com/preactjs/signals)

---

## 👤 Autore

Creato e mantenuto da [@pciaco](https://github.com/pciaco)
