<template>
    <div
        class="h-[470px] px-6 py-4 bg-white shadow-md hover:bg-gray-50 flex flex-col"
    >
        <div class="flex-1 w-full h-full">
            <img :src="image" :alt="slug" class="h-48 w-full object-cover" />
            <h3 class="mt-4 text-lg font-bold">{{ title }}</h3>
            <div
                v-html="description"
                class="overflow-hidden text-wrap text-ellipsis max-h-[150px]"
            ></div>
        </div>
        <div class="flex justify-between items-center mt-auto">
            <router-link
                :to="{ name: 'survey-view', params: { id } }"
                class="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md text-sm text-white flex items-center gap-x-2 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                </svg>

                Edit
            </router-link>
            <div class="flex items-center space-x-2">
                <a
                    :href="`/view/survey/${slug}`"
                    target="_blank"
                    class="h-8 w-8 text-indigo-500 border border-transparent rounded-full focus:ring-indigo-500 focus:ring-offset-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8 "
                    >
                        <path
                            fillRule="evenodd"
                            d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </a>
                <button
                    type="button"
                    @click="emit('deleteSurvey', id)"
                    class="h-8 w-8 font-bold text-red-600 border border-transparent rounded-full flex items-center justify-center focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="{1.5}"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// defineProps({
//     imageUrl: String || null,
//     title: String,
//     id: Number,
//     slug: String,
//     description: String || null,
// });
defineProps(["image", "title", "id", "slug", "description"]);
const emit = defineEmits(["deleteSurvey"]);
</script>
