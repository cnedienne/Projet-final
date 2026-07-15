

faire les colomns pour les images X
faire les requets prepares X


faire ce qui permet de faire les calcs

    - moyen de recuperer ce que le gars a mit X
    - faire un verifications si il a fini ou pas  X
    
        si fini:
            retier le cookie (retirer de la table) 
            retirer de la table si present 
            faire le calcule
                table de vecteur par def de chaque personnage  X
                
                vecteur utilisateur  X

                trouver le plus proche dans le tab  X
                
                dire qui est le plus proche X
                    

        si pas fini:
            ajoute dans la table users le cookie X
            ajoute assoc cookie -> reponses  X


<!-- je dois faire un php pour tt les variable genre les tables tt ca  -->

retirer tt les messages lors des eereurs ? secu ?
retirer le .php ? 

faire une page admin:
    ajouter retirer modifier les characters
    ajouter retirer modifier les questions
    ... les traits et les autre tables comme consequences de ca ?
    

faire une fonction qui factorise les check de depths 

debug les res car ca marche pas bien

retirer checktables_names de api admin ? sert a rien ?

verifer les valeur des parameters des end point  si ca depasse pas les bornes ? c'est admin en vrai non enfin code



 curl -v -X POST http://localhost:8085/api/matches/   -H "Content-Type: application/json"   -d '[
    {"question_id":1,"score":1},
    {"question_id":2,"score":0},
    {"question_id":3,"score":2},
    {"question_id":4,"score":-1},
    {"question_id":5,"score":1},
    {"question_id":6,"score":-2},
    {"question_id":7,"score":2},
    {"question_id":8,"score":0},
    {"question_id":9,"score":-1},
    {"question_id":10,"score":1},
    {"question_id":11,"score":-2},
    {"question_id":12,"score":0},
    {"question_id":13,"score":2},
    {"question_id":14,"score":-1},
    {"question_id":15,"score":1},
    {"question_id":16,"score":0},
    {"question_id":17,"score":2},
    {"question_id":18,"score":-2},
    {"question_id":19,"score":1},
    {"question_id":20,"score":0}
  ]'



🔒 Bonus : protection Nginx

Dans ta config nginx.conf, tu peux bloquer l'exécution de scripts dans /uploads :

location /uploads/ {
    autoindex off;
    try_files $uri $uri/ =404;

    location ~ \.php$ {
        return 403;
    }
}




server {
    listen 80 default_server;
    listen [::]:80 default_server;
    
    server_name localhost;

    root /var/www/html;
    index index.php index.html;

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    location /api/ {
         try_files $uri $uri/ $uri.php?$args;
    }

    location ~* \.php$ {
        fastcgi_pass php:9000;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param SCRIPT_NAME $fastcgi_script_name;
    }
}