<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestToArtist extends Model
{
    use HasFactory;

    protected $table = 'request_to_artist';

    protected $fillable = ['user_id', 'description', 'state'];

    // Define the relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
