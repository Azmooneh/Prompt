<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { ref } from 'vue';

// Form Components
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
    TagsInput,
    TagsInputItem,
    TagsInputItemDelete,
    TagsInputItemText,
} from '@/components/ui/tags-input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'vue-sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Test',
        href: dashboard().url,
    },
];

// Form state
const inputValue = ref('');
const textareaValue = ref('');
const selectValue = ref('');
const checkboxValue = ref(false);
const radioValue = ref('option1');
const switchValue = ref(false);
const sliderValue = ref([50]);
const tagsValue = ref(['tag1', 'tag2']);
const dateValue = ref<Date | undefined>(undefined);

function handlePromiseClick() {
    toast.promise<{ name: string }>(
        () =>
            new Promise((resolve) =>
                setTimeout(() => resolve({ name: 'Event' }), 2000),
            ),
        {
            loading: 'Loading...',
            success: (data: { name: string }) =>
                `${data.name} has been created`,
            error: 'Error',
        },
    );
}
</script>

<template>
    <Head title="Form Components Test" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="container mx-auto max-w-6xl space-y-8 p-6">
            <div class="flex flex-wrap gap-2">
                <Button
                    variant="outline"
                    @click="() => toast('Event has been created')"
                >
                    Default
                </Button>
                <Button
                    variant="outline"
                    @click="() => toast.success('Event has been created')"
                >
                    Success
                </Button>
                <Button
                    variant="outline"
                    @click="
                        () =>
                            toast.info(
                                'Be at the area 10 minutes before the event time',
                            )
                    "
                >
                    Info
                </Button>
                <Button
                    variant="outline"
                    @click="
                        () =>
                            toast.warning(
                                'Event start time cannot be earlier than 8am',
                            )
                    "
                >
                    Warning
                </Button>
                <Button
                    variant="outline"
                    @click="() => toast.error('Event has not been created')"
                >
                    Error
                </Button>
                <Button variant="outline" @click="handlePromiseClick">
                    Promise
                </Button>
            </div>

            <div>
                <h1 class="text-3xl font-bold">Form Components Showcase</h1>
                <p class="mt-2 text-muted-foreground">
                    نمایش تمام کامپوننت‌های مرتبط با فرم از shadcn-vue
                </p>
            </div>

            <Separator />

            <!-- Basic Inputs -->
            <Card>
                <CardHeader>
                    <CardTitle>Basic Inputs</CardTitle>
                    <CardDescription>ورودی‌های پایه</CardDescription>
                </CardHeader>
                <CardContent class="space-y-6">
                    <div class="space-y-2">
                        <Label for="input">Input</Label>
                        <Input
                            id="input"
                            v-model="inputValue"
                            placeholder="Enter text..."
                        />
                    </div>

                    <div class="space-y-2">
                        <Label for="textarea">Textarea</Label>
                        <Textarea
                            id="textarea"
                            v-model="textareaValue"
                            placeholder="Enter multiline text..."
                            rows="4"
                        />
                    </div>

                    <div class="space-y-2">
                        <Label for="disabled-input">Disabled Input</Label>
                        <Input
                            id="disabled-input"
                            value="Disabled value"
                            disabled
                        />
                    </div>
                </CardContent>
            </Card>

            <!-- Select -->
            <Card>
                <CardHeader>
                    <CardTitle>Select</CardTitle>
                    <CardDescription>انتخابگر</CardDescription>
                </CardHeader>
                <CardContent class="space-y-6">
                    <div class="space-y-2">
                        <Label>Select</Label>
                        <Select v-model="selectValue">
                            <SelectTrigger>
                                <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="option1"
                                    >Option 1</SelectItem
                                >
                                <SelectItem value="option2"
                                    >Option 2</SelectItem
                                >
                                <SelectItem value="option3"
                                    >Option 3</SelectItem
                                >
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <!-- Checkbox & Switch -->
            <Card>
                <CardHeader>
                    <CardTitle>Checkbox & Switch</CardTitle>
                    <CardDescription>چک‌باکس و سوئیچ</CardDescription>
                </CardHeader>
                <CardContent class="space-y-6">
                    <div class="flex items-center gap-2">
                        <Checkbox id="checkbox" v-model="checkboxValue" />
                        <Label for="checkbox" class="cursor-pointer">
                            Accept terms and conditions
                        </Label>
                    </div>

                    <div class="flex items-center gap-2">
                        <Switch id="switch" v-model="switchValue" />
                        <Label for="switch" class="cursor-pointer">
                            Enable notifications
                        </Label>
                    </div>
                </CardContent>
            </Card>

            <!-- Radio Group -->
            <Card>
                <CardHeader>
                    <CardTitle>Radio Group</CardTitle>
                    <CardDescription>گروه رادیویی</CardDescription>
                </CardHeader>
                <CardContent class="space-y-6">
                    <div class="space-y-2">
                        <Label>Choose an option</Label>
                        <RadioGroup v-model="radioValue">
                            <div class="flex items-center gap-2">
                                <RadioGroupItem
                                    id="radio-option1"
                                    value="option1"
                                />
                                <Label
                                    for="radio-option1"
                                    class="cursor-pointer"
                                >
                                    Option 1
                                </Label>
                            </div>
                            <div class="flex items-center gap-2">
                                <RadioGroupItem
                                    id="radio-option2"
                                    value="option2"
                                />
                                <Label
                                    for="radio-option2"
                                    class="cursor-pointer"
                                >
                                    Option 2
                                </Label>
                            </div>
                            <div class="flex items-center gap-2">
                                <RadioGroupItem
                                    id="radio-option3"
                                    value="option3"
                                />
                                <Label
                                    for="radio-option3"
                                    class="cursor-pointer"
                                >
                                    Option 3
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                </CardContent>
            </Card>

            <!-- Slider -->
            <Card>
                <CardHeader>
                    <CardTitle>Slider</CardTitle>
                    <CardDescription>اسلایدر</CardDescription>
                </CardHeader>
                <CardContent class="space-y-6">
                    <div class="space-y-2">
                        <Label>Volume: {{ sliderValue[0] }}</Label>
                        <Slider
                            v-model="sliderValue"
                            :min="0"
                            :max="100"
                            :step="1"
                        />
                    </div>
                </CardContent>
            </Card>

            <!-- Tags Input -->
            <Card>
                <CardHeader>
                    <CardTitle>Tags Input</CardTitle>
                    <CardDescription>ورودی تگ‌ها</CardDescription>
                </CardHeader>
                <CardContent class="space-y-6">
                    <div class="space-y-2">
                        <Label>Tags</Label>
                        <TagsInput v-model="tagsValue">
                            <TagsInputItem
                                v-for="tag in tagsValue"
                                :key="tag"
                                :value="tag"
                            >
                                <TagsInputItemText />
                                <TagsInputItemDelete />
                            </TagsInputItem>
                        </TagsInput>
                    </div>
                </CardContent>
            </Card>

            <!-- Calendar -->
            <Card>
                <CardHeader>
                    <CardTitle>Calendar</CardTitle>
                    <CardDescription>تقویم</CardDescription>
                </CardHeader>
                <CardContent class="space-y-6">
                    <div class="space-y-2">
                        <Label>Select Date</Label>
                        <Calendar v-model="dateValue" />
                    </div>
                </CardContent>
            </Card>

            <!-- Input Group -->
            <Card>
                <CardHeader>
                    <CardTitle>Input Group</CardTitle>
                    <CardDescription>گروه ورودی</CardDescription>
                </CardHeader>
                <CardContent class="space-y-6">
                    <div class="space-y-2">
                        <Label>Username</Label>
                        <InputGroup>
                            <InputGroupAddon data-align="inline-start"
                                >@</InputGroupAddon
                            >
                            <InputGroupInput placeholder="username" />
                        </InputGroup>
                    </div>

                    <div class="space-y-2">
                        <Label>Website</Label>
                        <InputGroup>
                            <InputGroupAddon data-align="inline-start"
                                >https://</InputGroupAddon
                            >
                            <InputGroupInput placeholder="example.com" />
                        </InputGroup>
                    </div>
                </CardContent>
            </Card>

            <!-- Field Component -->
            <Card>
                <CardHeader>
                    <CardTitle>Field Component</CardTitle>
                    <CardDescription>کامپوننت فیلد</CardDescription>
                </CardHeader>
                <CardContent class="space-y-6">
                    <Field orientation="vertical">
                        <FieldLabel>Email</FieldLabel>
                        <Input type="email" placeholder="email@example.com" />
                        <FieldDescription
                            >Enter your email address</FieldDescription
                        >
                    </Field>

                    <Field orientation="vertical">
                        <FieldLabel>Password</FieldLabel>
                        <Input type="password" placeholder="Enter password" />
                        <FieldError :errors="[]" />
                    </Field>
                </CardContent>
            </Card>

            <!-- Buttons -->
            <Card>
                <CardHeader>
                    <CardTitle>Buttons</CardTitle>
                    <CardDescription>دکمه‌ها</CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                    <div class="flex flex-wrap gap-2">
                        <Button variant="default">Default</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <Button size="sm">Small</Button>
                        <Button size="default">Default</Button>
                        <Button size="lg">Large</Button>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <Button disabled>Disabled</Button>
                        <Button variant="default"> Submit </Button>
                    </div>
                </CardContent>
            </Card>

            <!-- Combined Form Example -->
            <Card>
                <CardHeader>
                    <CardTitle>Complete Form Example</CardTitle>
                    <CardDescription>مثال کامل فرم</CardDescription>
                </CardHeader>
                <CardContent>
                    <form class="space-y-6">
                        <div class="grid gap-4 md:grid-cols-2">
                            <Field orientation="vertical">
                                <FieldLabel>First Name</FieldLabel>
                                <Input placeholder="John" />
                            </Field>

                            <Field orientation="vertical">
                                <FieldLabel>Last Name</FieldLabel>
                                <Input placeholder="Doe" />
                            </Field>
                        </div>

                        <Field orientation="vertical">
                            <FieldLabel>Email</FieldLabel>
                            <Input
                                type="email"
                                placeholder="john@example.com"
                            />
                        </Field>

                        <Field orientation="vertical">
                            <FieldLabel>Message</FieldLabel>
                            <Textarea
                                placeholder="Enter your message..."
                                rows="4"
                            />
                        </Field>

                        <div class="flex items-center gap-2">
                            <Checkbox id="terms" />
                            <Label for="terms" class="cursor-pointer">
                                I agree to the terms and conditions
                            </Label>
                        </div>

                        <div class="flex gap-2">
                            <Button type="submit"> Submit </Button>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
