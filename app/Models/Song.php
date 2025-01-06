<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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

    public function artists()
    {
        return $this->belongsToMany(User::class, 'song_artist', 'song_id', 'artist_id');
    }

    public function genres()
    {
        return $this->belongsToMany(Category::class, 'song_genre', 'song_id', 'genre_id');
    }
}
