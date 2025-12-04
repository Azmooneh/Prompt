<script setup lang="ts">
import UserController from '@/actions/App/Http/Controllers/UserController';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem, type User } from '@/types';
import { Head, Link } from '@inertiajs/vue3';
import { Edit, Mail, Calendar, CheckCircle, XCircle } from 'lucide-vue-next';

interface Props {
    user: User;
}

const props = defineProps<Props>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: UserController.index.url(),
    },
    {
        title: props.user.name,
        href: UserController.show.url({ user: props.user.id }),
    },
];

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
};
</script>

<template>
    <Head :title="user.name" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <Card>
                <CardHeader>
                    <div class="flex items-center justify-between">
                        <div>
                            <CardTitle>{{ user.name }}</CardTitle>
                            <CardDescription>User Details</CardDescription>
                        </div>
                        <Link :href="UserController.edit.url({ user: user.id })">
                            <Button>
                                <Edit class="me-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    <div class="space-y-6">
                        <div class="grid gap-2">
                            <div class="text-sm font-medium">ID</div>
                            <div class="text-sm text-muted-foreground">{{ user.id }}</div>
                        </div>

                        <div class="grid gap-2">
                            <div class="text-sm font-medium">Name</div>
                            <div class="text-sm text-muted-foreground">{{ user.name }}</div>
                        </div>

                        <div class="grid gap-2">
                            <div class="flex items-center gap-2 text-sm font-medium">
                                <Mail class="h-4 w-4" />
                                Email
                            </div>
                            <div class="text-sm text-muted-foreground">{{ user.email }}</div>
                        </div>

                        <div class="grid gap-2">
                            <div class="flex items-center gap-2 text-sm font-medium">
                                Email Verification Status
                            </div>
                            <div class="flex items-center gap-2">
                                <CheckCircle
                                    v-if="user.email_verified_at"
                                    class="h-4 w-4 text-green-600"
                                />
                                <XCircle
                                    v-else
                                    class="h-4 w-4 text-red-600"
                                />
                                <span
                                    :class="
                                        user.email_verified_at
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    "
                                >
                                    {{
                                        user.email_verified_at
                                            ? 'Verified'
                                            : 'Not Verified'
                                    }}
                                </span>
                            </div>
                        </div>

                        <div class="grid gap-2">
                            <div class="flex items-center gap-2 text-sm font-medium">
                                <Calendar class="h-4 w-4" />
                                Created At
                            </div>
                            <div class="text-sm text-muted-foreground">
                                {{ formatDate(user.created_at) }}
                            </div>
                        </div>

                        <div class="grid gap-2">
                            <div class="flex items-center gap-2 text-sm font-medium">
                                <Calendar class="h-4 w-4" />
                                Updated At
                            </div>
                            <div class="text-sm text-muted-foreground">
                                {{ formatDate(user.updated_at) }}
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 flex items-center gap-4">
                        <Link :href="UserController.index.url()">
                            <Button variant="outline">Back to Users</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>

