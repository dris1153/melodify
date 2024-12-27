<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    //
    public function list()
    {
        $users = User::where('id', '!=', Auth::user()->id)->get();
        return Inertia::render('Admin/Users', [
            'users' => $users
        ]);
    }

    public function delete($id): RedirectResponse
    {
        $user = User::find($id);
        $user->delete();
        return redirect()->route('admin.users.list');
    }
}
