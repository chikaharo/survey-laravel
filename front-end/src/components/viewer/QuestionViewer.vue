<template>
    <fieldset class="mb-4">
        <legend class="font-medium mb-2">
            {{ index + 1 }}. {{ question?.question }}
        </legend>
        <div class="mt-2">
            <div v-if="question?.type === 'text'">
                <input
                    :value="modelValue"
                    @change="emits('update:modelValue', $event.target.value)"
                    class="border-gray-30 focus:border-indigo-500 block w-full rounded-md"
                    type="text"
                />
            </div>
            <div v-else-if="question?.type === 'textarea'">
                <textarea
                    :value="modelValue"
                    @change="emits('update:modelValue', $event.target.value)"
                    rows="3"
                    class="w-full shadow-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
            </div>
            <div v-else-if="question?.type === 'select'">
                <select
                    :value="modelValue"
                    @change="emits('update:modelValue', $event.target.value)"
                    class="px-4 py-3 border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">Select an option</option>
                    <option
                        v-for="opt in question?.data.options"
                        :key="opt.uuid"
                        :value="opt.text"
                    >
                        {{ opt.text }}
                    </option>
                </select>
            </div>
            <div v-else-if="question?.type === 'checkbox'">
                <div v-for="option in question.data.options" key="option.uuid">
                    <input
                        type="checkbox"
                        :value="option.text"
                        @change="onCheckboxChange"
                        :id="option.uuid"
                        class="border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:ring-offset-indigo-500 text-indigo-600"
                    />
                    <label :for="option.uuid" class="ml-3">{{
                        option.text
                    }}</label>
                </div>
            </div>
            <div v-else-if="question?.type === 'radio'">
                <div
                    v-for="(option, idx) in question.data.options"
                    :key="option.uuid"
                >
                    <input
                        type="radio"
                        :value="option.text"
                        @change="
                            emits('update:modelValue', $event.target.value)
                        "
                        :name="'question' + question.id"
                        :id="option.uuid"
                        class="border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:ring-offset-indigo-500 text-indigo-600"
                    />
                    <label :for="option.uuid" class="ml-3">{{
                        option.text
                    }}</label>
                </div>
            </div>
        </div>
    </fieldset>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["index", "question", "modelValue"]);
const emits = defineEmits(["update:modelValue"]);
console.log(props.modelValue);

let model;
let onCheckboxChange = () => {};
if (props.question.type === "checkbox") {
    model = ref([]);

    onCheckboxChange = (event) => {
        const idx = model.value.findIndex(
            (value) => value === event.target.value
        );
        if (idx === -1) {
            model.value = [...model.value, event.target.value];
        } else {
            model.value = [
                ...model.value.filter((value) => value !== event.target.value),
            ];
        }
        emits("update:modelValue", model.value);
    };
}
</script>
