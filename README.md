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

## Tester l'API dans Postman

https://documenter.getpostman.com/view/49048096/2sBXc8pPTD



