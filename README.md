# BestOf App

Application Angular avec gestion d'utilisateurs et authentification.

## Authentification

L'application inclut un système d'authentification. Voir [AUTH_README.md](AUTH_README.md) pour les identifiants de démonstration.

## Déploiement GitHub Pages

Pour publier les changements sur https://mfasolutions.github.io/bestof-app/ :

### Configuration GitHub Pages
1. Allez sur https://github.com/MfaSolutions/bestof-app/settings/pages
2. Sous "Source", sélectionnez "Deploy from a branch"
3. Choisissez la branche `gh-pages` et le dossier `/ (root)`
4. Sauvegardez les changements

### Processus de déploiement
```bash
# 1. Commiter vos changements
git add .
git commit -m "Description de vos changements"

# 2. Pousser vers GitHub
git push origin master

# 3. Déployer sur GitHub Pages
npm run deploy
```

Le script `npm run deploy` construit automatiquement l'application et la publie sur GitHub Pages.
