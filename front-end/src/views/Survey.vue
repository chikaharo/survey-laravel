<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">Survey</h1>
                <router-link
                    to="/surveys/create"
                    class="px-6 py-3 rounded-md bg-emerald-500 font-medium text-white cursor-pointer"
                    >Create Survey</router-link
                >
            </div>
        </template>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div v-if="isLoading" class="flex items-center justify-center">
                Loading...
            </div>
            <Transition
                name="fade"
                mode="in-out"
                v-if="surveyStore.surveys.length"
                v-for="(survey, ind) in surveyStore.surveys"
                :duration="{ enter: ind * 100, leave: ind * 100 + 200 }"
            >
                <SurveyCard
                    :key="survey.id!"
                    :title="survey.title"
                    :image="survey.image"
                    :slug="survey.slug"
                    :description="survey.description"
                    :id="survey.id"
                    @deleteSurvey="deleteSurvey"
                />
            </Transition>
            <div v-else>You don't have a survey yet</div>
        </div>
        <div
            v-if="surveyStore.links.length"
            class="mt-5 flex justify-center items-center space-x-1"
        >
            <!-- @ts-ignore -->
            <a
                v-for="link in surveyStore.links"
                href="#"
                @click="getSurveys($event, link.url)"
                class="px-6 py-3 border cursor-pointer text-gray-500 border-gray-300 hover:bg-gray-50"
                :class="
                    link.active &&
                    'text-indigo-500 border-indigo-500 bg-indigo-50 hover:bg-indigo-50'
                "
                >{{ link.label! }}</a
            >
        </div>
    </PageComponent>
</template>

<script setup lang="ts">
import PageComponent from "@/components/PageComponent.vue";
import { useSurveyStore } from "@/store/survey";
import SurveyCard from "@/components/SurveyCard.vue";
import { onMounted, ref, watch } from "vue";

const surveyStore = useSurveyStore();
const { surveys, links } = surveyStore;
const isLoading = ref(false);
const deleteSurvey = (surveyId: number | string) => {
    if (confirm("Are you sure to delete this survey?")) {
        surveyStore.delete(surveyId);
    }
};
const getSurveys = async (event: Event, url: string) => {
    event.preventDefault();
    await surveyStore.fetchSurveys(url);
};
onMounted(async () => {
    isLoading.value = true;
    await surveyStore.fetchSurveys();
    isLoading.value = false;
});

watch(surveyStore.surveys, (newVal, oldVal) => {
    console.log({ newVal });
    console.log({ oldVal });
});
</script>
