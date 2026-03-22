import type { MCQQuestion, AptitudeCategory } from '../types'

export const mcqQuestions: Record<AptitudeCategory, MCQQuestion[]> = {
  logical: [
    {
      q: 'If all roses are flowers and some flowers fade quickly, which is definitely true?',
      options: ['All roses fade quickly', 'Some roses may fade quickly', 'No roses fade quickly', 'All flowers are roses'],
      correct: 1,
    },
    {
      q: 'Complete the pattern: 2, 4, 8, 16, __',
      options: ['24', '28', '32', '30'],
      correct: 2,
    },
    {
      q: 'If A > B and B > C, then:',
      options: ['C > A', 'A > C', 'B > A', 'C > B'],
      correct: 1,
    },
  ],
  verbal: [
    {
      q: 'Choose the word most similar in meaning to "Eloquent":',
      options: ['Silent', 'Articulate', 'Confused', 'Harsh'],
      correct: 1,
    },
    {
      q: 'Identify the grammatically correct sentence:',
      options: [
        "She don't know the answer.",
        'They was going to the store.',
        'He has completed his assignment.',
        'We is ready for the exam.',
      ],
      correct: 2,
    },
    {
      q: '"Innovation" is to "Creativity" as "Destruction" is to:',
      options: ['Building', 'Chaos', 'Order', 'Peace'],
      correct: 1,
    },
  ],
  quantitative: [
    {
      q: 'If a train travels 240 km in 3 hours, what is its speed in km/h?',
      options: ['60', '70', '80', '90'],
      correct: 2,
    },
    {
      q: 'What is 15% of 200?',
      options: ['25', '30', '35', '40'],
      correct: 1,
    },
    {
      q: 'Solve: 3x + 6 = 21. What is x?',
      options: ['3', '4', '5', '6'],
      correct: 2,
    },
  ],
}