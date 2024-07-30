<template>
    <
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="register">
            <p class="mt-10 text-center text-sm text-gray-500">
                Already have an account?
                <router-link
                    :to="{ name: 'register' }"
                    class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >Login now
                </router-link>
            </p>
            <div>
                <label
                    for="email"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Email address</label
                >
                <div class="mt-2">
                    <input
                        v-model="form.email"
                        id="email"
                        name="email"
                        type="email"
                        autocomplete="email"
                        required
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <label
                    for="name"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Full Name</label
                >
                <div class="mt-2">
                    <input
                        v-model="form.name"
                        id="name"
                        name="name"
                        type="text"
                        required
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <label
                        for="password"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Password</label
                    >
                    <div class="text-sm">
                        <a
                            href="#"
                            class="font-semibold text-indigo-600 hover:text-indigo-500"
                            >Forgot password?</a
                        >
                    </div>
                </div>
                <div class="mt-2">
                    <input
                        v-model="form.password"
                        id="password"
                        name="password"
                        type="password"
                        autocomplete="current-password"
                        required
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <div class="flex items-center justify-between">
                    <label
                        for="password_confirmation"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Confirm Password</label
                    >
                </div>
                <div class="mt-2">
                    <input
                        v-model="form.password_confirmation"
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        autocomplete="current-password"
                        required
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <button
                    :disabled="isLoading"
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Register
                </button>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { IRegsterUser, useUserStore } from "@/store/user";
import { ref } from "vue";
import { useRouter } from "vue-router";

const form = ref<IRegsterUser>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
});
const errorMsg = ref();

const userStore = useUserStore();
const isLoading = ref(false);
const router = useRouter();

const register = async () => {
    // console.log("REGISTERING");
    // console.log("register data: ", form);
    isLoading.value = true;
    try {
        await userStore.registerUser(form.value);
        router.push({ name: "dashboard" });
    } catch (error) {
        errorMsg.value = error;
    }
    isLoading.value = false;
};
</script>
