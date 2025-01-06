<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up()
    {
        // Songs Table
        Schema::create('songs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->integer('duration')->comment('Duration in seconds');
            $table->string('image')->nullable()->comment('Path to the song image');
            $table->string('audio')->comment('Path to the song audio file');
            $table->integer('love_count')->default(0)->comment('Number of people who love this song');
            $table->timestamps();
        });

        // Song Artist Pivot Table
        Schema::create('song_artist', function (Blueprint $table) {
            $table->id();
            $table->foreignId('song_id')->constrained('songs', 'id')->onDelete('cascade');
            $table->foreignId('artist_id')->constrained('users', 'id')->onDelete('cascade');
            $table->timestamps();
        });

        // Song Genre Pivot Table
        Schema::create('song_genre', function (Blueprint $table) {
            $table->id();
            $table->foreignId('song_id')->constrained('songs', 'id')->onDelete('cascade');
            $table->foreignId('genre_id')->constrained('categories', 'id')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('song_genre');
        Schema::dropIfExists('song_artist');
        Schema::dropIfExists('songs');
    }
};
