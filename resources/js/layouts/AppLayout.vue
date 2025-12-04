<script setup lang="ts">
import { ref, watch } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { toast } from 'vue-sonner';
import AppLayout from '@/layouts/app/AppSidebarLayout.vue';
import { Toaster } from '@/components/ui/sonner';
import type { BreadcrumbItemType } from '@/types';

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});

const page = usePage();
const lastSuccess = ref<string | null>(null);
const lastError = ref<string | null>(null);

watch(
    () => (page.props.flash as { success?: string; error?: string } | undefined)?.success,
    (message) => {
        if (message && message !== lastSuccess.value) {
            toast.success(message);
            lastSuccess.value = message;
        }
    },
    { immediate: true },
);

watch(
    () => (page.props.flash as { success?: string; error?: string } | undefined)?.error,
    (message) => {
        if (message && message !== lastError.value) {
            toast.error(message);
            lastError.value = message;
        }
    },
    { immediate: true },
);

// Reset last values when flash messages are cleared
watch(
    () => page.props.flash,
    (flash) => {
        const flashObj = flash as { success?: string; error?: string } | undefined;
        if (!flashObj?.success) {
            lastSuccess.value = null;
        }
        if (!flashObj?.error) {
            lastError.value = null;
        }
    },
);
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <Toaster />
        <slot />
    </AppLayout>
</template>
