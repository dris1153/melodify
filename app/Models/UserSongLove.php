<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSongLove extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'song_id',
    ];

    // Relationship with User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relationship with Song
    public function song()
    {
        return $this->belongsTo(Song::class);
    }
}
