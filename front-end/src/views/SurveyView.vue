<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">
                    {{ $route.params.id ? model.title : "Create a Survey" }}
                </h1>
                <button
                    class="px-6 py-3 rounded-md bg-red-500 text-white"
                    v-if="model.id"
                >
                    Delete
                </button>
            </div>
        </template>

        <form @submit.prevent="onSubmit">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div>
                        <label
                            for="image"
                            class="block text-sm font-medium leading-6 text-gray-700"
                            >Image</label
                        >
                        <div class="mt-2 flex items-center gap-x-3">
                            <svg
                                class="h-12 w-12 text-gray-300"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <img
                                v-if="model.image"
                                :src="model.image"
                                alt=""
                                class="h-12 w-12 rounded-full object-cover"
                            />
                            <button
                                type="button"
                                class="relative ml-6 px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm rounded-md border border-gray-300 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <input
                                    @change="onFileChange"
                                    type="file"
                                    name="image"
                                    class="absolute inset-0 opacity-0 cursor-pointer"
                                />
                                Change
                            </button>
                        </div>
                    </div>
                    <div>
                        <label
                            for="title"
                            class="block text-sm font-medium text-gray-700"
                            >Title</label
                        >
                        <input
                            type="text"
                            id="title"
                            name="title"
                            v-model="model.title"
                            class="mt-1 rounded-md shadow-sm border-gray-300 w-full sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label
                            for="description"
                            class="block text-sm font-medium text-gray-700"
                            >Description</label
                        >
                        <textarea
                            v-model="model.description"
                            name="description"
                            id="description"
                            rows="3"
                            placeholder="Describe your survey"
                            class="mt-1 rounded-md shadow-sm border-gray-300 w-full sm:text-sm focus:ring-indigo-500 focus:border-indigo-500x"
                        />
                    </div>
                    <div>
                        <label
                            for="expire_date"
                            class="block text-sm font-medium text-gray-700"
                            >Expire Date</label
                        >
                        <input
                            v-model="model.expire_date"
                            type="date"
                            id="expire_date"
                            name="expire_date"
                            class="mt-1 rounded-md shadow-sm border-gray-300 w-full sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div class="flex items-center space-x-3">
                        <input
                            v-model="model.status"
                            id="active"
                            name="active"
                            type="checkbox"
                            class="border-gray-300 focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded"
                        />
                        <label
                            for="active"
                            class="text-sm font-medium text-gray-700"
                            >Active</label
                        >
                    </div>
                </div>
                <div class="bg-white px-4 py-3 sn:p-6">
                    <h3
                        class="text-3xl font-semibold flex items-center justify-between"
                    >
                        Questions
                        <button
                            type="button"
                            @click="() => addQuestion(0)"
                            class="flex items-center gap-x-1 text-sm bg-slate-700 hover:bg-slate-600 px-3 py-1 text-white"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-4 h-4"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>

                            Add Question
                        </button>
                    </h3>
                    <div
                        v-if="model.questions.length == 0"
                        class="text-center text-gray-600"
                    >
                        You don't have a question
                    </div>
                    <div v-for="(question, index) in model.questions">
                        <QuestionEditor
                            :key="question.id"
                            :index="index"
                            :question="question"
                            @change="questionChange"
                            @addQuestion="addQuestion"
                            @deleteQuestion="deleteQuestion"
                        />
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:px-6 flex w-full">
                    <button
                        type="submit"
                        class="text-sm font-medium text-white px-4 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 ml-auto"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    </PageComponent>
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from "uuid";
import { onMounted, ref, watch } from "vue";
import PageComponent from "@/components/PageComponent.vue";
import QuestionEditor from "@/components/editor/QuestionEditor.vue";
import { IQuestion, ISurveyField, useSurveyStore } from "@/store/survey";
import { useRoute, useRouter } from "vue-router";
import { useNotificationStore } from "@/store/notification";

const route = useRoute();
const router = useRouter();
const surveyId = route.params.id;
const surveyStore = useSurveyStore();
const notifyStore = useNotificationStore();
const initialModel: ISurveyField = {
    id: null,
    title: "",
    status: false,
    description: null,
    image: null,
    expire_date: null,
    questions: [],
};
const model = ref<ISurveyField>(initialModel);

onMounted(() => {
    if (surveyId) {
        const selectedSurvey = surveyStore.surveys.find(
            (s) => s.id === parseInt(surveyId as string)
        );
        console.log({ selectedSurvey });
        if (selectedSurvey) {
            //@ts-ignore
            model.value.id = selectedSurvey.id as number;
            model.value.title = selectedSurvey.title;
            model.value.status = selectedSurvey.status;
            model.value.image = selectedSurvey.image;
            model.value.description = selectedSurvey.description;
            model.value.expire_date = selectedSurvey.expire_date;
            model.value.questions = selectedSurvey.questions;
        }
    } else {
        return;
    }
});
watch(surveyStore.currentSurvey, (newSurvey, oldSurvey) => {
    model.value = { ...JSON.parse(JSON.stringify(newSurvey)) };
});

const onFileChange = (event: Event) => {
    //@ts-ignore
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const fileUrl = e.target?.result;
            model.value.image = fileUrl as string;
        };

        reader.readAsDataURL(file);
    }
};

const addQuestion = (index: number) => {
    const newQuestion = {
        id: uuidv4(),
        type: "text",
        question: "",
        description: "",
    };
    const editData = JSON.parse(JSON.stringify(model.value.questions));
    editData.splice(index, 0, newQuestion);
    model.value.questions = editData;
};

const deleteQuestion = (questionId: string) => {
    const changed = model.value.questions.filter(
        (question) => question.id !== questionId
    );
    model.value.questions = changed;
};

const questionChange = (questionData: any) => {
    // console.log("data change in questionChange: ", questionData);
    // console.log("questions in questionChange before:", model.value.questions);
    model.value.questions = model.value.questions.map((q) => {
        if (q.id === questionData.id) {
            // console.log("question has change: ", q);
            return JSON.parse(JSON.stringify(questionData));
        } else {
            return q;
        }
    });
    // console.log("questions in questionChange after:", model.value.questions);
};

const onSubmit = async () => {
    console.log("submit date:", model.value);
    try {
        await surveyStore.saveSurvey(model.value);
        model.value = initialModel;
        router.push("/surveys");
        notifyStore.open("Saved survey", "success");
    } catch (error: any) {
        console.log("on Submit error: ", error);
        notifyStore.open(error, "danger");
    }
};
interface iModel {
    id: number | null;
    title: string;
    status: boolean;
    description: string | null;
    image: string | null;
    expire_date: Date | string | null;
    questions: IQuestion[];
}
</script>
