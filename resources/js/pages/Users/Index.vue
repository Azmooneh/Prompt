<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { type BreadcrumbItem, type User } from '@/types';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationFirst,
    PaginationItem,
    PaginationLast,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { index, create, edit, destroy } from '@/routes/users';
import { Plus, Pencil, Trash2 } from 'lucide-vue-next';

interface Props {
    users: {
        data: User[];
        links: any[];
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}

const props = defineProps<Props>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: index().url,
    },
];

const deleteUser = (user: User) => {
    if (confirm('Are you sure you want to delete this user?')) {
        router.delete(destroy.url(user.id));
    }
};

const onPageChange = (page: number) => {
    router.get(index().url, { page, per_page: props.users.per_page }, { preserveState: true, preserveScroll: true });
};

const onPerPageChange = (perPage: string) => {
    router.get(index().url, { per_page: perPage }, { preserveState: true, preserveScroll: true });
};
</script>

<template>
    <Head title="Users" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex flex-col gap-4 p-4">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-semibold">Users</h1>
                <Button as-child>
                    <Link :href="create().url">
                        <Plus class="mr-2 h-4 w-4" />
                        Add User
                    </Link>
                </Button>
            </div>

            <div class="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead class="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="user in users.data" :key="user.id">
                            <TableCell class="font-medium">{{ user.name }}</TableCell>
                            <TableCell>{{ user.email }}</TableCell>
                            <TableCell>{{ new Date(user.created_at).toLocaleDateString() }}</TableCell>
                            <TableCell class="text-right">
                                <div class="flex justify-end gap-2">
                                    <Button variant="outline" size="icon" as-child>
                                        <Link :href="edit.url(user.id)">
                                            <Pencil class="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Button variant="destructive" size="icon" @click="deleteUser(user)">
                                        <Trash2 class="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow v-if="users.data.length === 0">
                            <TableCell colspan="4" class="h-24 text-center">
                                No users found.
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <div class="flex flex-col items-center justify-between gap-4 py-4 sm:flex-row">
                <div class="flex items-center gap-4">
                    <div class="text-sm text-muted-foreground">
                        Showing {{ users.from ?? 0 }} to {{ users.to ?? 0 }} of {{ users.total }} results
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-sm text-muted-foreground">Per page</span>
                        <Select :model-value="users.per_page.toString()" @update:model-value="onPerPageChange">
                            <SelectTrigger class="h-8 w-[70px]">
                                <SelectValue :placeholder="users.per_page.toString()" />
                            </SelectTrigger>
                            <SelectContent side="top">
                                <SelectItem v-for="size in ['10', '20', '50', '100']" :key="size" :value="size">
                                    {{ size }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div v-if="users.last_page > 1">
                    <Pagination
                        v-slot="{ page }"
                        :total="users.total"
                        :items-per-page="users.per_page"
                        :sibling-count="1"
                        show-edges
                        :page="users.current_page"
                        @update:page="onPageChange"
                    >
                        <PaginationContent v-slot="{ items }">
                            <PaginationFirst />
                            <PaginationPrevious />

                            <template v-for="(item, index) in items">
                                <PaginationItem v-if="item.type === 'page'" :key="index" :value="item.value" :isActive="item.value === page">
                                    {{ item.value }}
                                </PaginationItem>
                                <PaginationEllipsis v-else :key="item.type" :index="index" />
                            </template>

                            <PaginationNext />
                            <PaginationLast />
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

