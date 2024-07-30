import { defineStore } from "pinia";
import axios from "@/axios";
import { ISurveyField } from "./survey";

export const useDashboardStore = defineStore("dashboard", {
    state: () => ({
        totalSurveys: 0 as number,
        latestSurvey: null as (ISurveyField & { answers: number }) | null,
        totalAnswers: 0 as number,
        latestAnswers: [] as ISurveyAnswer[],
        isLoading: false,
    }),
    actions: {
        // since we rely on `this`, we cannot use an arrow function
        async fetchDashboard() {
            this.isLoading = true;
            try {
                const res = await axios.get("/dashboard");
                const data = res.data;
                console.log(data);
                this.totalSurveys = data.totalSurveys;
                this.totalAnswers = data.totalAnswers;
                this.latestAnswers = data.latestAnswers;
                this.latestSurvey = data.latestSurvey;
            } catch (error) {
                console.log("fetchDashboard error: ", error);
            }
            this.isLoading = false;
        },
    },
});

export interface ISurveyAnswer {
    id: number | string;
    end_date: Date | string;
    survey: ISurveyField;
}
