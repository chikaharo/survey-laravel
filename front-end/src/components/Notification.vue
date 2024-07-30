<template>
    <Teleport to="#notification">
        <!-- <button @click="notification.open">Toggle Modal</button> -->
        <Transition name="notify-fade">
            <div
                v-if="notification.show"
                class="fixed w-[300px] left-4 bottom-4"
            >
                <!-- <div
                    class="flex items-start justify-center min-w-full min-h-screen mt-24 text-center"
                > -->
                <div
                    :class="{
                        'bg-emerald-500': notification.type === 'success',
                        'bg-red-500': notification.type === 'danger',
                        'px-6 py-3 pr-3 rounded-md shadow-md text-white flex items-center justify-between': true,
                    }"
                >
                    {{ notification.message }}
                    <button
                        class="px-3 py-2 text-white"
                        @click="notification.close"
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
                    </button>
                </div>
                <!-- </div> -->
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { useNotificationStore } from "@/store/notification.ts";

const notification = useNotificationStore();
</script>

<style>
.notify-fade-enter-active,
.notify-fade-leave-active {
    transform: translateY(0);
    opacity: 1;
    transition: all 0.5s ease;
}

.notify-fade-enter-from,
.notify-fade-leave-to {
    transform: translateY(170px);
    opacity: 0;
}
</style>
