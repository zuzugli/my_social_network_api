# My Social Network API

API REST Node.js/Express/MongoDB pour un mini réseau social (authentification, événements, groupes, fils de discussion, albums).

## Installation

```bash
npm install
```

## Configuration (.env)

1) Copier `.env.example` vers `.env`
2) Remplir les variables avec des valeurs réelles

Exemple :

```
PORT=3000
DATABASE_URI=mongodb+srv://<user>:<password>@<cluster>/<db>
JWT_SECRET=cle_tres_longue_et_securisee
JWT_EXPIRES_IN=90d
```

Notes :
- `JWT_SECRET` doit être long et unique (ne pas versionner `.env`).
- `DATABASE_URI` doit pointer vers une base MongoDB accessible.

## Démarrage

```bash
node server.js
```

## Base URL

```
http://localhost:3000
```

## Endpoints

- `POST /api/users/signup`
- `POST /api/users/login`
- `GET /api/events`
- `POST /api/events`
- `POST /api/events/:id/shoppingList`
- `GET /api/groups`
- `POST /api/groups`
- `POST /api/threads`
- `GET /api/threads/:id`
- `POST /api/threads/:id/messages`
- `POST /api/albums`
- `POST /api/albums/:id/photos`

## Requêtes Postman (cheminement conseillé)

### Préparation

Variables d’environnement :
- `baseUrl` = `http://localhost:3000`
- `token` = (vide)

Header sur routes protégées :
- `Authorization: Bearer {{token}}`

### 1) Signup

**POST** `{{baseUrl}}/api/users/signup`

```json
{
  "nom": "Gliniak",
  "prenom": "Zuzanna",
  "email": "zuzanna.gliniak@mail.com",
  "password": "motdepasse"
}
```

### 2) Login (récupérer token)

**POST** `{{baseUrl}}/api/users/login`

```json
{
  "email": "zuzanna.gliniak@mail.com",
  "password": "motdepasse"
}
```

Récupération du token :
- Copier `token` depuis la réponse du login
- Coller dans Postman > Authorization > Bearer Token

### 3) Créer un événement

**POST** `{{baseUrl}}/api/events`

```json
{
  "nom": "Soirée nouvel an",
  "description": "Soirée pour fêter le nouvel an",
  "dateDebut": "2026-02-10T18:00:00.000Z",
  "dateFin": "2026-02-10T23:00:00.000Z",
  "lieu": "Paris",
  "prive": false
}
```

### 4) Lister les événements

**GET** `{{baseUrl}}/api/events`

### 5) Ajouter à la shopping list

**POST** `{{baseUrl}}/api/events/{{eventId}}/shoppingList`

```json
{
  "objet": "coca",
  "quantite": 3
}
```

### 6) Créer un groupe

**POST** `{{baseUrl}}/api/groups`

```json
{
  "nom": "Groupe API",
  "description": "Groupe de partage d'API",
  "type": "public"
}
```

### 7) Créer un thread (lié à un groupe ou un événement)

**POST** `{{baseUrl}}/api/threads`

```json
{
  "groupe": "{{groupId}}"
}
```

### 8) Ajouter un message

**POST** `{{baseUrl}}/api/threads/{{threadId}}/messages`

```json
{
  "contenu": "coucou"
}
```

### 9) Récupérer un thread

**GET** `{{baseUrl}}/api/threads/{{threadId}}`

### 10) Créer un album

**POST** `{{baseUrl}}/api/albums`

```json
{
  "titre": "Album soirée nouvel an",
  "evenement": "{{eventId}}"
}
```

### 11) Ajouter une photo

**POST** `{{baseUrl}}/api/albums/{{albumId}}/photos`

```json
{
  "url": "https://example.com/photo.jpg"
}
```
