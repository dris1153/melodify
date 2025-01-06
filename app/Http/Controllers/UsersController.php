<?php

namespace App\Http\Controllers;

use App\Models\RequestToArtist;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UsersController extends Controller
{
    //
    public function list()
    {
        $users = User::where('id', '!=', Auth::user()->id)->get();
        return Inertia::render('Admin/Users/Index', [
            'users' => $users
        ]);
    }

    public function edit($id)
    {
        $user = User::find($id);
        return Inertia::render('Admin/Users/Edit', props: [
            'user' => $user
        ]);
    }

    public function delete($id): RedirectResponse
    {
        $user = User::find($id);
        $user->delete();
        return redirect()->route('admin.users.list');
    }

    public function update($id): RedirectResponse
    {
        $user = User::find($id);
        $request = request();

        $user->fill($request->all());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }
        // Handle avatar upload if present
        if ($request->hasFile('avatar')) {
            // Delete old avatar if it exists
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }

            // Store new avatar
            $path = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = asset("/storage/{$path}");
        }

        $user->save();

        return redirect()->route('admin.users.edit', ['id' => $id]);
    }

    public function reset_password($id): RedirectResponse
    {
        $user = User::find($id);
        $user->password = bcrypt('12345678');
        $user->save();
        return redirect()->route('admin.users.edit', ['id' => $id]);
    }

    public function create()
    {
        return Inertia::render('Admin/Users/Edit');
    }

    public function create_handle(): RedirectResponse
    {
        $request = request();

        $user = new User();
        $user->fill($request->all());
        $user->password = bcrypt('12345678');

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }
        // Handle avatar upload if present
        if ($request->hasFile('avatar')) {
            // Delete old avatar if it exists
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }

            // Store new avatar
            $path = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = asset("/storage/{$path}");
        }


        $user->save();
        return redirect()->route('admin.users.list');
    }

    public function request_to_be_artist()
    {
        $requests = RequestToArtist::where('state', 'pending')->get();
        $requests->load('user');
        return Inertia::render('Admin/Users/RequestToBeArtist', [
            'requests' => $requests
        ]);
    }

    public function request_to_be_artist_handle()
    {

        $request = request();
        $record = RequestToArtist::find($request->id);
        if ($request->state == 'approved') {
            $user = User::find($record->user_id);
            $user->role = 'artist';
            $user->description = $record->description;
            $user->save();
            $record->state = 'approved';
            $record->save();
        } else {
            $record->state = 'rejected';
            $record->save();
        }

        return redirect()->route('admin.users.request-to-be-artist');
    }
}
