<template>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="login">
            <p class="mt-10 text-center text-sm text-gray-500">
                Not a member?
                <router-link
                    :to="{ name: 'register' }"
                    class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >Go to Register Noww</router-link
                >
            </p>
            <div v-if="errorMsg" class="mt-2 bg-red-500 text-white rounded-md">
                <div class="flex justify-between items-center px-5 py-3">
                    <p>{{ errorMsg }}</p>
                    <span
                        @click="errorMsg = ''"
                        class="rounded-full hover:bg-slate-600/50 h-8 w-8"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="{1.5}"
                            stroke="currentColor"
                            className="w-6 h-6 "
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </span>
                </div>
            </div>
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
                <div class="flex items-center justify-between">
                    <label
                        for="password"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Password</label
                    >
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
                <div class="py-2 mt-2">
                    <div class="w-full flex justify-between items-center">
                        <div class="flex items-center">
                            <input
                                v-model="form.remember"
                                id="remember"
                                name="remember"
                                type="checkbox"
                                class="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <label
                                for="remember"
                                class="block ml-2 text-sm font-medium leading-6 text-gray-500"
                                >Remember Me</label
                            >
                        </div>
                        <div class="text-sm">
                            <router-link
                                to="#"
                                class="font-semibold text-indigo-600 hover:text-indigo-500"
                                >Forgot password?</router-link
                            >
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Sign in
                </button>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { ILoginUser, useUserStore } from "@/store/user";
import { ref } from "vue";
import { useRouter } from "vue-router";

const form = ref<ILoginUser>({
    email: "",
    password: "",
    remember: false,
});

const userStore = useUserStore();
const isLoading = ref(false);
const errorMsg = ref("");
const router = useRouter();

const login = async () => {
    console.log(form.value);
    isLoading.value = true;
    try {
        await userStore.loginUser(form.value);
        if (userStore.token) {
            errorMsg.value = "";
            router.push({ name: "dashboard" });
        }
    } catch (error) {
        errorMsg.value = error as string;
    } finally {
        isLoading.value = false;
    }
};
</script>
