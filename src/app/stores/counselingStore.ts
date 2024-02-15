import { computed, makeAutoObservable, observable, runInAction } from "mobx";
import { CategoryReadDTO } from "../shared/CategoryReadDto";
import { AnswerReadDTO } from "../shared/AnswerReadDTO";
import { TestReadDTO } from "../shared/TestReadDTO";
import { ExtraQuestionDTO } from '../../app/shared/ExtraQuestionDTO';
import agent from "../api/agent";

export default class CounselingStore{
    categoryId: number | undefined;
    activeItem: string = "";
    currentQuestionIndex: number = 0;
    tests: TestReadDTO[] = [];
    userAnswerId: number = 1;
    userId: number = 10;
    result: number = 0;
    extraTests!: ExtraQuestionDTO;
    extAnswers: string[] | undefined;
    isInput: boolean | undefined;

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
    loadExtraTests = async (id: number) => {
        try {
            this.extraTests = await agent.Tests.GetExtraQuestion(id);
            console.log(this.extraTests);

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
        console.log(this.result);
        this.currentQuestionIndex += 1;
    }

    get getCurrentQuestion(){
        return this.tests[this.currentQuestionIndex];
    }

    handleAnswer = async() => {
        await new Promise( resolve => setTimeout(resolve, 5000) );
        const ans = this.extraTests?.answer;
        let answers = ans?.split("|");
        if (answers[0] === "false") {
            this.isInput = true;
        }
        answers?.shift();
        this.extAnswers = answers;
        console.log(this.extAnswers);
    };
    getResult(score: number){
        this.result += score;
    }

    incrementUserAnswerId = () => {
        this.userAnswerId += 1;
    };

    incrementUserId = () => {
        this.userId += 1;
    }

    calculateFinalResult(thresholds: {min: number; max: number; resultType: string}[]){
        const finalResult = this.result;
        const resultType =  thresholds.find(({ min, max}) => finalResult >= min && finalResult <= max)?.resultType;
        return resultType || 'Unknown';
    }

    resetResult() {
        this.result = 0;
        this.userAnswerId = 0;
    }

}