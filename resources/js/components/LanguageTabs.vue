<script setup lang="ts">
import { useLocale } from '@/composables/useLocale';
import { availableLocales } from '@/composables/translationConfig';

const { locale, updateLocale } = useLocale();
</script>

<template>
    <div
        class="flex w-full gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800"
    >
        <button
            v-for="{ value, label } in availableLocales"
            :key="value"
            @click="updateLocale(value)"
            :class="[
                'flex flex-1 items-center justify-center rounded-md px-2.5 py-1.5 text-xs transition-colors',
                locale === value
                    ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                    : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
            ]"
        >
            <span>{{ label }}</span>
        </button>
    </div>
</template>

