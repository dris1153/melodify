<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SongController;
use App\Http\Controllers\UsersController;
use App\Models\Song;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $newest_songs = Song::orderBy('created_at', 'desc')->limit(10)->get();
    $newest_songs->load('artists', 'genres');
    return Inertia::render('Discover', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'newestSongs' => $newest_songs
    ]);
})->name('discover');

Route::prefix("admin")->name("admin.")->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('index');
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified', 'admin'])->name('dashboard');
    Route::middleware('admin')->group(function () {
        Route::prefix("users")->name("users.")->group(function () {
            Route::get('/', [UsersController::class, 'list'])->name('list');
            Route::delete('/delete/{id}', [UsersController::class, 'delete'])->name('delete');
            Route::get('/edit/{id}', [UsersController::class, 'edit'])->name('edit');
            Route::post('/update/{id}', [UsersController::class, 'update'])->name('update');
            Route::post('/reset-password/{id}', [UsersController::class, 'reset_password'])->name('reset-password');
            Route::get('/create', [UsersController::class, 'create'])->name('create');
            Route::post('/create-handle', [UsersController::class, 'create_handle'])->name('create-handle');
        });
        Route::prefix("categories")->name("categories.")->group(function () {
            Route::get('/', [CategoryController::class, 'list'])->name('list');
            Route::delete('/delete/{id}', [CategoryController::class, 'delete'])->name('delete');
            Route::get('/edit/{id}', [CategoryController::class, 'edit'])->name('edit');
            Route::post('/update/{id}', [CategoryController::class, 'update'])->name('update');
            Route::get('/create', [CategoryController::class, 'create'])->name('create');
            Route::post('/create-handle', [CategoryController::class, 'create_handle'])->name('create-handle');
        });
        Route::prefix("songs")->name("songs.")->group(function () {
            Route::get('/', [SongController::class, 'list'])->name('list');
            Route::delete('/delete/{id}', [SongController::class, 'delete'])->name('delete');
            Route::get('/edit/{id}', [SongController::class, 'edit'])->name('edit');
            Route::post('/update/{id}', [SongController::class, 'update'])->name('update');
            Route::get('/create', [SongController::class, 'create'])->name('create');
            Route::post('/create-handle', [SongController::class, 'create_handle'])->name('create-handle');
        });
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/artist/request/{user_id}', [ArtistController::class, 'request_become'])->name('profile.request-artist');
});


require __DIR__ . '/auth.php';
