# CIOBANU_MARIUS_LICENTA_CTI

În acest fișier o să explic ce trebuie să faci pentru a rula proiectul Coldplay care include un backend în ASP.NET, un backend în Node.js și frontend-ul în React
# Cum să rulezi proiectul Coldplay: Chat

## Configurare și pregătire

### Cerințe preliminare

Asigură-te că ai instalate următoarele pe local:
- Node.js și npm (Node Package Manager)
- .NET SDK pentru ASP.NET
- Un editor de text sau un IDE (de exemplu, Visual Studio Code)

### 1. Clonează repository-ul

### 2. Backend ASP.NET

#### Configurare și rulare

1. Navighează în directorul backend ASP.NET:

2. Instalează dependințele:

   ```bash
   dotnet restore
   ```

3. Pornirea serverului:

   ```bash
   dotnet run
   ```

   Serverul ASP.NET va rula pe `http://localhost:5022`.

### 3. Backend Node.js

#### Configurare și rulare

1. Navighează în directorul backend Node.js:

   ```bash
   cd backend-nodejs
   ```

2. Instalează dependințele:

   ```bash
   npm install
   ```

3. Pornirea serverului:

   ```bash
   node index.js 
   ```

   Serverul Node.js va rula pe `http://localhost:4444`.

### 4. Frontend React

#### Configurare și rulare

1. Navighează în directorul frontend React:

   ```bash
   cd frontend
   ```

2. Instalează dependințele:

   ```bash
   npm install
   ```

3. Pornirea aplicației React:

   ```bash
   npm start
   ```

   Aplicația frontend React va rula pe `http://localhost:3000`.

## Utilizare

După ce toate serverele sunt pornite, accesează `http://localhost:3000` în browser pentru a utiliza aplicația Coldplay Chat. Poți crea cont, te poți autentifica și te poți conecta la chatroom-uri pentru a trimite și a primi mesaje în timp real.

---
