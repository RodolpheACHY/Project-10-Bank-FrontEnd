# Argent Bank - Frontend

Une application bancaire moderne développée avec React et Redux Toolkit, offrant une interface utilisateur sécurisée pour la gestion de comptes bancaires.

## 🚀 Aperçu du Projet

Argent Bank est une application web permettant aux utilisateurs de :
- Se connecter de manière sécurisée à leur compte bancaire
- Consulter leurs informations de profil
- Visualiser leurs comptes et soldes
- Modifier leurs informations personnelles
- Gérer leurs préférences de connexion (Remember Me)

## 🛠️ Technologies Utilisées

### Frontend
- **React** 18 - Bibliothèque JavaScript pour l'interface utilisateur
- **Redux Toolkit** - Gestion d'état moderne et efficace
- **RTK Query** - Gestion des données et cache automatique
- **React Router** - Navigation côté client
- **Vite** - Outil de build rapide et moderne

### Styling
- **CSS3** - Styles personnalisés
- **Font Awesome** - Icônes

### Outils de Développement
- **ESLint** - Linting du code
- **Git** - Contrôle de version

## 📦 Installation

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn
- Récupérer le Backend API Argent Bank sur ce repo et l'installer en suivant bien les intructions : 
https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API 

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone https://github.com/RodolpheACHY/Project-10-Bank-FrontEnd.git
cd argent-bank-frontend
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Démarrer l'application en mode développement**
```bash
npm run dev
```

4. **Ouvrir l'application**
L'application sera accessible à l'adresse : `http://localhost:5173`

## 🎯 Fonctionnalités

###  Authentification
- Connexion sécurisée avec email/mot de passe
- Fonction "Remember Me" pour la persistance de session
- Déconnexion propre avec nettoyage complet
- Gestion des erreurs de connexion

###  Gestion de Profil
- Affichage des informations utilisateur
- Modification du nom (prénom/nom de famille)
- Chargement dynamique des données

###  Interface Utilisateur
- Design responsive et moderne
- Navigation intuitive
- Messages de chargement cohérents
- Gestion des états d'erreur

###  Sécurité
- Messages d'erreur génériques (pas de fuite d'information)
- Gestion sécurisée des tokens JWT
- Nettoyage automatique des données sensibles

## 📱 Utilisation

### Connexion
1. Accéder à la page de connexion
2. Saisir email et mot de passe
3. Cocher "Remember Me" pour rester connecté (optionnel)
4. Cliquer sur "Sign In"

### Gestion du Profil
1. Une fois connecté, accéder à la page de profil
2. Cliquer sur "Edit Name" pour modifier les informations
3. Sauvegarder ou annuler les modifications

### Déconnexion
- Cliquer sur "Sign Out" dans la navigation
- Déconnexion immédiate avec redirection vers la HomePage

## 🏗️ Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── Header/
│   ├── Footer/
│   ├── Layout/
│   └── ...
├── pages/              # Pages principales
│   ├── HomePage/
│   ├── SignInPage/
│   ├── ProfilePage/
│   └── Page404/
├── features/           # Logique métier Redux
│   └── auth/
├── services/           # Services API
├── store/              # Configuration Redux
└── styles/             # Styles CSS
```

## 🔧 Scripts Disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview

# Linting
npm run lint
```

## 🌐 API

L'application communique avec l'API Argent Bank via les endpoints suivants :
- `POST /api/v1/user/login` - Authentification
- `POST /api/v1/user/profile` - Récupération du profil
- `PUT /api/v1/user/profile` - Mise à jour du profil

## 🔒 Gestion de l'Authentification

### Tokens JWT
- Stockage sécurisé dans localStorage (Remember Me) ou sessionStorage
- Transmission automatique dans les headers HTTP
- Nettoyage automatique lors de la déconnexion

### Remember Me
- **Activé** : Token persiste à la fermeture du navigateur
- **Désactivé** : Token supprimé à la fermeture du navigateur
- **Logout explicite** : Token toujours supprimé

## 🚨 Gestion des Erreurs

- Messages d'erreur génériques pour la sécurité
- Gestion des erreurs 401 (non autorisé)
- Redirection automatique en cas de session expirée
- Logs détaillés en mode développement

## 🎨 Responsive Design

L'application est entièrement responsive et optimisée pour :
- Desktop (1920px+)
- Tablette (768px - 1024px)
- Mobile (320px - 767px)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**Rodolphe  ACHY**

## 🙏 Remerciements

- OpenClassrooms pour le projet éducatif
- L'équipe Argent Bank pour les spécifications
- La communauté React/Redux pour les ressources

---

*Développé avec ❤️ dans le cadre de la formation OpenClassrooms*
