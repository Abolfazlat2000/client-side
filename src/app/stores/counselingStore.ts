import { computed, makeAutoObservable, observable, runInAction } from "mobx";
import { CategoryReadDTO } from "../shared/CategoryReadDto";
import { AnswerReadDTO } from "../shared/AnswerReadDTO";
import { TestReadDTO } from "../shared/TestReadDTO";
import { UserReadDTO } from "../shared/UserReadDTO";
import { ExtraQuestionDTO } from '../../app/shared/ExtraQuestionDTO';
import agent from "../api/agent";

export default class CounselingStore{
    categoryId: number | undefined;
    activeItem: string = "";
    currentQuestionIndex: number = 0;
    tests: TestReadDTO[] = [];
    userInfo: UserReadDTO | undefined;
    userAnswerId: number = 1;
    userId: number = 10;
    result: number = 0;
    extraTests: ExtraQuestionDTO | undefined;
    extAnswers: string[] = [];
    extAnswersTitle: string[] = [];
    isInput: boolean = false;

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

        } catch (error) {
            console.log(error);
        }
    }

    setCategoryId = (categoryId: number) => {
        this.categoryId = categoryId;
    }

    setActiveItem = (activeItem: string) => {
        this.activeItem = activeItem;
    }
    setUserInfo = (userInfo: UserReadDTO) => {
        this.userInfo = userInfo;
    }

    nextQuestion = () => {
        this.currentQuestionIndex += 1;
    }

    get getCurrentQuestion(){
        return this.tests[this.currentQuestionIndex];
    }

    handleExtraAnswer = () => {
        const ans = this.extraTests?.answer;
        let answers = ans!.split("|");
        if (answers![0] === "false") {
            this.isInput = true;
        }
        answers.shift();
        this.extAnswers = answers;
    }
    handleAnswerTitle = () => {
        const ansTitle = this.extraTests?.answerTitle;
        let answersTitle = ansTitle!.split("|");
        // if (answersTitle![0] === "false") {
        //     this.isInput = true;
        // }
        answersTitle.shift();
        this.extAnswersTitle = answersTitle;
    }

    getResult = (score: number) => {
        this.result += score;
        console.log(this.result);
    }

    incrementUserAnswerId = () => {
        this.userAnswerId += 1;
    }

    incrementUserId = () => {
        this.userId += 1;
    }

    calculateFinalResult = (thresholds: {min: number; max: number; resultType: string}[]) => {
        console.log(thresholds);
        console.log(this.result);
        const finalResult = this.result;
        const resultType =  thresholds.find(({ min, max}) => finalResult >= min && finalResult <= max)?.resultType;
        return resultType || 'Unknown';
    }

    resetResult = () => {
        this.result = 0;
        this.userAnswerId = 0;
    }

}