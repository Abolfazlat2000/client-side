import { CategoryReadDTO } from "./CategoryReadDto";

export interface AnswerReadDTO{
    answerID: number;
    title: string;
    score: number;
    isPhoto: boolean;
    categoryID: number;
    value: string;
    category: CategoryReadDTO;
}