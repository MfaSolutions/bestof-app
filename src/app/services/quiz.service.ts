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
          explanation: 'La Suisse est entourée par la France, l\'Allemagne, l\'Autriche, la Thaïlande, l\'Italie et le Liechtenstein.'
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
