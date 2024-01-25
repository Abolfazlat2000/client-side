import { computed, makeAutoObservable, observable, runInAction } from "mobx";
import { CategoryReadDTO } from "../shared/CategoryReadDto";
import { AnswerReadDTO } from "../shared/AnswerReadDTO";
import { TestReadDTO } from "../shared/TestReadDTO";
import agent from "../api/agent";

export default class CounselingStore{
    categoryId: number | undefined;
    activeItem: string = "";
    currentQuestionIndex: number = 0;
    tests: TestReadDTO[] = [];
    selectedAnswerTitle: string = "";
    answerValue: number | null = null;
    result: number = 0;

    constructor(){
        makeAutoObservable(this)
    }

    loadTests = async (id: number) => {
        try {
            const questionAnswers = await agent.Tests.QuestionList(id);
            questionAnswers.forEach(questionAnswer => {
                this.tests.push(questionAnswer);
            })
        } catch (error) {
            console.log(error);
        }
    }

    setCategoryId = (categoryId: number) => {
        this.categoryId = categoryId;
    } 

    setActiveItem = (activeItem: string) => {
        this.activeItem = activeItem;
      };

    nextQuestion(){
        this.currentQuestionIndex += 1;
    }

    get getCurrentQuestion(){
        return this.tests[this.currentQuestionIndex];
    }

    setSelectedAnswerId(answerId: number, score: number){
        this.selectedAnswerId = answerId;
        this.result += score;
    }
    // calculateFinalResult(thresholds: {min: number; max: number; resultType: string}[]){
    //     const finalResult = this.result;
    //     const resultType =  thresholds.find(({ min, max}) => finalResult >= min && finalResult <= max)?.resultType;
    //     return resultType || 'Unknown';
    // }

    // resetResult() {
    //     this.result = 0;
    //     this.selectedAnswerId = null;
    // }

}