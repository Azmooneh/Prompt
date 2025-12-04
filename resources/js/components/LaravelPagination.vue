<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-vue-next';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    links: PaginationLink[];
    from?: number;
    to?: number;
    total?: number;
}

const props = defineProps<Props>();

const isPrevious = (label: string): boolean => {
    return label.includes('Previous') || label.includes('&laquo;');
};

const isNext = (label: string): boolean => {
    return label.includes('Next') || label.includes('&raquo;');
};

const isEllipsis = (label: string): boolean => {
    return label.trim() === '...';
};

const cleanLabel = (label: string): string => {
    return label
        .replace(/&laquo;/g, '')
        .replace(/&raquo;/g, '')
        .replace(/Previous/gi, '')
        .replace(/Next/gi, '')
        .trim();
};
</script>

<template>
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="text-sm text-muted-foreground">
            <span v-if="from && to && total">
                Showing {{ from }} to {{ to }} of {{ total }} results
            </span>
        </div>

        <nav
            v-if="links.length > 3"
            class="flex items-center gap-1"
            aria-label="Pagination"
        >
            <template v-for="(link, index) in links" :key="index">
                <Link
                    v-if="link.url"
                    :href="link.url"
                    :class="[
                        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                        link.active
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : 'hover:bg-accent hover:text-accent-foreground',
                        isPrevious(link.label) || isNext(link.label)
                            ? 'h-10 px-4'
                            : 'h-10 w-10',
                    ]"
                    preserve-state
                >
                    <template v-if="isPrevious(link.label)">
                        <ChevronLeft class="h-4 w-4 rtl:rotate-180" />
                        <span class="hidden sm:inline ms-1">Previous</span>
                    </template>
                    <template v-else-if="isNext(link.label)">
                        <span class="hidden sm:inline me-1">Next</span>
                        <ChevronRight class="h-4 w-4 rtl:rotate-180" />
                    </template>
                    <template v-else-if="isEllipsis(link.label)">
                        <MoreHorizontal class="h-4 w-4" />
                        <span class="sr-only">More pages</span>
                    </template>
                    <template v-else>
                        {{ cleanLabel(link.label) }}
                    </template>
                </Link>
                <span
                    v-else
                    :class="[
                        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium pointer-events-none opacity-50',
                        isPrevious(link.label) || isNext(link.label)
                            ? 'h-10 px-4'
                            : 'h-10 w-10',
                    ]"
                >
                    <template v-if="isPrevious(link.label)">
                        <ChevronLeft class="h-4 w-4 rtl:rotate-180" />
                        <span class="hidden sm:inline ms-1">Previous</span>
                    </template>
                    <template v-else-if="isNext(link.label)">
                        <span class="hidden sm:inline me-1">Next</span>
                        <ChevronRight class="h-4 w-4 rtl:rotate-180" />
                    </template>
                    <template v-else-if="isEllipsis(link.label)">
                        <MoreHorizontal class="h-4 w-4" />
                    </template>
                    <template v-else>
                        {{ cleanLabel(link.label) }}
                    </template>
                </span>
            </template>
        </nav>
    </div>
</template>
