<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArtistFollower extends Model
{
    use HasFactory;

    protected $fillable = [
        'artist_id',
        'follower_id',
    ];

    // Relationship with the Artist model
    public function artist()
    {
        return $this->belongsTo(User::class, 'artist_id');
    }

    // Relationship with the User (Follower) model
    public function follower()
    {
        return $this->belongsTo(User::class, 'follower_id');
    }
}
