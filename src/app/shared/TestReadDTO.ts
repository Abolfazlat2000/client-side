import { AnswerReadDTO } from "./AnswerReadDTO";
import { CategoryReadDTO } from "./CategoryReadDto";

export interface TestReadDTO {
    testID: number;
    question: string;
    number: number;
    categoryID: number;
    category: CategoryReadDTO;
    answers: AnswerReadDTO[];
}
