import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../services/quiz.service';
import { QuizTheme, QuizQuestion, QuizResult } from '../models/quiz.model';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="quiz-container">
      <div class="quiz-header">
        <h1>🎯 Quiz</h1>
        <p>Testez vos connaissances géographiques</p>
      </div>

      <!-- Sélection du thème -->
      <div *ngIf="!selectedTheme" class="themes-section">
        <h2>Choisissez un thème</h2>
        <div class="themes-grid">
          <button *ngFor="let theme of themes" 
                  (click)="selectTheme(theme)" 
                  class="theme-card">
            <h3>{{ theme.name }}</h3>
            <p>{{ theme.description }}</p>
            <span class="question-count">{{ theme.questions.length }} questions</span>
          </button>
        </div>
      </div>

      <!-- Quiz en cours -->
      <div *ngIf="selectedTheme && !quizCompleted" class="quiz-section">
        <div class="quiz-progress">
          <h2>{{ selectedTheme.name }}</h2>
          <div class="progress-bar">
            <div class="progress-fill" [style.width.%]="(currentQuestionIndex + 1) / selectedTheme.questions.length * 100"></div>
          </div>
          <p>Question {{ currentQuestionIndex + 1 }} / {{ selectedTheme.questions.length }}</p>
        </div>

        <div class="question-section" *ngIf="currentQuestion">
          <h3>{{ currentQuestion.question }}</h3>
          
          <div class="answers-grid">
            <button *ngFor="let answer of currentQuestion.answers"
                    (click)="toggleAnswer(answer.id)"
                    [class.selected]="isAnswerSelected(answer.id)"
                    class="answer-button">
              <span class="checkbox" [class.checked]="isAnswerSelected(answer.id)">
                <span *ngIf="isAnswerSelected(answer.id)" class="checkmark">✓</span>
              </span>
              {{ answer.text }}
            </button>
          </div>

          <div class="button-group">
            <button (click)="previousQuestion()" class="btn btn-secondary" [disabled]="currentQuestionIndex === 0">
              ← Précédent
            </button>
            <button (click)="nextQuestion()" class="btn btn-primary" [disabled]="selectedAnswers.length === 0">
              Suivant →
            </button>
          </div>
        </div>
      </div>

      <!-- Résultats -->
      <div *ngIf="quizCompleted && quizResult" class="results-section">
        <div class="result-header">
          <h2>Résultats de votre quiz</h2>
          <div class="score-display">
            <div class="score-circle" [class.excellent]="quizResult.percentage >= 80"
                                      [class.good]="quizResult.percentage >= 60 && quizResult.percentage < 80"
                                      [class.average]="quizResult.percentage < 60">
              {{ quizResult.percentage }}%
            </div>
            <p>{{ quizResult.score }} / {{ quizResult.totalQuestions }} correct</p>
          </div>
        </div>

        <div class="result-feedback">
          <p *ngIf="quizResult.percentage >= 80" class="excellent">
            🎉 Excellent ! Vous maîtrisez parfaitement ce thème !
          </p>
          <p *ngIf="quizResult.percentage >= 60 && quizResult.percentage < 80" class="good">
            ✅ Très bien ! Vous avez une bonne connaissance du sujet.
          </p>
          <p *ngIf="quizResult.percentage < 60" class="average">
            💪 Continuez à apprendre ! Vous progresserez rapidement.
          </p>
        </div>

        <div class="button-group">
          <button (click)="restartQuiz()" class="btn btn-primary">
            🔄 Recommencer ce quiz
          </button>
          <button (click)="backToThemes()" class="btn btn-secondary">
            ← Retour aux thèmes
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .quiz-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }

    .quiz-header {
      text-align: center;
      margin-bottom: 40px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 10px;
    }

    .quiz-header h1 {
      margin: 0;
      font-size: 2.5rem;
    }

    .quiz-header p {
      margin: 10px 0 0 0;
      font-size: 1.1rem;
      opacity: 0.9;
    }

    /* Thèmes */
    .themes-section {
      margin-bottom: 40px;
    }

    .themes-section h2 {
      text-align: center;
      margin-bottom: 30px;
      color: #333;
    }

    .themes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .theme-card {
      background: white;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      padding: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: center;
    }

    .theme-card:hover {
      border-color: #667eea;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
      transform: translateY(-5px);
    }

    .theme-card h3 {
      margin: 0 0 10px 0;
      color: #333;
    }

    .theme-card p {
      margin: 0 0 15px 0;
      color: #666;
      font-size: 0.95rem;
    }

    .question-count {
      display: inline-block;
      background: #667eea;
      color: white;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
    }

    /* Quiz en cours */
    .quiz-section {
      background: white;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .quiz-progress {
      margin-bottom: 30px;
    }

    .quiz-progress h2 {
      margin: 0 0 15px 0;
      color: #333;
    }

    .progress-bar {
      width: 100%;
      height: 8px;
      background: #e0e0e0;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 10px;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      transition: width 0.3s ease;
    }

    .quiz-progress p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }

    /* Questions */
    .question-section {
      margin-bottom: 30px;
    }

    .question-section h3 {
      margin: 0 0 25px 0;
      font-size: 1.3rem;
      color: #333;
    }

    .answers-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
      margin-bottom: 30px;
    }

    .answer-button {
      display: flex;
      align-items: center;
      padding: 15px;
      background: white;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: left;
      font-size: 1rem;
    }

    .answer-button:hover {
      border-color: #667eea;
      background: #f8f9ff;
    }

    .answer-button.selected {
      background: #e8ecff;
      border-color: #667eea;
    }

    .checkbox {
      width: 24px;
      height: 24px;
      border: 2px solid #667eea;
      border-radius: 4px;
      margin-right: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      flex-shrink: 0;
    }

    .checkbox.checked {
      background: #667eea;
      color: white;
    }

    .checkmark {
      font-size: 16px;
      font-weight: bold;
    }

    /* Boutons */
    .button-group {
      display: flex;
      gap: 10px;
      justify-content: space-between;
    }

    .btn {
      padding: 12px 25px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: #f0f0f0;
      color: #333;
      border: 2px solid #e0e0e0;
    }

    .btn-secondary:hover:not(:disabled) {
      background: #e0e0e0;
    }

    .btn-secondary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Résultats */
    .results-section {
      background: white;
      border-radius: 10px;
      padding: 40px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    .result-header h2 {
      margin: 0 0 30px 0;
      color: #333;
      font-size: 1.8rem;
    }

    .score-display {
      margin-bottom: 30px;
    }

    .score-circle {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      font-weight: bold;
      color: white;
      margin: 0 auto 20px;
    }

    .score-circle.excellent {
      background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
    }

    .score-circle.good {
      background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    }

    .score-circle.average {
      background: linear-gradient(135deg, #ffa751 0%, #ffe259 100%);
    }

    .score-display p {
      margin: 0;
      font-size: 1.2rem;
      color: #333;
    }

    .result-feedback {
      margin-bottom: 30px;
    }

    .result-feedback p {
      font-size: 1.1rem;
      margin: 15px 0;
      padding: 15px;
      border-radius: 8px;
    }

    .result-feedback .excellent {
      background: #e8f5e9;
      color: #2e7d32;
    }

    .result-feedback .good {
      background: #fff3e0;
      color: #e65100;
    }

    .result-feedback .average {
      background: #f3e5f5;
      color: #6a1b9a;
    }

    @media (max-width: 768px) {
      .quiz-container {
        padding: 10px;
      }

      .quiz-header h1 {
        font-size: 2rem;
      }

      .themes-grid {
        grid-template-columns: 1fr;
      }

      .button-group {
        flex-direction: column;
      }

      .btn {
        width: 100%;
      }

      .score-circle {
        width: 120px;
        height: 120px;
        font-size: 2.5rem;
      }
    }
  `]
})
export class QuizComponent implements OnInit {
  themes: QuizTheme[] = [];
  selectedTheme: QuizTheme | null = null;
  currentQuestionIndex = 0;
  selectedAnswers: string[] = [];
  quizCompleted = false;
  quizResult: QuizResult | null = null;

  constructor(
    private quizService: QuizService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadThemes();
  }

  loadThemes() {
    this.themes = this.quizService.getThemes();
  }

  selectTheme(theme: QuizTheme) {
    this.selectedTheme = theme;
    this.currentQuestionIndex = 0;
    this.selectedAnswers = [];
    this.quizCompleted = false;
    this.quizResult = null;
  }

  get currentQuestion(): QuizQuestion | null {
    if (!this.selectedTheme) return null;
    return this.selectedTheme.questions[this.currentQuestionIndex] || null;
  }

  toggleAnswer(answerId: string) {
    const index = this.selectedAnswers.indexOf(answerId);
    if (index > -1) {
      this.selectedAnswers.splice(index, 1);
    } else {
      this.selectedAnswers.push(answerId);
    }
  }

  isAnswerSelected(answerId: string): boolean {
    return this.selectedAnswers.includes(answerId);
  }

  nextQuestion() {
    if (!this.selectedTheme) return;

    if (this.currentQuestionIndex === this.selectedTheme.questions.length - 1) {
      this.completeQuiz();
    } else {
      this.currentQuestionIndex++;
      this.selectedAnswers = [];
      this.cdr.detectChanges();
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.selectedAnswers = [];
      this.cdr.detectChanges();
    }
  }

  completeQuiz() {
    if (!this.selectedTheme) return;

    // Calculer le score
    let score = 0;
    const results = this.selectedTheme.questions.map((question, index) => {
      const correctAnswers = question.answers
        .filter(a => a.isCorrect)
        .map(a => a.id);
      
      const isCorrect = 
        this.selectedAnswers.length === correctAnswers.length &&
        this.selectedAnswers.every(a => correctAnswers.includes(a));

      if (isCorrect) score++;

      return {
        questionId: question.id,
        selectedAnswerId: this.selectedAnswers.join(','),
        isCorrect: isCorrect
      };
    });

    this.quizResult = {
      theme: this.selectedTheme.name,
      score,
      totalQuestions: this.selectedTheme.questions.length,
      percentage: Math.round((score / this.selectedTheme.questions.length) * 100),
      answers: results
    };

    this.quizCompleted = true;
    this.cdr.detectChanges();
  }

  restartQuiz() {
    if (this.selectedTheme) {
      this.selectTheme(this.selectedTheme);
      this.cdr.detectChanges();
    }
  }

  backToThemes() {
    this.selectedTheme = null;
    this.quizCompleted = false;
    this.quizResult = null;
    this.currentQuestionIndex = 0;
    this.selectedAnswers = [];
    this.cdr.detectChanges();
  }
}
