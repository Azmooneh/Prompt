<script setup lang="ts">
import type {
    ColumnDef,
    SortingState,
    VisibilityState,
} from '@tanstack/vue-table';
import {
    FlexRender,
    getCoreRowModel,
    getSortedRowModel,
    useVueTable,
} from '@tanstack/vue-table';
import { h, nextTick, ref, watch } from 'vue';
import { valueUpdater } from '@/components/ui/table/utils';
import UserController from '@/actions/App/Http/Controllers/UserController';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import type { User } from '@/types';
import { Head, Link, router } from '@inertiajs/vue3';
import { Edit, Eye, MoreHorizontal, Plus, Search, Trash2 } from 'lucide-vue-next';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DataTableColumnHeader,
    DataTableViewOptions,
} from '@/components/ui/data-table';
import LaravelPagination from '@/components/LaravelPagination.vue';

interface PaginatedUsers {
    data: User[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    users: PaginatedUsers;
    filters: {
        search?: string;
        sort_by?: string;
        sort_order?: string;
        per_page?: number;
    };
}

const props = defineProps<Props>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: UserController.index.url(),
    },
];

const search = ref(props.filters.search || '');
const deletingUserId = ref<number | null>(null);
const isDeleteDialogOpen = ref(false);
const sorting = ref<SortingState>(
    props.filters.sort_by
        ? [
              {
                  id: props.filters.sort_by,
                  desc: props.filters.sort_order === 'desc',
              },
          ]
        : [],
);

const handleSortingChange = (newSorting: SortingState) => {
    if (newSorting.length > 0) {
        const sort = newSorting[0];
        router.get(
            UserController.index.url(),
            {
                ...props.filters,
                sort_by: sort.id,
                sort_order: sort.desc ? 'desc' : 'asc',
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    } else {
        // Clear sorting
        router.get(
            UserController.index.url(),
            {
                ...props.filters,
                sort_by: undefined,
                sort_order: undefined,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    }
};

const handleSearch = () => {
    router.get(
        UserController.index.url(),
        {
            ...props.filters,
            search: search.value,
        },
        {
            preserveState: true,
            replace: true,
        },
    );
};

watch(
    () => props.filters.search,
    (value) => {
        search.value = value || '';
    },
);

watch(
    () => props.filters.sort_by,
    (value) => {
        if (value) {
            sorting.value = [
                {
                    id: value,
                    desc: props.filters.sort_order === 'desc',
                },
            ];
        }
    },
);

const handleDelete = (userId: number) => {
    deletingUserId.value = userId;
    isDeleteDialogOpen.value = true;
};

const confirmDelete = () => {
    if (deletingUserId.value) {
        router.delete(UserController.destroy.url({ user: deletingUserId.value }), {
            preserveScroll: true,
            onSuccess: () => {
                isDeleteDialogOpen.value = false;
                deletingUserId.value = null;
            },
        });
    }
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
};

const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) =>
            h(DataTableColumnHeader, {
                column,
                title: 'ID',
            }),
    },
    {
        accessorKey: 'name',
        header: ({ column }) =>
            h(DataTableColumnHeader, {
                column,
                title: 'Name',
            }),
        cell: ({ row }) => h('div', { class: 'font-medium' }, row.getValue('name')),
    },
    {
        accessorKey: 'email',
        header: ({ column }) =>
            h(DataTableColumnHeader, {
                column,
                title: 'Email',
            }),
        cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email')),
    },
    {
        accessorKey: 'email_verified_at',
        header: 'Email Verified',
        cell: ({ row }) => {
            const verified = row.getValue('email_verified_at') as string | null;
            return h(
                'span',
                {
                    class: verified ? 'text-green-600' : 'text-red-600',
                },
                verified ? 'Verified' : 'Not Verified',
            );
        },
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) =>
            h(DataTableColumnHeader, {
                column,
                title: 'Created At',
            }),
        cell: ({ row }) => {
            const date = row.getValue('created_at') as string;
            return h('div', formatDate(date));
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const user = row.original;

            return h(
                DropdownMenu,
                {},
                {
                    default: () => [
                        h(
                            DropdownMenuTrigger,
                            { asChild: true },
                            {
                                default: () =>
                                    h(
                                        Button,
                                        {
                                            variant: 'ghost',
                                            class: 'h-8 w-8 p-0',
                                        },
                                        {
                                            default: () => [
                                                h('span', { class: 'sr-only' }, 'Open menu'),
                                                h(MoreHorizontal, { class: 'h-4 w-4' }),
                                            ],
                                        },
                                    ),
                            },
                        ),
                        h(
                            DropdownMenuContent,
                            { align: 'end' },
                            {
                                default: () => [
                                    h(DropdownMenuLabel, {}, { default: () => 'Actions' }),
                                    h(
                                        DropdownMenuItem,
                                        { asChild: true },
                                        {
                                            default: () =>
                                                h(
                                                    Link,
                                                    {
                                                        href: UserController.show.url({
                                                            user: user.id,
                                                        }),
                                                        class: 'block w-full',
                                                    },
                                                    {
                                                        default: () => [
                                                            h(Eye, {
                                                                class: 'me-2 h-4 w-4',
                                                            }),
                                                            'View',
                                                        ],
                                                    },
                                                ),
                                        },
                                    ),
                                    h(
                                        DropdownMenuItem,
                                        { asChild: true },
                                        {
                                            default: () =>
                                                h(
                                                    Link,
                                                    {
                                                        href: UserController.edit.url({
                                                            user: user.id,
                                                        }),
                                                        class: 'block w-full',
                                                    },
                                                    {
                                                        default: () => [
                                                            h(Edit, {
                                                                class: 'me-2 h-4 w-4',
                                                            }),
                                                            'Edit',
                                                        ],
                                                    },
                                                ),
                                        },
                                    ),
                                    h(DropdownMenuSeparator),
                                    h(
                                        DropdownMenuItem,
                                        {
                                            onClick: () => handleDelete(user.id),
                                            class: 'text-destructive',
                                        },
                                        {
                                            default: () => [
                                                h(Trash2, {
                                                    class: 'me-2 h-4 w-4',
                                                }),
                                                'Delete',
                                            ],
                                        },
                                    ),
                                ],
                            },
                        ),
                    ],
                },
            );
        },
    },
];

const columnVisibility = ref<VisibilityState>({});

const table = useVueTable({
    data: props.users.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    onSortingChange: (updaterOrValue) => {
        valueUpdater(updaterOrValue, sorting);
        nextTick(() => {
            handleSortingChange(sorting.value);
        });
    },
    onColumnVisibilityChange: (updaterOrValue) => {
        valueUpdater(updaterOrValue, columnVisibility);
    },
    state: {
        get sorting() {
            return sorting.value;
        },
        get columnVisibility() {
            return columnVisibility.value;
        },
    },
});
</script>

<template>
    <Head title="Users" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <Card>
                <CardHeader>
                    <div class="flex items-center justify-between">
                        <div>
                            <CardTitle>Users</CardTitle>
                            <CardDescription>
                                Manage your application users
                            </CardDescription>
                        </div>
                        <Link :href="UserController.create.url()">
                            <Button>
                                <Plus class="me-2 h-4 w-4" />
                                Create User
                            </Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    <div class="mb-4 flex items-center gap-2">
                        <div class="relative flex-1">
                            <Search
                                class="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                            />
                            <Input
                                v-model="search"
                                placeholder="Search users..."
                                class="ps-10"
                                @keyup.enter="handleSearch"
                            />
                        </div>
                        <Button @click="handleSearch">Search</Button>
                        <DataTableViewOptions :table="table" />
                    </div>

                    <div class="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow
                                    v-for="headerGroup in table.getHeaderGroups()"
                                    :key="headerGroup.id"
                                >
                                    <TableHead
                                        v-for="header in headerGroup.headers"
                                        :key="header.id"
                                    >
                                        <FlexRender
                                            v-if="!header.isPlaceholder"
                                            :render="header.column.columnDef.header"
                                            :props="header.getContext()"
                                        />
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <template v-if="table.getRowModel().rows?.length">
                                    <TableRow
                                        v-for="row in table.getRowModel().rows"
                                        :key="row.id"
                                        :data-state="row.getIsSelected() && 'selected'"
                                    >
                                        <TableCell
                                            v-for="cell in row.getVisibleCells()"
                                            :key="cell.id"
                                        >
                                            <FlexRender
                                                :render="cell.column.columnDef.cell"
                                                :props="cell.getContext()"
                                            />
                                        </TableCell>
                                    </TableRow>
                                </template>
                                <TableRow v-else>
                                    <TableCell
                                        :colspan="columns.length"
                                        class="h-24 text-center"
                                    >
                                        No users found.
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <!-- Pagination -->
                    <LaravelPagination
                        v-if="users.last_page > 1"
                        class="mt-4"
                        :links="users.links"
                        :from="users.from"
                        :to="users.to"
                        :total="users.total"
                    />
                </CardContent>
            </Card>
        </div>
    </AppLayout>

    <AlertDialog v-model:open="isDeleteDialogOpen">
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the
                    user account.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction @click="confirmDelete">Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>

