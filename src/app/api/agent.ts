import axios, { AxiosResponse } from 'axios';
import { CategoryReadDTO } from '../shared/CategoryReadDto';
import { TestReadDTO } from '../shared/TestReadDTO';
import { AnswerReadDTO } from '../shared/AnswerReadDTO';


const sleep = (delay : number) => {
    return new Promise((resolve) =>{
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.interceptors.response.use(async response => {
    try{
        await sleep(1000);
        return response;
    } catch(error){
        console.log(error);
        return await Promise.reject(error);
    }
})


const responseBody = <T> (response : AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url : string) => axios.get<T>(url).then(responseBody),
    post: <T> (url : string, body : {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url : string, body : {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url : string) => axios.delete<T>(url).then(responseBody)
}

const Tests = {
    CategoryList : () => requests.get<CategoryReadDTO[]>('/Category/GetAllCategories'),
    Categorydetail: (id : number) => requests.get<CategoryReadDTO>(`Category/GetCategoryById/${id}`),
    GetCategoryById: (id : number) => requests.get<CategoryReadDTO>(`Category/GetCategoryById/${id}`),
    CreateCategory: (category : CategoryReadDTO) => axios.post<void>('Category/CreateCategory', category),
    QuestionList: (id : number) => requests.get<TestReadDTO[]>(`Test/GetTestByCategory/${id}`),
    GetTest: (id : number) => requests.get<TestReadDTO>(`Test/GetTestById/${id}`),
    AnswerList: (id : number) => requests.get<AnswerReadDTO>(`Answers/GetAnswersByCategory/${id}`),
    CreateTest: (test : TestReadDTO) => axios.post<void>('Test/CreateTest', test),
    CreateAnswer: (answer : AnswerReadDTO) => axios.post<void>('Answers/CreateAnswer', answer),
    UpdateAnswerValue: (selectedAnswerId: number) => axios.put<void>('',selectedAnswerId),
}

const agent = {
    Tests
}

export default agent;