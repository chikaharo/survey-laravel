import { defineStore } from "pinia";
import axios from "@/axios";

const tmpSurveys: ISurveyField[] = [
    {
        id: 1,
        image: "data:image/png;base64,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",
        title: "TheCodeholic YouTube channel",
        slug: "thecodeholic-youtube-channel",
        status: true,
        description:
            "My name is Zura.<br>I am Web Developer with 9+ years of experience, free educational content creator, CTO, Lecturer and father of two wonderful daughters.<br><br>The purpose of the channel is to share my several years of experience with beginner developers.<br>Teach them what I know and make my experience as a lesson for others.",
        created_at: "2022-01-07 13:23:41",
        updated_at: "2022-01-18 16:34:19",
        expire_date: "2022-01-23",
        questions: [
            {
                id: 15,
                type: "text",
                question: "From which country are you?",
                description: null,
            },
            {
                id: 16,
                type: "checkbox",
                question:
                    "Which language videos do you want to see on my channel?",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque earum eos esse est ex facilis, iure laboriosam maiores neque nesciunt nulla placeat praesentium quae quos ratione, recusandae totam velit!",
                data: {
                    options: [
                        {
                            uuid: "8ee03188-9e7e-44e5-9176-7574c0beec6f",
                            text: "JavaScript",
                        },
                        {
                            uuid: "fe9497f2-8f05-4c82-9586-26e36736fa9e",
                            text: "PHP",
                        },
                        {
                            uuid: "db0f194c-d32d-4e19-929e-08f7b4e2bcc0",
                            text: "HTML + CSS",
                        },
                        {
                            uuid: "93273c4c-ac8f-432e-b847-e467df64ab9c",
                            text: "All of the above",
                        },
                        {
                            uuid: "d54818a7-ad7e-4b69-9287-16a8dc50a6cb",
                            text: "Everything Zura thinks will be good",
                        },
                    ],
                },
            },
            {
                id: 17,
                type: "select",
                question:
                    "Which PHP framework videos do you want to see on my channel?",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque earum eos esse est ex facilis, iure laboriosam maiores neque nesciunt nulla placeat praesentium quae quos ratione, recusandae totam velit!",
                data: {
                    options: [
                        {
                            uuid: "fb907cfe-b7a1-4b24-86fb-03f9c44aa710",
                            text: "Laravel",
                        },
                        {
                            uuid: "e2629262-93ca-4a7a-8129-19c765664a04",
                            text: "Yii2",
                        },
                        {
                            uuid: "9a11a425-d9fe-4fe9-86af-bb814e3d9271",
                            text: "Codeigniter",
                        },
                        {
                            uuid: "484268b1-d3aa-47f8-a185-356ed48e50fe",
                            text: "Symfony",
                        },
                    ],
                },
            },
            {
                id: 18,
                type: "radio",
                question: "Which Laravel Framework do you love most?",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque earum eos esse est ex facilis, iure laboriosam maiores neque nesciunt nulla placeat praesentium quae quos ratione, recusandae totam velit!",
                data: {
                    options: [
                        {
                            uuid: "c02e50e6-5ebf-4344-9822-baa16502dbdb",
                            text: "Laravel 5",
                        },
                        {
                            uuid: "90a15aae-ef4c-4d04-aa05-8e840d4a2ded",
                            text: "Laravel 6",
                        },
                        {
                            uuid: "93c64532-c1eb-4bfd-bd00-ab51cafdee78",
                            text: "Laravel 7",
                        },
                        {
                            uuid: "51f6a704-7a86-47a4-9b2d-72bb026a3371",
                            text: "Laravel 8",
                        },
                    ],
                },
            },
            {
                id: 19,
                type: "checkbox",
                question:
                    "What type of projects do you want to see on my channel built with Laravel?",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque earum eos esse est ex facilis, iure laboriosam maiores neque nesciunt nulla placeat praesentium quae quos ratione, recusandae totam velit!",
                data: {
                    options: [
                        {
                            uuid: "c5519ab0-3282-4758-a34b-506052bf1342",
                            text: "REST API",
                        },
                        {
                            uuid: "dfbbc0af-8fff-44ae-be36-e85270041729",
                            text: "E-commerce",
                        },
                        {
                            uuid: "6940c122-505f-4d9d-a103-472f923fad94",
                            text: "Real Estate",
                        },
                        {
                            uuid: "2b3c12a4-8f3c-4276-ae59-4e9d55e849be",
                            text: "All of the above",
                        },
                    ],
                },
            },
            {
                id: 22,
                type: "textarea",
                question: "What do you think about TheCodeholic channel?",
                description:
                    "Write your honest opinion. Everything is anonymous.",
                data: [],
            },
            {
                id: 23,
                type: "text",
                question: "Which channel is your favorite one?",
                description: null,
                data: [],
            },
        ],
    },
    {
        id: 2,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4lf7jIuHdcJTDWsWdwqYMurt-e0q_v5SEITkfZIHSfQ&s",
        title: "React",
        slug: "react",
        status: true,
        description:
            "React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.",
        created_at: "2022-01-07 08:50:40",
        updated_at: "2022-01-07 13:37:37",
        expire_date: "2022-02-01",
        questions: [],
    },
    {
        id: 3,
        image: "data:image/png;base64,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",
        title: "Laravel 9",
        slug: "laravel-9",
        status: true,
        description:
            "Laravel is a web application framework with expressive, elegant syntax. We\u2019ve already laid the foundation \u2014 freeing you to create without sweating the small things.",
        created_at: "2022-01-07 13:28:56",
        updated_at: "2022-01-07 13:28:56",
        expire_date: "2022-01-20",
        questions: [],
    },
];

export const useSurveyStore = defineStore("survey", {
    state: () => ({
        surveys: [...tmpSurveys],
        links: [],
        surveyIsLoading: false,
        currentSurvey: {
            id: null,
            title: "",
            description: null,
            image: null,
            expire_date: null,
            status: false,
            questions: [],
        },
        questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
    }),
    actions: {
        setSurveys(survey: ISurveyField) {
            this.surveys = [...this.surveys, survey];
        },
        async fetchSurveys(url: string = "/survey") {
            try {
                const surveys = await axios.get(url);
                console.log("surveys fetched: ", surveys.data);
                this.surveys = surveys.data.data;
                this.links = surveys.data.meta.links;
            } catch (error) {
                console.log("fetch Survey errors: ", error);
            }
        },
        async fetchSurveyBySlug(slug: string) {
            try {
                this.surveyIsLoading = true;
                const survey = await axios.get(`/survey-by-slug/${slug}`);
                console.log("survey by slug fetched: ", survey.data);
                const fetchedSurvey = {
                    ...survey.data.data,
                    questions: survey.data.data.questions.map((q: any) => {
                        if (q.data) {
                            return {
                                ...q,
                                data: JSON.parse(q.data),
                            };
                        } else {
                            return q;
                        }
                    }),
                };
                console.log({ fetchedSurvey });
                this.currentSurvey = fetchedSurvey;
            } catch (error) {
                console.log("fetch survey by slug errors: ", error);
            } finally {
                this.surveyIsLoading = false;
            }
        },
        async saveSurvey(survey: ISurveyField) {
            //no survey.id -> create
            try {
                this.surveyIsLoading = true;
                if (!survey.id) {
                    const res = await axios.post("/survey", survey);
                    console.log("create survey: ", res.data);

                    this.surveys = [res.data.data, ...this.surveys];
                } else {
                    const res = await axios.put(`/survey/${survey.id}`, survey);
                    const updatedSurvey = res.data.data;
                    console.log("update survey: ", res.data);
                    this.currentSurvey = updatedSurvey;
                    this.surveys = [...this.surveys].map((s) => {
                        if (s.id === survey.id) {
                            return {
                                ...updatedSurvey,
                            };
                        } else {
                            return s;
                        }
                    });
                }
            } catch (error) {
                console.log("save surver error: ", error);
                throw new Error("Something went wrong!");
            } finally {
                this.surveyIsLoading = false;
            }
        },
        async delete(surveyId: string | number) {
            try {
                //@ts-ignore
                const res = await axios.delete(`/survey/${surveyId}`);
                console.log("delete survey response: ", res.data);
                this.surveys = [...this.surveys].filter(
                    (survey) => survey.id !== surveyId
                );
            } catch (error) {
                console.log("[DELETE_SURVEY_ERROR]: ", error);
            }
        },
        async answerSurvey(answers: any, surveyId: string) {
            try {
                const res = await axios.post(
                    `/survey/${surveyId}/answer`,
                    answers
                );
                const resData = res.data;
                console.log("Answer the question data: ", resData);
            } catch (error) {
                console.log("Answer the question error: ", error);
            }
        },
    },
});

export interface ISurveyField {
    id?: number | string | null;
    title: string;
    slug?: string;
    image: string | null;
    description: string | null;
    expire_date: Date | string | null;
    status: boolean;
    questions: IQuestion[];
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
}

export interface IQuestion {
    id: string;
    type: string | null;
    question: string;
    description: string | null;
    data?: {
        options: IOption[];
    };
}
export interface IOption {
    uuid: string;
    text: string;
}
