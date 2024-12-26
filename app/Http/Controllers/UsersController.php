<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UsersController extends Controller
{
    //
    public function list()
    {
        return Inertia::render('Admin/Users', []);
    }
}
