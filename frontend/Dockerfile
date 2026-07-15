FROM node:20

WORKDIR /app

# Copie les fichiers de dépendances d'abord (pour profiter du cache Docker)
COPY package*.json ./

RUN npm install

# Copie le reste des fichiers
COPY . .

# Commande de démarrage du conteneur (à l'exécution, pas à la construction)
CMD ["npm", "run", "dev"] 