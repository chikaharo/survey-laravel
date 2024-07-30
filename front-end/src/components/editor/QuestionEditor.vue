<template class="bg-white sm:p-6 mt-3">
    <div class="flex items-center justify-between">
        <h3 class="font-semibold text-2xl">{{ question.question }}</h3>
        <div class="flex items-center gap-x-3">
            <button
                type="button"
                @click="handleAddQuestion"
                class="px-3 py-2 rounded-sm bg-slate-600 text-white hover:bg-slate-700 flex items-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4 mr-1"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>

                Add
            </button>
            <button
                type="button"
                @click="emit('deleteQuestion', question.id)"
                class="px-3 py-2 rounded-sm text-red-500 border-white hover:border-red-500 flex items-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-4 h-4 mr-1"
                >
                    <path
                        fill-rule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clip-rule="evenodd"
                    />
                </svg>

                Delete
            </button>
        </div>
    </div>

    <div class="grid grid-cols-12 gap-3">
        <div class="mt-3 col-span-9">
            <label for="question" class="block font-medium text-gray-900"
                >Question Text</label
            >
            <input
                v-model="model.question"
                @change="dataChange"
                id="question"
                name="question"
                type="text"
                class="px-4 py-3 border-gray-300 rounded-md w-full"
                placeholder="What the question here"
            />
        </div>

        <div class="mt-3 col-span-3">
            <label for="questionType" class="block font-medium text-gray-900"
                >Select Question Type</label
            >
            <select
                :_value="model.type"
                @change="handleTypeChange"
                v-model="model.type"
                id="questionType"
                name="questionType"
                class="px-4 py-3 border-gray-300 rounded-md w-full"
            >
                <option v-for="opt in questionTypes" :key="opt" :value="opt">
                    {{ opt }}
                </option>
            </select>
        </div>
    </div>
    <!-- Data -->
    <div>
        <div v-if="shouldHaveOptions()" class="mt-2">
            <h4
                class="flex justify-between items-center text-sm font-semibold mb-1 w-full"
            >
                Options
                <button
                    type="button"
                    @click="handleAddOption"
                    class="flex items-center gap-x-1 text-sm bg-slate-600 hover:bg-slate-500 px-3 py-1.5 text-white font-normal rounded-sm"
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

                    Add Options
                </button>
            </h4>
            <div
                v-if="!model.data?.options.length"
                class="text-center py-4 text-gray-600 text-xs"
            >
                You don't have any option defined
            </div>
            <div
                v-else
                v-for="(option, index) in model.data.options"
                :key="option.uuid"
                class="mt-2 w-full flex items-center gap-1"
            >
                <span class="mr-2">{{ index + 1 }}.</span>
                <input
                    type="text"
                    class="w-full px-3 py-2 rounded-sm shadow-sm border-gray-300 focus:ring-2 focus:ring-indingo-500 focus:border-indigo-500"
                    v-model="option.text"
                    @_input="(event: Event) => handleChangeOption(event, index)"
                    @change="dataChange"
                />
                <button
                    type="button"
                    class="rounded-full cursor-pointer flex justify-center items-center"
                    :onclick="() => handleDeleteOption(option)"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="text-red-500 w-6 h-6 cursor-pointer"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <div class="mt-3">
        <label for="questionDescription" class="block font-medium text-gray-900"
            >Description</label
        >
        <textarea
            v-model="model.description"
            @change="dataChange"
            name="questionDescription"
            id="questionDescription"
            rows="3"
            class="mt-1 w-full shadow-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
    </div>

    <hr class="my-4" />
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from "uuid";
import { IOption, IQuestion, useSurveyStore } from "@/store/survey";
import { ref } from "vue";
const { question, index } = defineProps(["question", "index"]);
const emit = defineEmits(["change", "addQuestion", "deleteQuestion"]);
const { questionTypes } = useSurveyStore();

const model = ref<IQuestion>(
    JSON.parse(
        JSON.stringify({ ...question, data: question.data || { options: [] } })
    )
);
let modelOptionsTemp: any;
if (question.data === undefined && question.data?.options === undefined) {
    modelOptionsTemp = null;
} else {
    modelOptionsTemp = ref(JSON.parse(JSON.stringify(question.data!.options!)));
}

const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
const shouldHaveOptions = () => {
    return ["select", "radio", "checkbox"].includes(model.value.type!);
};

// const setOptions = (opts: any) => {
//     model.value.data.options = opts;
// };

// const setModelOptions = (data: any) => {
//     modelOptionsTemp.value = data;
// };

// const handleTypeChange = (event: Event) => {
//     const changedValue = (event.target as HTMLInputElement).value;
//     model.value.type = changedValue;
//     if (shouldHaveOptions()) {
//         setOptions(modelOptionsTemp.value);
//     } else {
//         setOptions([]);
//     }
// };

// const handleAddOption = () => {
//     const newOption: IOption = {
//         uuid: uuidv4(),
//         text: "",
//     };
//     setModelOptions([...modelOptionsTemp.value, newOption]);
//     setOptions([...model.value.data.options, newOption]);
// };

// const handleDeleteOption = (opt: IOption) => {
//     //@ts-ignore
//     setModelOptions(
//         modelOptionsTemp.value.filter(
//             (option: IOption) => option.uuid !== opt.uuid
//         )
//     );
//     setOptions(
//         model.value.data.options.filter(
//             (option: IOption) => option.uuid !== opt.uuid
//         )
//     );
// };

// const handleChangeOption = (event: Event, index: number) => {
//     console.log("Change index: ", index);
//     console.log(
//         "Change event value: ",
//         (event.target as HTMLInputElement).value
//     );
//     const tempModelOptions = [...modelOptionsTemp.value];
//     tempModelOptions[index].text = (event.target as HTMLInputElement).value;
//     modelOptionsTemp.value = tempModelOptions;
//     setModelOptions([...tempModelOptions]);
// };

const getOptions = () => {
    return model.value.data!.options;
};
const setOptions = (data: any) => {
    model.value.data!.options = data;
};
const handleAddOption = () => {
    const newOption: IOption = {
        uuid: uuidv4(),
        text: "",
    };
    setOptions([...getOptions(), newOption]);
    dataChange();
};
const handleDeleteOption = (option: IOption) => {
    setOptions([...getOptions()].filter((opt) => opt.uuid !== option.uuid));
    dataChange();
};
const handleTypeChange = (event: Event) => {
    console.log("handle type change: ", event);
    if (shouldHaveOptions()) {
        setOptions(getOptions() || []);
    }
    dataChange();
};

const dataChange = () => {
    const data = JSON.parse(JSON.stringify(model.value));
    if (!shouldHaveOptions()) {
        delete data.data.options;
    }
    console.log("data in datachange: ", data);
    emit("change", data);
};

const handleAddQuestion = () => {
    emit("addQuestion", index);
};
</script>
