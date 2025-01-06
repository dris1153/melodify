<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Song;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use getID3;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;

class SongController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function list()
    {
        $songs = Song::all();
        $songs->load('artists', 'genres');
        return Inertia::render('Admin/Songs/Index', [
            'songs' => $songs
        ]);
    }

    public function list_of_artist()
    {
        $songs = Song::whereHas('artists', function ($query) {
            $query->where('artist_id', Auth::user()->id);
        })->get();
        $songs->load('artists', 'genres');
        return Inertia::render('Admin/Songs/Index', [
            'songs' => $songs
        ]);
    }

    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $genres = Category::all();
        $artists = User::where('role', 'artist')->where('id', '!=', Auth::user()->id)->get();
        return Inertia::render('Admin/Songs/Edit', [
            'genres' => $genres,
            'artists' => $artists
        ]);
    }

    public function create_handle()
    {
        $request = request();
        $song = new Song();

        $song->fill($request->all());

        if ($request->hasFile('image')) {
            if ($song->avatar) {
                Storage::disk('public')->delete($song->avatar);
            }

            // Store new avatar
            $path = $request->file('image')->store('images', 'public');
            $song->image = asset("/storage/{$path}");
        }

        if ($request->hasFile('audio')) {
            $titleSlug = Str::slug($request->input('title'));
            $audioFile = $request->file('audio');
            $audioName = $titleSlug . '.' . $audioFile->getClientOriginalExtension();

            $existingAudioPath = "audios/{$audioName}";
            if (Storage::disk('public')->exists($existingAudioPath)) {
                Storage::disk('public')->delete($existingAudioPath);
            }

            $path = $audioFile->storeAs('audios', $audioName, 'public');
            $song->audio = asset("/storage/{$path}");

            // Read duration from the audio file
            $getID3 = new getID3();
            $fileInfo = $getID3->analyze(Storage::disk('public')->path($path));
            $song->duration = isset($fileInfo['playtime_seconds']) ? round($fileInfo['playtime_seconds']) : 0;
        }

        $song->save();

        $artists = $request->input('artists');

        $user = Auth::user();

        if ($user->role === 'artist') {
            $artists[] = $user->id;
        }


        $song->artists()->sync($artists);
        $song->genres()->sync($request->input('genres'));

        return redirect()->route($user->role === 'admin' ? 'admin.songs.list' : 'artist.songs.list');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $song = Song::find($id);
        $song->load('artists', 'genres');
        $genres = Category::all();
        $artists = User::where('role', 'artist')->where('id', '!=', Auth::user()->id)->get();

        return Inertia::render('Admin/Songs/Edit', [
            'song' => $song,
            'genres' => $genres,
            'artists' => $artists
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $song = Song::find($id);
        $song->fill($request->all());

        if ($request->hasFile('image')) {
            if ($song->avatar) {
                Storage::disk('public')->delete($song->avatar);
            }

            // Store new avatar
            $path = $request->file('image')->store('images', 'public');
            $song->image = asset("/storage/{$path}");
        }

        if ($request->hasFile('audio')) {
            $titleSlug = Str::slug($request->input('title'));
            $audioFile = $request->file('audio');
            $audioName = $titleSlug . '.' . $audioFile->getClientOriginalExtension();

            $existingAudioPath = "audios/{$audioName}";
            if (Storage::disk('public')->exists($existingAudioPath)) {
                Storage::disk('public')->delete($existingAudioPath);
            }

            $path = $audioFile->storeAs('audios', $audioName, 'public');
            $song->audio = asset("/storage/{$path}");

            // Read duration from the audio file
            $getID3 = new getID3();
            $fileInfo = $getID3->analyze(Storage::disk('public')->path($path));
            $song->duration = isset($fileInfo['playtime_seconds']) ? round($fileInfo['playtime_seconds']) : 0;
        }

        $song->save();

        $artists = $request->input('artists');

        $user = Auth::user();

        if ($user->role === 'artist') {
            $artists[] = $user->id;
        }


        $song->artists()->sync($artists);
        $song->genres()->sync($request->input('genres'));

        return redirect()->route($user->role === 'admin' ? 'admin.songs.edit' : 'artist.songs.edit', ['id' => $id]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(string $id)
    {
        $user = Auth::user();
        $song = Song::find($id);
        $song->delete();
        return redirect()->route($user->role === 'admin' ? 'admin.songs.list' : 'artist.songs.list');
    }
}
