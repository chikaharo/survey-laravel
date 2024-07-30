<template>
    <PageComponent title="Dashboard">
        <div
            v-if="dashboardStore.isLoading"
            class="min-h-screen w-full flex items-center justify-center"
        >
            <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                <!-- ... -->
            </svg>
            Loading...
        </div>
        <div
            class="w-full h-full flex items-center justify-center"
            v-else-if="
                !dashboardStore.isLoading &&
                (!dashboardStore.latestAnswers || !dashboardStore.latestSurvey)
            "
        >
            Nothing here
        </div>
        <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700"
        >
            <div
                class="bg-white p-3 flex flex-col shadow-md text-center order-1 lg:order-2 animate-[huyDinh]"
            >
                <div class="text-xl font-semibold mb-3">Total Surveys</div>
                <div
                    class="text-8xl font-semibold flex flex-1 justify-center items-center"
                >
                    {{ dashboardStore.totalSurveys }}
                </div>
            </div>

            <div
                class="bg-white p-3 flex flex-col shadow-md text-center order-2 lg:order-4 animate-[huyDinh]"
            >
                <div class="text-xl font-semibold mb-3">Total Answers</div>
                <div
                    class="text-8xl font-semibold flex flex-1 justify-center items-center"
                >
                    {{ dashboardStore.totalAnswers }}
                </div>
            </div>

            <div
                class="bg-white p-3 order-3 row-span-2 shadow-md lg:order-1 animate-[huyDinh]"
            >
                <h3 class="text-2xl font-semibold">Latest Survey</h3>
                <img
                    class="w-[240px] mx-auto"
                    :src="(dashboardStore.latestSurvey?.image as string)"
                    :alt="dashboardStore.latestSurvey?.slug"
                />
                <h3 class="text-xl font-bold mb-3">
                    {{ dashboardStore.latestSurvey?.title }}
                </h3>
                <div class="mb-1 flex items-center justify-between text-sm">
                    <div>Upload Date:</div>
                    <div>
                        {{ dashboardStore.latestSurvey?.created_at }}
                    </div>
                </div>
                <div class="flex items-center justify-between mb-1 text-sm">
                    <div>Answers:</div>
                    <div>{{ dashboardStore.latestSurvey?.answers }}</div>
                </div>
                <div class="flex items-center justify-between mb-3 text-sm">
                    <div>Questions:</div>
                    <div>{{ dashboardStore.latestSurvey?.questions }}</div>
                </div>
                <div class="flex items-center justify-between">
                    <router-link
                        :to="{
                            name: 'survey-view',
                            params: { id: dashboardStore.latestSurvey?.id },
                        }"
                        class="text-indigo-500 px-4 py-3 flex items-center gap-x-3 rounded-md hover:bg-indigo-600 hover:text-white transition"
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
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                        </svg>

                        Edit Survey
                    </router-link>
                    <router-link
                        :to="{
                            name: 'surveypublicview',
                            params: { slug: dashboardStore.latestSurvey?.slug },
                        }"
                        class="text-indigo-500 px-4 py-3 flex items-center gap-x-3 rounded-md hover:bg-indigo-600 hover:text-white transition"
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
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                        </svg>

                        View Answer
                    </router-link>
                </div>
            </div>

            <div
                class="bg-white p-3 order-4 row-span-2 shadow-md lg:order-3 animate-[huyDinh]"
            >
                <div class="flex items-center justify-between px-2 mb-3">
                    <h3 class="font-semibold text-2xl">Latest Answers</h3>
                    <a href="#" class="text-sky-600 hover:decoration-sky-600"
                        >View all</a
                    >
                </div>
                <div>
                    <a
                        href="#"
                        v-for="answer in dashboardStore.latestAnswers"
                        :key="answer.id"
                        class="block p-2 hover:bg-gray-100/90"
                    >
                        <div class="block text-xl font-medium mb-1">
                            {{ answer.survey.title }}
                        </div>
                        <div class="text-sm">
                            Answer Made at:
                            <span class="font-medium italic">{{
                                answer.end_date
                            }}</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </PageComponent>
</template>

<script lang="ts" setup>
import PageComponent from "@/components/PageComponent.vue";
import { useDashboardStore } from "@/store/dashboard";
import { onMounted } from "vue";

const dashboardStore = useDashboardStore();

onMounted(() => {
    dashboardStore.fetchDashboard();
});
</script>
