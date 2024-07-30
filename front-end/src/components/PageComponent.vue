<template>
    <header class="bg-white shadow">
        <div class="mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900">
                {{ title }}
            </h1>
            <slot name="header"></slot>
        </div>
    </header>
    <main class="bg-gray-100 min-h-screen">
        <div class="mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-6 sm:px-0">
                <slot></slot>
            </div>
        </div>
    </main>
</template>

<script lang="ts" setup>
defineProps({
    title: String,
});
</script>
