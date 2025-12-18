<?php

use App\Models\User;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('can list users', function () {
    actingAs($this->user)
        ->get(route('users.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Users/Index')
            ->has('users.data')
        );
});

it('can show create user page', function () {
    actingAs($this->user)
        ->get(route('users.create'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Users/Create')
        );
});

it('can store a new user', function () {
    actingAs($this->user)
        ->post(route('users.store'), [
            'name' => 'New User',
            'email' => 'new@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ])
        ->assertRedirect(route('users.index'));

    expect(User::where('email', 'new@example.com')->exists())->toBeTrue();
});

it('can show edit user page', function () {
    $otherUser = User::factory()->create();

    actingAs($this->user)
        ->get(route('users.edit', $otherUser))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Users/Edit')
            ->has('user')
        );
});

it('can update a user', function () {
    $otherUser = User::factory()->create();

    actingAs($this->user)
        ->put(route('users.update', $otherUser), [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
        ])
        ->assertRedirect(route('users.index'));

    expect($otherUser->refresh()->name)->toBe('Updated Name');
});

it('can delete a user', function () {
    $otherUser = User::factory()->create();

    actingAs($this->user)
        ->delete(route('users.destroy', $otherUser))
        ->assertRedirect(route('users.index'));

    expect(User::find($otherUser->id))->toBeNull();
});
