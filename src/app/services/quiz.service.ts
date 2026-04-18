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
