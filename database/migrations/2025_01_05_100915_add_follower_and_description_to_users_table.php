<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Add the 'follower' and 'description' columns
            $table->integer('follower')->default(0);  // You can adjust the type based on your needs
            $table->text('description')->nullable();  // To allow null descriptions
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Remove the columns if the migration is rolled back
            $table->dropColumn('follower');
            $table->dropColumn('description');
        });
    }
};
