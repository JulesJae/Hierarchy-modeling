# Hierarchy Modeling - 3D WebGL Project

Une application 3D interactive en WebGL pur qui met en scène un robot humanoïde animé, avec une architecture modulaire et des contrôles avancés.

## Présentation

Projet expérimental mettant en œuvre un moteur 3D en WebGL, sans frameworks. Il met en valeur :
- Modélisation hiérarchique pour structurer les parties du robot
- Gestion avancée des animations (cinématiques et transformations)
-  Contrôles interactifs via un gestionnaire de caméra et d'événements
- Sélection et interaction 3D avec un système de picking WebGL
- Application React intégrant WebGL pour une interface fluide
-  Architecture modulaire inspirée des moteurs de jeux

## Technologies utilisées

    WebGL (rendu 3D bas niveau)
    TypeScript / JavaScript
    React.js (intégration dans une application)
    GLSL Shaders

## Fonctionnalités principales

### Modélisation hiérarchique

Chaque partie du robot (bras, jambes, tête...) est définie comme une entité avec une matrice de transformation, permettant des mouvements articulés.

### Système d'animation avancé

Le gestionnaire d’animation permet de jouer des séquences de mouvement (marche, rotation, etc.) en interpolant les transformations.
Contrôles interactifs

- Navigation 3D fluide via une caméra orbite (trackball)
- Sélection d'objets (picking) avec identification des parties du robot
- Modes d’interaction (clic, drag)

### Architecture d'un moteur 3D

Le projet suit une approche modulaire inspirée des moteurs comme Three.js :

    Shaders modulaires (vertex, fragment)
    Gestion des buffers et VBOs
    Pipeline de rendu structuré

### Installation & Lancement
1️⃣ Installation des dépendances

npm install

2️⃣ Lancer le projet en mode dev

npm run dev

3️⃣ Accéder à l'application

Ouvrir http://localhost:5173.

![image](https://github.com/user-attachments/assets/60057cd4-a20f-4600-b25f-5f5a73e2b64c)
![image](https://github.com/user-attachments/assets/daa6bbee-6c16-4ea8-acaa-2593d286d0f4)



## Roadmap des futures améliorations 

-  Ajout d’un système de shaders avancés (ombrage, textures)
- Intégration d’effets graphiques (lumières, ombres, post-processing)
- Amélioration du système de physique et collisions
- Ajout d’un éditeur interactif pour modifier les animations

