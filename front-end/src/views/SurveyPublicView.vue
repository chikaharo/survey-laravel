<template>
    <div
        v-if="surveyStore.surveyIsLoading"
        class="flex justify-center items-center"
    >
        <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
            <!-- ... -->
        </svg>
        Loading...
    </div>

    <form
        v-else
        @submit.prevent="onSubmit"
        class="bg-gray-50 px-6 py-4 min-h-screen"
    >
        <div class="grid grid-cols-6 gap-3">
            <img
                :src="surveyStore.currentSurvey.image"
                :alt="surveyStore.currentSurvey.title"
            />
            <div class="col-span-5 ml-3">
                <h1 class="font-semibold text-3xl mb-2">
                    {{ surveyStore.currentSurvey.title }}
                </h1>
                <p v-html="surveyStore.currentSurvey.description"></p>
            </div>
        </div>

        <div
            v-if="isFinished"
            class="min-h-screen w-full items-center justify-center"
        >
            <div
                :class="'bg-emerald-500 px-6 py-3 pr-3 rounded-md shadow-md text-white flex flex-col items-center'"
            >
                Thank you for participating in this survey
                <button
                    class="px-3 py-2 text-gray-500 bg-white rounded-md flex items-center gap-x-2"
                    @click="reAnswer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                    Take another survey
                </button>
            </div>
        </div>
        <div v-else class="mt-3">
            <QuestionViewer
                v-for="(question, index) in surveyStore.currentSurvey.questions"
                :key="question.uuid"
                :question="question"
                :index="index"
                v-model="answers[question.id]"
            />
        </div>
        <button
            type="submit"
            class="flex-inline justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-md"
        >
            Save
        </button>
    </form>
</template>

<script setup>
import QuestionViewer from "@/components/viewer/QuestionViewer.vue";
import { useSurveyStore } from "@/store/survey";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const slug = route.params.slug;
const surveyStore = useSurveyStore();
const answers = ref({});
const isFinished = ref(true);

const onSubmit = (event) => {
    event.preventDefault();
    console.log("answer question: ", answers.value);
    surveyStore.answerSurvey(
        { answers: answers.value },
        surveyStore.currentSurvey.id
    );
};

const reAnswer = () => {
    isFinished.value = false;
    answers.value = {};
};

onMounted(async () => {
    await surveyStore.fetchSurveyBySlug(slug);
});
</script>
