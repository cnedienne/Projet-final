#!/bin/bash



RED='\033[0;31m'

GREEN='\033[0;32m'

BLUE='\033[1;34m'

YELLOW='\033[1;33m'

CYAN='\033[1;36m'

NC='\033[0m' 



echo -e "${BLUE}=== Redémarrage complet du projet Docker ===${NC}"



echo -e "${YELLOW}--- Étape 1 : Arrêt des conteneurs et suppression des volumes ---${NC}"

docker compose down -v



echo -e "${YELLOW}--- Étape 2 : Reconstruction des images sans cache ---${NC}"

docker compose build --no-cache



echo -e "${YELLOW}--- Étape 3 : Redémarrage en arrière-plan ---${NC}"

docker compose up -d



echo -e "${GREEN} Le projet a été relancé avec succès.${NC}\n"



echo -e "${CYAN} Accès au site web : ${NC}http://localhost:5173"

echo -e "${CYAN} Accès à la page d'administration : ${NC}http://localhost:5173/login\n"



echo -e "${BLUE} Identifiants de connexion admin :${NC}"

echo -e "   ${CYAN}Nom d'utilisateur :${NC} rapidcode"

echo -e "   ${CYAN}Mot de passe      :${NC} password"
