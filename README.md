# Répertoire de memes

## Structure du projet

```
.
├── server
│   ├── assets 
│   │   ├── images            Tous les memes
│   │   └── js                JavaScript
│   ├── data              
│   │   ├── keywords.json     Fichier qui contient tous les mots-clés pour un meme, pour trouver facilement ce qu'on recherche
│   │   └── filenames.json    Fichier qui contient tous les noms de fichiers propres, au téléchargement d'un meme
│   └── index.html            Fichier qui contient la page du site    
├── src
│   ├── index.ts              Fichier pour démarrer le serveur Web
│   └── rename.ts             Fichier pour renommer les memes sous une sorte de hash
└── ...
```