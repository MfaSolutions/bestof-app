import { Injectable } from '@angular/core';
import { QuizTheme, QuizQuestion } from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private themes: QuizTheme[] = [
    {
      id: 'border-countries',
      name: 'Pays Frontaliers',
      description: 'Identifiez les pays qui partagent une frontière avec le pays annoncé',
      questions: [
        {
          id: 'q1',
          question: 'Quels sont les pays frontaliers de la France?',
          theme: 'border-countries',
          answers: [
            { id: 'a1', text: 'Espagne', isCorrect: true },
            { id: 'a2', text: 'Italie', isCorrect: true },
            { id: 'a3', text: 'Allemagne', isCorrect: true },
            { id: 'a4', text: 'Portugal', isCorrect: false },
            { id: 'a5', text: 'Belgique', isCorrect: true }
          ],
          explanation: 'La France partage des frontières avec la Belgique, l\'Allemagne, la Suisse, l\'Italie et l\'Espagne.'
        },
        {
          id: 'q2',
          question: 'Quels sont les pays frontaliers de la Tunisie?',
          theme: 'border-countries',
          answers: [
            { id: 'a1', text: 'Algérie', isCorrect: true },
            { id: 'a2', text: 'Libye', isCorrect: true },
            { id: 'a3', text: 'Maroc', isCorrect: false },
            { id: 'a4', text: 'Égypte', isCorrect: false }
          ],
          explanation: 'La Tunisie partage des frontières terrestres avec l\'Algérie et la Libye.'
        },
        {
          id: 'q3',
          question: 'Quels sont les pays frontaliers de la Suisse?',
          theme: 'border-countries',
          answers: [
            { id: 'a1', text: 'France', isCorrect: true },
            { id: 'a2', text: 'Allemagne', isCorrect: true },
            { id: 'a3', text: 'Italie', isCorrect: true },
            { id: 'a4', text: 'Autriche', isCorrect: true },
            { id: 'a5', text: 'Liechtenstein', isCorrect: true }
          ],
          explanation: 'La Suisse partage des frontières avec la France, l\'Allemagne, l\'Autriche, l\'Italie et le Liechtenstein.'
        },
        {
          id: 'q4',
          question: 'Quels sont les pays frontaliers de l\'Allemagne?',
          theme: 'border-countries',
          answers: [
            { id: 'a1', text: 'France', isCorrect: true },
            { id: 'a2', text: 'Pays-Bas', isCorrect: true },
            { id: 'a3', text: 'Belgique', isCorrect: true },
            { id: 'a4', text: 'Danemark', isCorrect: true },
            { id: 'a5', text: 'Suède', isCorrect: false }
          ],
          explanation: 'L\'Allemagne partage des frontières avec neuf pays : la France, la Belgique, les Pays-Bas, le Danemark, la Suède, la Pologne, la Tchéquie, l\'Autriche et la Suisse.'
        },
        {
          id: 'q5',
          question: 'Quels sont les pays frontaliers de l\'Espagne?',
          theme: 'border-countries',
          answers: [
            { id: 'a1', text: 'France', isCorrect: true },
            { id: 'a2', text: 'Portugal', isCorrect: true },
            { id: 'a3', text: 'Andorre', isCorrect: true },
            { id: 'a4', text: 'Italie', isCorrect: false }
          ],
          explanation: 'L\'Espagne partage des frontières terrestres avec la France, le Portugal et Andorre.'
        },
        {
          id: 'q6',
          question: 'Quels sont les pays frontaliers de la Belgique?',
          theme: 'border-countries',
          answers: [
            { id: 'a1', text: 'France', isCorrect: true },
            { id: 'a2', text: 'Pays-Bas', isCorrect: true },
            { id: 'a3', text: 'Allemagne', isCorrect: true },
            { id: 'a4', text: 'Luxembourg', isCorrect: true }
          ],
          explanation: 'La Belgique partage des frontières avec la France, les Pays-Bas, l\'Allemagne et le Luxembourg.'
        },
        {
          id: 'q7',
          question: 'Quels sont les pays frontaliers du Maroc?',
          theme: 'border-countries',
          answers: [
            { id: 'a1', text: 'Algérie', isCorrect: true },
            { id: 'a2', text: 'Mauritanie', isCorrect: true },
            { id: 'a3', text: 'Tunisie', isCorrect: false },
            { id: 'a4', text: 'Libye', isCorrect: false }
          ],
          explanation: 'Le Maroc partage des frontières terrestres avec l\'Algérie et la Mauritanie.'
        },
        {
          id: 'q8',
          question: 'Quels sont les pays frontaliers de l\'Autriche?',
          theme: 'border-countries',
          answers: [
            { id: 'a1', text: 'Allemagne', isCorrect: true },
            { id: 'a2', text: 'Tchéquie', isCorrect: true },
            { id: 'a3', text: 'Slovaquie', isCorrect: true },
            { id: 'a4', text: 'Hongrie', isCorrect: true },
            { id: 'a5', text: 'Slovénie', isCorrect: true }
          ],
          explanation: 'L\'Autriche partage des frontières avec l\'Allemagne, la Tchéquie, la Slovaquie, la Hongrie, la Slovénie, la Croatie et l\'Italie.'
        },
        {
          id: 'q9',
          question: 'Quels sont les pays frontaliers du Liechtenstein?',
          theme: 'border-countries',
          answers: [
            { id: 'a1', text: 'Suisse', isCorrect: true },
            { id: 'a2', text: 'Autriche', isCorrect: true },
            { id: 'a3', text: 'Allemagne', isCorrect: false },
            { id: 'a4', text: 'France', isCorrect: false }
          ],
          explanation: 'Le Liechtenstein partage des frontières avec la Suisse et l\'Autriche uniquement.'
        },
        {
          id: 'q10',
          question: 'Quels sont les pays frontaliers de l\'Italie?',
          theme: 'border-countries',
          answers: [
            { id: 'a1', text: 'France', isCorrect: true },
            { id: 'a2', text: 'Suisse', isCorrect: true },
            { id: 'a3', text: 'Autriche', isCorrect: true },
            { id: 'a4', text: 'Slovénie', isCorrect: true },
            { id: 'a5', text: 'Allemagne', isCorrect: false }
          ],
          explanation: 'L\'Italie partage des frontières avec la France, la Suisse, l\'Autriche et la Slovénie.'
        }
      ]
    },
    {
      id: 'pandas',
      name: '🐼 Les Pandas',
      description: 'Testez vos connaissances sur ces magnifiques créatures',
      questions: [
        {
          id: 'p1',
          question: 'Quel est le habitat naturel du panda géant?',
          theme: 'pandas',
          answers: [
            { id: 'a1', text: 'Chine', isCorrect: true },
            { id: 'a2', text: 'Japon', isCorrect: false },
            { id: 'a3', text: 'Thaïlande', isCorrect: false },
            { id: 'a4', text: 'Indonésie', isCorrect: false }
          ],
          explanation: 'Les pandas géants vivent dans les forêts de bambou des montagnes du centre de la Chine.'
        },
        {
          id: 'p2',
          question: 'Quel aliment représente environ 99% du régime alimentaire du panda géant?',
          theme: 'pandas',
          answers: [
            { id: 'a1', text: 'Bambou', isCorrect: true },
            { id: 'a2', text: 'Fruit', isCorrect: false },
            { id: 'a3', text: 'Poisson', isCorrect: false },
            { id: 'a4', text: 'Viande', isCorrect: false }
          ],
          explanation: 'Le bambou compose 99% de l\'alimentation du panda géant, bien qu\'il soit classé comme carnivore.'
        },
        {
          id: 'p3',
          question: 'Combien de temps par jour un panda doit-il manger pour satisfaire ses besoins nutritionnels?',
          theme: 'pandas',
          answers: [
            { id: 'a1', text: '12-16 heures', isCorrect: true },
            { id: 'a2', text: '4-6 heures', isCorrect: false },
            { id: 'a3', text: '8-10 heures', isCorrect: false },
            { id: 'a4', text: '1-2 heures', isCorrect: false }
          ],
          explanation: 'Les pandas doivent manger 12 à 16 heures par jour car le bambou n\'est pas très nutritif.'
        },
        {
          id: 'p4',
          question: 'Quel est le poids moyen d\'un panda géant adulte?',
          theme: 'pandas',
          answers: [
            { id: 'a1', text: '80-150 kg', isCorrect: true },
            { id: 'a2', text: '30-50 kg', isCorrect: false },
            { id: 'a3', text: '200-300 kg', isCorrect: false },
            { id: 'a4', text: '15-25 kg', isCorrect: false }
          ],
          explanation: 'Un panda géant adulte pèse généralement entre 80 et 150 kg, avec les mâles plus lourds que les femelles.'
        },
        {
          id: 'p5',
          question: 'Quel est le statut de conservation du panda géant?',
          theme: 'pandas',
          answers: [
            { id: 'a1', text: 'Vulnérable', isCorrect: true },
            { id: 'a2', text: 'En danger critique', isCorrect: false },
            { id: 'a3', text: 'En danger', isCorrect: false },
            { id: 'a4', text: 'Préoccupation mineure', isCorrect: false }
          ],
          explanation: 'Le panda géant a été reclassé de "En danger" à "Vulnérable" en 2016 grâce aux efforts de conservation chinois.'
        },
        {
          id: 'p6',
          question: 'Combien de doigts un panda géant possède-t-il (y compris le pseudo-pouce)?',
          theme: 'pandas',
          answers: [
            { id: 'a1', text: '6 doigts', isCorrect: true },
            { id: 'a2', text: '5 doigts', isCorrect: false },
            { id: 'a3', text: '7 doigts', isCorrect: false },
            { id: 'a4', text: '4 doigts', isCorrect: false }
          ],
          explanation: 'Les pandas ont 5 doigts plus un pseudo-pouce (une extension de l\'os du poignet) qui l\'aide à tenir le bambou.'
        },
        {
          id: 'p7',
          question: 'Quelle est la durée de vie moyenne d\'un panda géant en captivité?',
          theme: 'pandas',
          answers: [
            { id: 'a1', text: '20-35 ans', isCorrect: true },
            { id: 'a2', text: '10-15 ans', isCorrect: false },
            { id: 'a3', text: '40-50 ans', isCorrect: false },
            { id: 'a4', text: '5-10 ans', isCorrect: false }
          ],
          explanation: 'Les pandas vivent généralement 20 à 35 ans en captivité, tandis qu\'en nature leur espérance de vie est plus courte.'
        },
        {
          id: 'p8',
          question: 'En quelle année le panda géant est-il devenu le symbole du WWF?',
          theme: 'pandas',
          answers: [
            { id: 'a1', text: '1961', isCorrect: true },
            { id: 'a2', text: '1975', isCorrect: false },
            { id: 'a3', text: '1950', isCorrect: false },
            { id: 'a4', text: '1980', isCorrect: false }
          ],
          explanation: 'Le panda géant a été choisi comme symbole du WWF (Fonds mondial pour la nature) en 1961.'
        },
        {
          id: 'p9',
          question: 'Combien de calories un panda consomme-t-il par jour?',
          theme: 'pandas',
          answers: [
            { id: 'a1', text: '8000-14000 calories', isCorrect: true },
            { id: 'a2', text: '2000-3000 calories', isCorrect: false },
            { id: 'a3', text: '4000-5000 calories', isCorrect: false },
            { id: 'a4', text: '15000-20000 calories', isCorrect: false }
          ],
          explanation: 'Un panda consomme 8 000 à 14 000 calories par jour, principalement du bambou qui est peu calorique.'
        },
        {
          id: 'p10',
          question: 'Les pandas géants sont originellement classés dans quel groupe animal?',
          theme: 'pandas',
          answers: [
            { id: 'a1', text: 'Carnivores', isCorrect: true },
            { id: 'a2', text: 'Herbivores', isCorrect: false },
            { id: 'a3', text: 'Omnivores', isCorrect: false },
            { id: 'a4', text: 'Insectivores', isCorrect: false }
          ],
          explanation: 'Bien que les pandas se nourrissent principalement de bambou (un végétal), ils sont scientifiquement classés comme carnivores.'
        }
      ]
    },
    {
      id: 'csharp-dotnet',
      name: '💻 Entretien C# .NET Senior',
      description: 'Concepts avancés pour développeurs C# et .NET expérimentés',
      questions: [
        {
          id: 'cn1',
          question: 'Qu\'est-ce que le "Change Tracking" dans Entity Framework Core et comment l\'optimiser?',
          theme: 'csharp-dotnet',
          answers: [
            { id: 'a1', text: 'Suivi automatique des modifications d\'entités - utiliser AsNoTracking() pour lectures', isCorrect: true },
            { id: 'a2', text: 'Mécanisme de sauvegarde automatique des données', isCorrect: false },
            { id: 'a3', text: 'Gestion des transactions distribuées', isCorrect: false },
            { id: 'a4', text: 'Cache des résultats de requête', isCorrect: false }
          ],
          explanation: 'Entity Framework Core track par défaut les modifications. Désactiver avec AsNoTracking() améliore les performances en lecture.'
        },
        {
          id: 'cn2',
          question: 'Quelle est la différence entre async/await et Task.Run()?',
          theme: 'csharp-dotnet',
          answers: [
            { id: 'a1', text: 'async/await attend les opérations I/O, Task.Run() exécute du CPU sur thread pool', isCorrect: true },
            { id: 'a2', text: 'Aucune différence, c\'est la même chose', isCorrect: false },
            { id: 'a3', text: 'async/await est dépourvu, Task.Run() est préféré', isCorrect: false },
            { id: 'a4', text: 'async/await bloque toujours le thread', isCorrect: false }
          ],
          explanation: 'async/await est idéal pour les opérations I/O (BD, API). Task.Run() convient pour opérations CPU intensives.'
        },
        {
          id: 'cn3',
          question: 'Que permet la Dependency Injection en C# et quel conteneur recommandez-vous?',
          theme: 'csharp-dotnet',
          answers: [
            { id: 'a1', text: 'Injecter dépendances pour testabilité/maintenance - Microsoft.Extensions.DependencyInjection', isCorrect: true },
            { id: 'a2', text: 'Créer automatiquement toutes les instances', isCorrect: false },
            { id: 'a3', text: 'Optimiser la performance des requêtes', isCorrect: false },
            { id: 'a4', text: 'Gérer le cycle de vie des threads', isCorrect: false }
          ],
          explanation: 'DI découple les dépendances. Microsoft DI (intégré .NET) est recommandé pour la majorité des cas.'
        },
        {
          id: 'cn4',
          question: 'Qu\'est-ce que le Pattern Matching en C# 8+ et ses avantages?',
          theme: 'csharp-dotnet',
          answers: [
            { id: 'a1', text: 'Syntaxe élégante pour vérifier types et conditions - remplace switch/if', isCorrect: true },
            { id: 'a2', text: 'Détection de bugs en compilation', isCorrect: false },
            { id: 'a3', text: 'Optimisation de la mémoire', isCorrect: false },
            { id: 'a4', text: 'Gestion des exceptions au niveau système', isCorrect: false }
          ],
          explanation: 'Pattern matching simplifie les vérifications de type et conditions avec une syntaxe élégante et lisible.'
        },
        {
          id: 'cn5',
          question: 'Comment gérez-vous la mémoire en C# et quels sont les GC (Garbage Collector) modes?',
          theme: 'csharp-dotnet',
          answers: [
            { id: 'a1', text: 'GC automatique - modes Workstation, Server, Latency-optimized disponibles', isCorrect: true },
            { id: 'a2', text: 'Gérer manuellement comme en C++', isCorrect: false },
            { id: 'a3', text: 'Un seul mode GC possible', isCorrect: false },
            { id: 'a4', text: 'Pas de gestion mémoire en .NET', isCorrect: false }
          ],
          explanation: 'Le GC .NET est automatique. Choisir entre Workstation (apps), Server (services), ou modes latency-optimized selon besoin.'
        },
        {
          id: 'cn6',
          question: 'Qu\'est-ce que les Generics et les contraintes de type en C#?',
          theme: 'csharp-dotnet',
          answers: [
            { id: 'a1', text: 'Types paramétrés réutilisables avec contraintes (where T: IInterface)', isCorrect: true },
            { id: 'a2', text: 'Mécanisme de copie de code générique', isCorrect: false },
            { id: 'a3', text: 'Système de templates non type-safe', isCorrect: false },
            { id: 'a4', text: 'Stratégie de caching des données', isCorrect: false }
          ],
          explanation: 'Les Generics offrent la type-safety et réutilisabilité. Les contraintes (where) limitent les types acceptés.'
        },
        {
          id: 'cn7',
          question: 'Citez 2 des 5 principes SOLID et expliquez l\'un d\'eux',
          theme: 'csharp-dotnet',
          answers: [
            { id: 'a1', text: 'S-Single Responsibility, O-Open/Closed, L-Liskov, I-Interface Segregation, D-Dependency Inversion', isCorrect: true },
            { id: 'a2', text: 'SOLID n\'a que 3 principes', isCorrect: false },
            { id: 'a3', text: 'SOLID concerne uniquement la performance', isCorrect: false },
            { id: 'a4', text: 'SOLID est obsolète en C# moderne', isCorrect: false }
          ],
          explanation: 'Les 5 principes SOLID : S(une responsabilité), O(ouverte extension, fermée modification), L(substitution), I(ségrégation interfaces), D(inversion dépendances).'
        },
        {
          id: 'cn8',
          question: 'Qu\'est-ce que la Reflection en C# et quand l\'utiliser?',
          theme: 'csharp-dotnet',
          answers: [
            { id: 'a1', text: 'Inspecter/manipuler types à runtime - ORMs, frameworks de sérialisation l\'utilisent', isCorrect: true },
            { id: 'a2', text: 'Fonctionnalité de débug uniquement', isCorrect: false },
            { id: 'a3', text: 'Méthode pour créer des clones d\'objets', isCorrect: false },
            { id: 'a4', text: 'Système de cache pour la performance', isCorrect: false }
          ],
          explanation: 'La Reflection permet d\'inspectionner types, méthodes, propriétés au runtime. Puissante mais à utiliser avec parcimonie (impact performance).'
        },
        {
          id: 'cn9',
          question: 'Quels design patterns maîtrisez-vous? Citez Singleton, Factory, Observer et leur usage',
          theme: 'csharp-dotnet',
          answers: [
            { id: 'a1', text: 'Singleton (1 instance), Factory (créer objets), Observer (notifier changements)', isCorrect: true },
            { id: 'a2', text: 'Les design patterns ne s\'appliquent pas en C#', isCorrect: false },
            { id: 'a3', text: 'Un seul design pattern est suffisant', isCorrect: false },
            { id: 'a4', text: 'Les design patterns ralentissent toujours le code', isCorrect: false }
          ],
          explanation: 'Singleton : 1 instance globale. Factory : création flexible. Observer : notification d\'événements. Chacun résout un problème spécifique.'
        },
        {
          id: 'cn10',
          question: 'Comment optimisez-vous une application C# pour la production?',
          theme: 'csharp-dotnet',
          answers: [
            { id: 'a1', text: 'Profiling, cache, queries optimisées, lazy loading, monitoring, versioning APIs', isCorrect: true },
            { id: 'a2', text: 'Augmenter simplement la puissance serveur', isCorrect: false },
            { id: 'a3', text: 'Pas d\'optimisation nécessaire en .NET moderne', isCorrect: false },
            { id: 'a4', text: 'Réduire la qualité du code pour aller vite', isCorrect: false }
          ],
          explanation: 'Optimisation en production : profiling, caching stratégique, requêtes BD optimisées, lazy loading, monitoring continu, versioning APIs.'
        },
        {
  id: 'cn11',
  question: 'Qu\'est-ce que le middleware dans ASP.NET Core et comment fonctionne le pipeline?',
  theme: 'csharp-dotnet',
  answers: [
    { id: 'a1', text: 'Chaîne de composants traitant requêtes/réponses - ordre important avec Use()', isCorrect: true },
    { id: 'a2', text: 'Système de base de données interne', isCorrect: false },
    { id: 'a3', text: 'Uniquement pour gérer les erreurs', isCorrect: false },
    { id: 'a4', text: 'Remplace les contrôleurs MVC', isCorrect: false }
  ],
  explanation: 'Le pipeline middleware traite chaque requête HTTP séquentiellement. L’ordre des middlewares est critique pour le comportement global.'
},
{
  id: 'cn12',
  question: 'Quelle est la différence entre IEnumerable et IQueryable?',
  theme: 'csharp-dotnet',
  answers: [
    { id: 'a1', text: 'IEnumerable exécute en mémoire, IQueryable traduit en requête (ex: SQL)', isCorrect: true },
    { id: 'a2', text: 'Aucune différence', isCorrect: false },
    { id: 'a3', text: 'IQueryable est plus lent dans tous les cas', isCorrect: false },
    { id: 'a4', text: 'IEnumerable est uniquement pour les bases de données', isCorrect: false }
  ],
  explanation: 'IQueryable permet l’exécution côté base de données (LINQ to Entities), tandis que IEnumerable exécute en mémoire.'
},
{
  id: 'cn13',
  question: 'Qu\'est-ce que le boxing et unboxing en C#?',
  theme: 'csharp-dotnet',
  answers: [
    { id: 'a1', text: 'Conversion type valeur → objet (boxing) et inverse (unboxing)', isCorrect: true },
    { id: 'a2', text: 'Compression mémoire automatique', isCorrect: false },
    { id: 'a3', text: 'Optimisation du GC', isCorrect: false },
    { id: 'a4', text: 'Conversion string → int', isCorrect: false }
  ],
  explanation: 'Le boxing alloue sur le heap, ce qui peut impacter les performances. À éviter dans les boucles critiques.'
},
{
  id: 'cn14',
  question: 'Qu\'est-ce que Span<T> et Memory<T> en C#?',
  theme: 'csharp-dotnet',
  answers: [
    { id: 'a1', text: 'Structures pour manipuler la mémoire efficacement sans allocation', isCorrect: true },
    { id: 'a2', text: 'Collections classiques comme List', isCorrect: false },
    { id: 'a3', text: 'Système de cache mémoire', isCorrect: false },
    { id: 'a4', text: 'Remplacement du GC', isCorrect: false }
  ],
  explanation: 'Span<T> permet de manipuler des segments mémoire (stack/heap) sans allocations supplémentaires, optimisant les performances.'
},
{
  id: 'cn15',
  question: 'Qu\'est-ce que les records en C# et quand les utiliser?',
  theme: 'csharp-dotnet',
  answers: [
    { id: 'a1', text: 'Types immuables avec equality par valeur - idéals pour DTO', isCorrect: true },
    { id: 'a2', text: 'Remplacent toutes les classes', isCorrect: false },
    { id: 'a3', text: 'Utilisés uniquement pour les bases de données', isCorrect: false },
    { id: 'a4', text: 'Sont mutables par défaut', isCorrect: false }
  ],
  explanation: 'Les records facilitent la gestion d’objets immuables et comparent les valeurs plutôt que les références.'
},
{
  id: 'cn16',
  question: 'Qu\'est-ce que le Deadlock en C# et comment l\'éviter?',
  theme: 'csharp-dotnet',
  answers: [
    { id: 'a1', text: 'Blocage entre threads - éviter avec ordre de lock cohérent et async/await', isCorrect: true },
    { id: 'a2', text: 'Erreur de compilation', isCorrect: false },
    { id: 'a3', text: 'Problème réseau uniquement', isCorrect: false },
    { id: 'a4', text: 'Crash du CLR', isCorrect: false }
  ],
  explanation: 'Un deadlock survient quand deux threads attendent mutuellement. Bon design de synchronisation est essentiel.'
},
{
  id: 'cn17',
  question: 'Qu\'est-ce que le caching en .NET et quels types utilisez-vous?',
  theme: 'csharp-dotnet',
  answers: [
    { id: 'a1', text: 'Stockage temporaire données - MemoryCache, DistributedCache (Redis)', isCorrect: true },
    { id: 'a2', text: 'Stockage permanent uniquement', isCorrect: false },
    { id: 'a3', text: 'Remplace la base de données', isCorrect: false },
    { id: 'a4', text: 'Uniquement côté client', isCorrect: false }
  ],
  explanation: 'Le caching améliore les performances en réduisant les accès coûteux (BD, API). Peut être local ou distribué.'
},
{
  id: 'cn18',
  question: 'Qu\'est-ce que les Minimal APIs en ASP.NET Core?',
  theme: 'csharp-dotnet',
  answers: [
    { id: 'a1', text: 'APIs simplifiées sans contrôleurs - code léger et rapide à écrire', isCorrect: true },
    { id: 'a2', text: 'Remplacement du routing', isCorrect: false },
    { id: 'a3', text: 'Framework externe', isCorrect: false },
    { id: 'a4', text: 'Uniquement pour tests', isCorrect: false }
  ],
  explanation: 'Minimal APIs permettent de créer rapidement des endpoints avec moins de boilerplate, idéales pour microservices.'
},
{
  id: 'cn19',
  question: 'Qu\'est-ce que le Rate Limiting et comment l\'implémenter en .NET?',
  theme: 'csharp-dotnet',
  answers: [
    { id: 'a1', text: 'Limiter nombre requêtes - middleware RateLimiter ASP.NET Core', isCorrect: true },
    { id: 'a2', text: 'Augmenter la vitesse des requêtes', isCorrect: false },
    { id: 'a3', text: 'Bloquer toutes les requêtes', isCorrect: false },
    { id: 'a4', text: 'Optimiser la base de données', isCorrect: false }
  ],
  explanation: 'Le rate limiting protège les APIs contre abus et surcharge. ASP.NET Core propose un middleware natif.'
},
{
  id: 'cn20',
  question: 'Qu\'est-ce que la sérialisation en C# et quelles libs utiliser?',
  theme: 'csharp-dotnet',
  answers: [
    { id: 'a1', text: 'Conversion objet ↔ JSON/XML - System.Text.Json recommandé', isCorrect: true },
    { id: 'a2', text: 'Compression des données uniquement', isCorrect: false },
    { id: 'a3', text: 'Encryption automatique', isCorrect: false },
    { id: 'a4', text: 'Uniquement pour logs', isCorrect: false }
  ],
  explanation: 'La sérialisation transforme des objets en format transportable. System.Text.Json est performant et natif en .NET.'
}
      ]
    },
    {
      id: 'angular',
      name: '🅰️ Entretien Angular',
      description: 'Concepts avancés Angular et bonnes pratiques frontend modernes',
      questions: [
        {
          id: 'ang1',
          question: 'Qu\'est-ce que le Change Detection en Angular et comment l\'optimiser?',
          theme: 'angular',
          answers: [
            { id: 'a1', text: 'Mécanisme qui met à jour la vue - utiliser OnPush pour réduire contrôles', isCorrect: true },
            { id: 'a2', text: 'Détection des erreurs de compilation', isCorrect: false },
            { id: 'a3', text: 'Cache automatique des templates', isCorrect: false },
            { id: 'a4', text: 'Système de routing', isCorrect: false }
          ],
          explanation: 'Change Detection met à jour le DOM. OnPush strategy réduit les contrôles à chaque input change, améliorant performance.'
        },
        {
          id: 'ang2',
          question: 'Différence entre Observables et Promises et quand utiliser chacun?',
          theme: 'angular',
          answers: [
            { id: 'a1', text: 'Observables : stream réactif avec unsubscribe - API appels. Promises : single value, pas de gestion mémoire', isCorrect: true },
            { id: 'a2', text: 'Promises sont toujours préférées en Angular', isCorrect: false },
            { id: 'a3', text: 'Aucune différence fonctionnelle', isCorrect: false },
            { id: 'a4', text: 'Observables = Promises en syntaxe différente', isCorrect: false }
          ],
          explanation: 'Observables gèrent les streams réactifs (multiple values). Promises gèrent opérations uniques (une valeur). RxJS en Angular préfère Observables.'
        },
        {
          id: 'ang3',
          question: 'Qu\'est-ce qu\'un Standalone Component et ses avantages?',
          theme: 'angular',
          answers: [
            { id: 'a1', text: 'Composant sans NgModule - structure simplifiée, bootstrap direct, imports intégrés', isCorrect: true },
            { id: 'a2', text: 'Un composant avec une seule responsabilité', isCorrect: false },
            { id: 'a3', text: 'Composant uniquement pour l\'affichage', isCorrect: false },
            { id: 'a4', text: 'Obsolète en Angular moderne', isCorrect: false }
          ],
          explanation: 'Standalone components (Angular 14+) suppriment dépendance NgModule. Architecture plus flexible et bootstrap direct possible.'
        },
        {
          id: 'ang4',
          question: 'Qu\'est-ce que Angular Signals et comment ils améliorent la réactivité?',
          theme: 'angular',
          answers: [
            { id: 'a1', text: 'Primitive réactive remplaçant observables - grain-based change detection, meilleure performance', isCorrect: true },
            { id: 'a2', text: 'Système de notifications d\'événements', isCorrect: false },
            { id: 'a3', text: 'Mécanisme de compilation Angular', isCorrect: false },
            { id: 'a4', text: 'Dépendance RxJS', isCorrect: false }
          ],
          explanation: 'Signals (Angular 16+) offrent une réactivité granulaire, meilleure performance change detection, alternative aux Observables pour état local.'
        },
        {
          id: 'ang5',
          question: 'Expliquez la Dependency Injection en Angular et les scopes de service',
          theme: 'angular',
          answers: [
            { id: 'a1', text: 'Services injectables avec scopes: root (singleton), component, any - hierarchie de providers', isCorrect: true },
            { id: 'a2', text: 'Simple passage de paramètres entre composants', isCorrect: false },
            { id: 'a3', text: 'Un seul scope possible', isCorrect: false },
            { id: 'a4', text: 'Optionnel en Angular moderne', isCorrect: false }
          ],
          explanation: 'DI Angular : providedIn: \'root\' (singleton global), component (instance par composant), any (arbre). Hierarchie de providers pour contrôle granulaire.'
        },
        {
          id: 'ang6',
          question: 'Qu\'est-ce que Guards et Interceptors? Donnez des use cases',
          theme: 'angular',
          answers: [
            { id: 'a1', text: 'Guards: auth routing, Interceptors: requêtes HTTP (tokens, logs, erreurs)', isCorrect: true },
            { id: 'a2', text: 'Uniquement pour la validation des formulaires', isCorrect: false },
            { id: 'a3', text: 'Features obsolètes', isCorrect: false },
            { id: 'a4', text: 'Remplacés par les Signals', isCorrect: false }
          ],
          explanation: 'Guards contrôlent l\'accès aux routes (CanActivate). Interceptors modifient/loggent requêtes HTTP (tokens, erreurs globales).'
        },
        {
          id: 'ang7',
          question: 'Comment optimisez-vous performance Angular? Citez techniques clés',
          theme: 'angular',
          answers: [
            { id: 'a1', text: 'OnPush, lazy loading, tree-shaking, code splitting, NgOptimizedImage, virtual scrolling', isCorrect: true },
            { id: 'a2', text: 'Augmenter la puissance serveur suffisant', isCorrect: false },
            { id: 'a3', text: 'Angular est automatiquement optimisé', isCorrect: false },
            { id: 'a4', text: 'Performance n\'importe pas en 2026', isCorrect: false }
          ],
          explanation: 'Performance Angular : OnPush détection, lazy loading routes, tree-shaking non-utilisé, code splitting, NgOptimizedImage, virtual scrolling listes.'
        },
        {
          id: 'ang8',
          question: 'Qu\'est-ce que Module Federation et quand l\'utiliser?',
          theme: 'angular',
          answers: [
            { id: 'a1', text: 'Charger modules Angular dynamiquement - micro-frontends, applications composables', isCorrect: true },
            { id: 'a2', text: 'Système de routing avancé', isCorrect: false },
            { id: 'a3', text: 'Mécanisme de cache seulement', isCorrect: false },
            { id: 'a4', text: 'Manière lente de charger les modules', isCorrect: false }
          ],
          explanation: 'Module Federation permet charger modules Angular dynamiquement pour architectures micro-frontends et applications composables distribuées.'
        },
        {
          id: 'ang9',
          question: 'Reactive Forms vs Template-Driven Forms: Avantages et inconvénients?',
          theme: 'angular',
          answers: [
            { id: 'a1', text: 'Reactive: testable, complex forms - Template: simple, 2-way binding rapide', isCorrect: true },
            { id: 'a2', text: 'Template-Driven sont toujours meilleures', isCorrect: false },
            { id: 'a3', text: 'Un seul type de form en Angular', isCorrect: false },
            { id: 'a4', text: 'Les deux sont obsolètes', isCorrect: false }
          ],
          explanation: 'Reactive Forms: contrôle programmatique, testables, validation complexe. Template-Driven: simple, 2-way binding, idéales formulaires basiques.'
        },
        {
          id: 'ang10',
          question: 'Comment intégrer SSR (Server-Side Rendering) en Angular?',
          theme: 'angular',
          answers: [
            { id: 'a1', text: 'Angular Universal - rendre côté serveur pour SEO et performance first paint', isCorrect: true },
            { id: 'a2', text: 'SSR n\'est pas possible en Angular', isCorrect: false },
            { id: 'a3', text: 'Nécessite changer tout le code Angular', isCorrect: false },
            { id: 'a4', text: 'SSR ralentit toujours l\'application', isCorrect: false }
          ],
          explanation: 'Angular Universal rend l\'app côté serveur (Node.js) pour meilleur SEO, faster first contentful paint, expérience améliorée.'
        }
      ]
    },
    {
      id: 'devops-cicd',
      name: '🚀 Entretien DevOps CI/CD Docker Kubernetes',
      description: 'Infrastructure, conteneurisation et orchestration cloud-native',
      questions: [
        {
          id: 'devops1',
          question: 'Qu\'est-ce qu\'un Docker Image vs Container et Dockerfile?',
          theme: 'devops-cicd',
          answers: [
            { id: 'a1', text: 'Image: template immuable - Container: instance exécutable - Dockerfile: recette build', isCorrect: true },
            { id: 'a2', text: 'Image et Container sont identiques', isCorrect: false },
            { id: 'a3', text: 'Dockerfile est optionnel', isCorrect: false },
            { id: 'a4', text: 'Docker n\'utilise pas de templates', isCorrect: false }
          ],
          explanation: 'Docker Image : blueprint (immuable). Docker Container : instance en exécution. Dockerfile : instructions pour créer une image (FROM, RUN, COPY, CMD).'
        },
        {
          id: 'devops2',
          question: 'Architecture Kubernetes: Expliquez Pods, Services, Deployments, Ingress',
          theme: 'devops-cicd',
          answers: [
            { id: 'a1', text: 'Pod: unité déploiement, Service: accès réseau, Deployment: réplicas pods, Ingress: routage HTTP externe', isCorrect: true },
            { id: 'a2', text: 'Tous les termes signifient la même chose', isCorrect: false },
            { id: 'a3', text: 'Kubernetes n\'a qu\'une seule abstraction', isCorrect: false },
            { id: 'a4', text: 'Ces concepts sont dépréciés', isCorrect: false }
          ],
          explanation: 'K8s architecture: Pod (conteneur wrapper), Service (IP stable, load balancing), Deployment (gérer replicas, mises à jour), Ingress (routage HTTP/HTTPS).'
        },
        {
          id: 'devops3',
          question: 'Qu\'est-ce qu\'un CI/CD Pipeline et les étapes clés?',
          theme: 'devops-cicd',
          answers: [
            { id: 'a1', text: 'Pipeline automatisé: code → build → tests → déploiement - Source, Build, Test, Deploy stages', isCorrect: true },
            { id: 'a2', text: 'Processus de déploiement manuel', isCorrect: false },
            { id: 'a3', text: 'Uniquement pour les grands projets', isCorrect: false },
            { id: 'a4', text: 'CI/CD ralentit le développement', isCorrect: false }
          ],
          explanation: 'CI/CD Pipeline : SCM → Trigger build → Compilation/tests → Artifacts → Déploiement staging/prod. Automatisation gage de fiabilité et rapidité.'
        },
        {
          id: 'devops4',
          question: 'Quels sont les orchestrateurs de conteneurs et pourquoi Kubernetes domine?',
          theme: 'devops-cicd',
          answers: [
            { id: 'a1', text: 'Docker Swarm, Kubernetes - K8s: scalabilité, ecosystem mature, multi-cloud standard', isCorrect: true },
            { id: 'a2', text: 'Tous les orchestrateurs sont équivalents', isCorrect: false },
            { id: 'a3', text: 'Orchestration de conteneurs n\'existe pas', isCorrect: false },
            { id: 'a4', text: 'Docker Swarm est meilleur que Kubernetes', isCorrect: false }
          ],
          explanation: 'Kubernetes : orchestrateur standard industrie. Scalabilité horizontale, self-healing, rolling updates, multi-cloud. Docker Swarm : option légère mais limitée.'
        },
        {
          id: 'devops5',
          question: 'Load Balancing et High Availability: Stratégies en Kubernetes?',
          theme: 'devops-cicd',
          answers: [
            { id: 'a1', text: 'Services LB type, replicas pods, readiness/liveness probes, affinity rules, zone multi-AZ', isCorrect: true },
            { id: 'a2', text: 'Load balancing impossible en Kubernetes', isCorrect: false },
            { id: 'a3', text: 'Un seul service par application', isCorrect: false },
            { id: 'a4', text: 'High availability nécessite code spécial', isCorrect: false }
          ],
          explanation: 'HA Kubernetes : Service LoadBalancer distribue trafic, replicas pour redondance, readiness probes contrôlent trafic, affinity spread pods.'
        },
        {
          id: 'devops6',
          question: 'Comment gérez-vous Secrets et ConfigMaps en Kubernetes?',
          theme: 'devops-cicd',
          answers: [
            { id: 'a1', text: 'ConfigMaps (données non-sensibles), Secrets (passwords, tokens) - etcd encryption, RBAC', isCorrect: true },
            { id: 'a2', text: 'Stocker tous les secrets en tant que ConfigMaps', isCorrect: false },
            { id: 'a3', text: 'Hardcoder les secrets dans les images', isCorrect: false },
            { id: 'a4', text: 'Pas de gestion de secrets en K8s', isCorrect: false }
          ],
          explanation: 'ConfigMaps : données non-sensibles (configs). Secrets : données sensibles (passwords, tokens) - chiffrées etcd, injections via vars env/volumes.'
        },
        {
          id: 'devops7',
          question: 'Infrastructure as Code: Terraform vs Ansible vs Helm - cas d\'usage?',
          theme: 'devops-cicd',
          answers: [
            { id: 'a1', text: 'Terraform: infrastructure cloud, Ansible: configuration mgt, Helm: packages K8s', isCorrect: true },
            { id: 'a2', text: 'Tous les outils font la même chose', isCorrect: false },
            { id: 'a3', text: 'IaC est optionnel', isCorrect: false },
            { id: 'a4', text: 'Terraform remplace tous les autres', isCorrect: false }
          ],
          explanation: 'Terraform : provisioning infrastructure (AWS/GCP/Azure). Ansible : configuration machines. Helm : gestionnaire packages K8s (chartsYAML). Complémentaires.'
        },
        {
          id: 'devops8',
          question: 'Monitoring et Logging: Outils et métriques clés en production?',
          theme: 'devops-cicd',
          answers: [
            { id: 'a1', text: 'Prometheus/Grafana (métriques), ELK/Loki (logs), APM - CPU, mémoire, erreurs, latence', isCorrect: true },
            { id: 'a2', text: 'Monitoring n\'est pas important', isCorrect: false },
            { id: 'a3', text: 'Un seul outil monitoring suffisant', isCorrect: false },
            { id: 'a4', text: 'Logs ne servent à rien', isCorrect: false }
          ],
          explanation: 'Monitoring : Prometheus scrape métriques, Grafana affiche dashboards. Logging : ELK (Elasticsearch-Logstash-Kibana) ou Loki (K8s). APM traces pour latence.'
        },
        {
          id: 'devops9',
          question: 'Service Mesh: Istio/Linkerd - bénéfices et complexité?',
          theme: 'devops-cicd',
          answers: [
            { id: 'a1', text: 'Gère communication inter-services - circuit breaker, mTLS, routing avancé - ajout complexité', isCorrect: true },
            { id: 'a2', text: 'Service Mesh remplace Kubernetes', isCorrect: false },
            { id: 'a3', text: 'Obligatoire pour tout K8s', isCorrect: false },
            { id: 'a4', text: 'Service Mesh ralentit uniquement', isCorrect: false }
          ],
          explanation: 'Service Mesh (Istio/Linkerd) : gère communication inter-services, mTLS automatique, circuit breaker, canary deployments. Ajoute overhead/complexité opérationnelle.'
        },
        {
          id: 'devops10',
          question: 'Disaster Recovery et Backup en production: Stratégies?',
          theme: 'devops-cicd',
          answers: [
            { id: 'a1', text: 'RTO/RPO définies, sauvegarde régulière, réplication multi-région, plan de récupération testé', isCorrect: true },
            { id: 'a2', text: 'Disaster recovery n\'est pas nécessaire', isCorrect: false },
            { id: 'a3', text: 'Une seule stratégie de backup suffisante', isCorrect: false },
            { id: 'a4', text: 'Plans DR sont rarement testés', isCorrect: false }
          ],
          explanation: 'DR : définir RTO (Recovery Time Objective) et RPO (Recovery Point Objective). Sauvegardes régulières, réplication data, multi-région, drills périodiques.'
        }
      ]
    },
    {
      id: 'tech-lead-mission',
      name: '🎯 Préparer la Mission Tech Lead',
      description: 'Leadership technique, vision produit, exécution industrialisée et valeur métier',
      questions: [
        {
          id: 'tl1',
          question: 'En tant que Tech Lead, comment définissez-vous et communiquez une vision technique?',
          theme: 'tech-lead-mission',
          answers: [
            { id: 'a1', text: 'Vision ambitieuse alignée métier, feuille de route 6-12 mois, compromis discutés avec PO/CTO', isCorrect: true },
            { id: 'a2', text: 'Choisir les technologies les plus récentes', isCorrect: false },
            { id: 'a3', text: 'Vision est fixe, non modifiable', isCorrect: false },
            { id: 'a4', text: 'Vision technique n\'importe pas', isCorrect: false }
          ],
          explanation: 'Vision Tech Lead : ambitieuse et cohérente, alignée KPIs métier, communiquée régulièrement. Flexible mais guidée. Influencer sans autorité formelle.'
        },
        {
          id: 'tl2',
          question: 'Qu\'entendez-vous par "exécution fiable et industrialisée"?',
          theme: 'tech-lead-mission',
          answers: [
            { id: 'a1', text: 'Processus reproductibles, CI/CD robuste, tests automatisés, monitoring continu, incident response rapide', isCorrect: true },
            { id: 'a2', text: 'Simplement déployer du code rapidement', isCorrect: false },
            { id: 'a3', text: 'Processes rigides sans flexibilité', isCorrect: false },
            { id: 'a4', text: 'Exécution et qualité ne coexistent pas', isCorrect: false }
          ],
          explanation: 'Exécution fiable : processus standardisés, CI/CD matures, couverture tests, monitoring alertes, SLA/SLO définis, incident response documentée.'
        },
        {
          id: 'tl3',
          question: 'Comment créez-vous de la "forte valeur métier pour les directions financières"?',
          theme: 'tech-lead-mission',
          answers: [
            { id: 'a1', text: 'Réduire coûts ops, time-to-market rapide, réduire dettes techniques, ROI clair pour chaque initiative', isCorrect: true },
            { id: 'a2', text: 'Dépenser plus sur technologie dernière génération', isCorrect: false },
            { id: 'a3', text: 'Valeur métier est du domaine PO uniquement', isCorrect: false },
            { id: 'a4', text: 'Tech Lead ne doit pas s\'intéresser aux finances', isCorrect: false }
          ],
          explanation: 'Valeur métier Tech Lead : optimiser coûts (licensing, infrastructure), accélérer time-to-market, gérer dettes techniques (coûts maintenance), démontrer ROI.'
        },
        {
          id: 'tl4',
          question: 'Vous avez une autonomie "totale" - comment la gérez-vous sans être anarchique?',
          theme: 'tech-lead-mission',
          answers: [
            { id: 'a1', text: 'Décisions autonomes mais communiquées, escalade si impact métier majeur, accountability claire', isCorrect: true },
            { id: 'a2', text: 'Autonomie signifie faire sans consulter personne', isCorrect: false },
            { id: 'a3', text: 'Autonomie est une fiction dans les organisations', isCorrect: false },
            { id: 'a4', text: 'Toujours attendre approbation pour chaque décision', isCorrect: false }
          ],
          explanation: 'Autonomie Tech Lead : décisions rapides pour architecture, recrutement, tech stack. Communiquer risques/trade-offs. Escalader si impact > périmètre.'
        },
        {
          id: 'tl5',
          question: 'Qu\'est-ce que la "capacité d\'arbitrage technique avancée"?',
          theme: 'tech-lead-mission',
          answers: [
            { id: 'a1', text: 'Choisir entre solutions techniques contradictoires avec data: risques, coûts, timeline', isCorrect: true },
            { id: 'a2', text: 'Imposer une décision à l\'équipe', isCorrect: false },
            { id: 'a3', text: 'Suivre simplement les trend technologiques', isCorrect: false },
            { id: 'a4', text: 'Arbitrage est du rôle du CTO seulement', isCorrect: false }
          ],
          explanation: 'Arbitrage Tech Lead : comparer solutions (Monolithe vs Microservices, SQL vs NoSQL, etc.). Pesera risks/coûts/timeline/dette. Décision documentée.'
        },
        {
          id: 'tl6',
          question: 'Comment leadership technique guiderait-il l\'équipe dans montée en compétence?',
          theme: 'tech-lead-mission',
          answers: [
            { id: 'a1', text: 'Formations, pair programming, architecture review, feedback régulier, slack for learning, tech talk', isCorrect: true },
            { id: 'a2', text: 'Chacun apprend par lui-même', isCorrect: false },
            { id: 'a3', text: 'Montée en compétence est optionnelle', isCorrect: false },
            { id: 'a4', text: 'Tech Lead ne doit pas former', isCorrect: false }
          ],
          explanation: 'Montée en compétence : Tech Lead facilite. Pair programming (code review). Architecture review sessions. Feedback personnalisé. Slack time learning. Tech talks partage.'
        },
        {
          id: 'tl7',
          question: 'Gestion des dettes techniques - quelle est votre stratégie?',
          theme: 'tech-lead-mission',
          answers: [
            { id: 'a1', text: 'Identifier et tracker, planifier refactoring régulier, équilibre feature/tech, communication avec PO', isCorrect: true },
            { id: 'a2', text: 'Ignorer la dette technique', isCorrect: false },
            { id: 'a3', text: 'Corriger uniquement quand problème devient critique', isCorrect: false },
            { id: 'a4', text: 'Dettes techniques disparaissent naturellement', isCorrect: false }
          ],
          explanation: 'Gestion dette : Tech Lead identifie dans chaque sprint. Planifie refactoring régulièrement (20% temps?). Communique impact à PO. Évite accumulation.'
        },
        {
          id: 'tl8',
          question: 'Priorisation face à multiples demandes techniques conflictuelles - comment décidez-vous?',
          theme: 'tech-lead-mission',
          answers: [
            { id: 'a1', text: 'Matrice impact/effort, alignement vision, dépendances, risque, discuter avecstakeholders', isCorrect: true },
            { id: 'a2', text: 'Prioriser toujours les demandes du CTO', isCorrect: false },
            { id: 'a3', text: 'Ordre de réception des demandes', isCorrect: false },
            { id: 'a4', text: 'Priorisation n\'est pas du rôle Tech Lead', isCorrect: false }
          ],
          explanation: 'Priorisation Tech Lead : impact business vs effort. Alignement vision technique. Dépendances/risques. Discuter avecstakeholders. Documenter rationale.'
        },
        {
          id: 'tl9',
          question: 'Un membre équipe résiste à nouvelles pratiques (tests, code review) - votre approche?',
          theme: 'tech-lead-mission',
          answers: [
            { id: 'a1', text: 'Comprendre objections, expliquer bénéfices, pair program, feedback positif, adapter si vraies limites', isCorrect: true },
            { id: 'a2', text: 'Imposer les pratiques sans discussion', isCorrect: false },
            { id: 'a3', text: 'Accepter toute résistance sans intervenir', isCorrect: false },
            { id: 'a4', text: 'Remplacer le membre', isCorrect: false }
          ],
          explanation: 'Leadership Tech Lead : écoute objections. Explique "pourquoi" pas juste "comment". Pair program pour démontrer. Reconnaître vrais problèmes. Adapter ensemble.'
        },
        {
          id: 'tl10',
          question: 'Mesurez-vous succès Tech Lead - quelles métriques et KPIs?',
          theme: 'tech-lead-mission',
          answers: [
            { id: 'a1', text: 'Delivery predictability, système uptime, incident time-to-resolve, team engagement, velocity stable, debt reduction', isCorrect: true },
            { id: 'a2', text: 'Uniquement nombre de lignes de code écrites', isCorrect: false },
            { id: 'a3', text: 'Succès Tech Lead est subjectif, pas mesurable', isCorrect: false },
            { id: 'a4', text: 'Seules métriques métier importent', isCorrect: false }
          ],
          explanation: 'KPIs Tech Lead : predictability sprint, uptime/SLO, incident response tempo. Team engagement/retention. Velocity stable. Réduction dettes. Time-to-market.'
        }
      ]
    }
  ];

  getThemes() {
    return this.themes;
  }

  getThemeById(id: string): QuizTheme | undefined {
    return this.themes.find(theme => theme.id === id);
  }

  getQuestionsByTheme(themeId: string): QuizQuestion[] {
    const theme = this.getThemeById(themeId);
    return theme ? theme.questions : [];
  }
}
