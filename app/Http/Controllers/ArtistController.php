<?php

namespace App\Http\Controllers;

use App\Models\RequestToArtist;
use App\Models\User;
use Illuminate\Http\Request;

class ArtistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
}
