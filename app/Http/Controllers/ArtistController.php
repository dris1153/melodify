<?php

namespace App\Http\Controllers;

use App\Models\ArtistFollower;
use App\Models\RequestToArtist;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ArtistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function detail(string $id)
    {
        $artist = User::find($id);

        if ($artist && $artist->role !== 'artist') {
            return redirect()->route('home')->with('error', 'Artist not found');
        }
        $artist->load('songs');

        $followed = ArtistFollower::where('artist_id', $artist->id)->where('follower_id', Auth::id())->first();

        return Inertia::render('ArtistDetail', [
            'artist' => $artist,
            'followed' => $followed
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function request_become(string $user_id)
    {
        //
        $request = request();
        $user = User::find($user_id);
        $artist_request =  new RequestToArtist();
        $artist_request->user_id = $user->id;
        $artist_request->description = $request->description;
        $artist_request->state = "pending";
        $artist_request->save();
    }

    public function follow(string $id)
    {
        $artist = User::find($id);
        $follower = Auth::user();

        $followed = ArtistFollower::where('artist_id', $artist->id)->where('follower_id', $follower->id)->first();

        if ($followed) {
            $artist->followers()->detach($follower->id);
        } else {
            $artist->followers()->attach($follower->id);
        }
        $artist->follower = $artist->followers()->count();

        $artist->save();

        return Redirect::route('artist.detail', ['id' => $id]);
    }
}
