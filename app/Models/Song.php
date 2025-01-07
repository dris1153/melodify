<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Song extends Model
{
    // Define the table associated with the model
    protected $table = 'songs';

    // Specify the fillable fields
    protected $fillable = [
        'title',
        'duration',
        'image',
        'audio',
        'love_count',
    ];

    // add data to query song info
    protected $appends = ['is_loved'];

    public function getIsLovedAttribute()
    {
        $user = Auth::user();
        if ($user) {
            return $this->lovers()->where('user_id', $user->id)->exists();
        }
        return false;
    }


    public function artists()
    {
        return $this->belongsToMany(User::class, 'song_artist', 'song_id', 'artist_id');
    }

    public function genres()
    {
        return $this->belongsToMany(Category::class, 'song_genre', 'song_id', 'genre_id');
    }

    public function lovers()
    {
        return $this->belongsToMany(User::class, 'user_song_loves', 'song_id', 'user_id');
    }
}
