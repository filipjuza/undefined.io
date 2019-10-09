import { AnswerModel } from './answer.model';

export interface QuestionModel {
    id: string;
    title: string;
    content: string;
    answers: AnswerModel[];
}
