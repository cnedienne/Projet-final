# Test de Personnalité

Application web permettant de réaliser un test de personnalité et de découvrir à quelle figure emblématique de l'informatique on ressemble le plus. Le projet inclut une interface d'administration pour gérer les questions, traits de personnalité et personnages.

## Stack technique

- **Frontend** : React (Vite)
- **Backend** : PHP (PHP-FPM)
- **Serveur web** : Nginx
- **Base de données** : MariaDB
- **Administration base de données** : phpMyAdmin
- **Conteneurisation** : Docker / Docker Compose

## Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installé et lancé

## Installation et lancement

1. Cloner ou récupérer le projet, puis se placer dans le dossier :

```bash
cd stage
```

2. Lancer l'ensemble des services :

```bash
docker-compose up -d --build
```

3. Vérifier que tous les conteneurs tournent :

```bash
docker-compose ps
```

Tous les services doivent afficher le statut `Up` : `php`, `nginx`, `mariadb`, `phpmyadmin`, `react`.

## Initialisation de la base de données

Au premier lancement, la base `web_app` est créée vide. Il faut importer le dump SQL fourni (`web_app.sql`) :

**Via phpMyAdmin (recommandé) :**
1. Ouvrir http://localhost:8080
2. Se connecter avec `root` / `adminmariadb`
3. Sélectionner la base `web_app`
4. Onglet **Importer** → choisir `web_app.sql` → **Exécuter**

**Ou en ligne de commande :**
```bash
docker cp web_app.sql stage-mariadb-1:/web_app.sql
docker exec -i stage-mariadb-1 sh -c "mysql -u root -padminmariadb web_app < /web_app.sql"
```

## Accès à l'application

| Service | URL |
|---|---|
| Site principal | http://localhost:5173 |
| Test de personnalité | http://localhost:5173/quiz |
| Connexion admin | http://localhost:5173/login |
| Backend PHP (API) | http://localhost:8085 |
| phpMyAdmin | http://localhost:8080 |

## Identifiants

### Interface d'administration (site)

| Champ | Valeur |
|---|---|
| Utilisateur | `rapidcode` |
| Mot de passe | `admin123` |

### Base de données MariaDB

**Compte applicatif** (utilisé par le backend PHP) :

| Champ | Valeur |
|---|---|
| Utilisateur | `rapidcode` |
| Mot de passe | `password` |
| Base | `web_app` |

**Compte root** (accès complet, phpMyAdmin) :

| Champ | Valeur |
|---|---|
| Utilisateur | `root` |
| Mot de passe | `adminmariadb` |

## Fonctionnalités

- **Test de personnalité** : questionnaire dynamique déterminant le profil de l'utilisateur selon plusieurs traits (rigueur, créativité, autonomie, etc.), puis association au personnage historique de l'informatique le plus proche.
- **Interface d'administration** : gestion des questions, des traits de personnalité et des personnages (CRUD), protégée par authentification.

## Structure du projet

```
stage/
├── docker-compose.yml       # Orchestration des services
├── php-dockerfile           # Image du service PHP
├── php-files/                # Code source backend (PHP)
│   ├── admin/                # Routes admin + authentification
│   ├── api/                  # Routes publiques (questions, matches, tables)
│   ├── utils/                 # Fonctions utilitaires
│   └── connexion.php          # Connexion à la base de données
├── nginx-conf/
│   └── nginx.conf            # Configuration du serveur web
├── frontend/                  # Code source frontend (React)
│   ├── Dockerfile
│   └── src/
├── mysql-data/                # Données persistées de MariaDB (générées automatiquement)
└── web_app.sql                # Dump SQL initial de la base de données
```

## Commandes utiles

```bash
# Voir les logs de tous les services
docker-compose logs -f

# Voir les logs d'un service spécifique
docker-compose logs -f nginx

# Arrêter tous les services
docker-compose down

# Redémarrer un seul service après modification
docker-compose up -d --build nginx

# Accéder au shell d'un conteneur
docker exec -it stage-php-1 sh
```

## Notes techniques

- Le service Nginx est configuré en **HTTP simple** (sans HTTPS) pour un usage en développement local.
- Les fichiers PHP et le code React sont montés en volumes : les modifications sont prises en compte sans reconstruction de l'image (sauf ajout de nouvelles dépendances).
- Les identifiants ci-dessus sont destinés à un usage de développement local uniquement et ne doivent pas être utilisés tels quels en production.
