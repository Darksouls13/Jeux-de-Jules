Fonctionnalité et code apporté au squelette : js = dans le code javascript

-Tentative d'équilibrage du jeu
Légère augmentation du radius maximum des balles et un peu plus de vie pour réussir à aller jusqu'a la fin

-Changement du skin du joueur
ligne 306 à 323 js, 33 à 39 html

-Ajout d'un menu pour lancer le jeu et d'un menu de victoire après avoir terminé le niveau 15:
ligne 52 à 80 js, score total affiché sur l'écran de fin de partie (game over ou victoire) ligne 173 à 190js

-"Décoration" de l'interface (couleur du canva, couleurs des fonds, petits éléments d'histoire pour le jeu):
html et css principalement

-Ajout d'un timer de 160ms afin d'éviter de mourir dès le début d'un nouveau niveau :
Modification sur la fonction startgame, mainloop et moveallballs pour que ca fonctionne.

-Le joueur vibre durant le timer d'invulnérabilité

- Les balles jaunes ont des déplacements plus étrange et grossisses au fur et à mesure (des cellules cancéreuses peut être !)
ligne 297 à 300 js

J'ai essayé d'ajouter un système de "super balles"  pour regagner des vies dans la partie mais
le code que j'ai essayé fait planter le jeu donc je l'ai retiré et je garde l'idée pour les futurs améliorations et pour les prochains devoirs
si nous travaillons dessus.
