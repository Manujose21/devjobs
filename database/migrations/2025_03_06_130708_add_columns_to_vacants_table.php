<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('vacants', function (Blueprint $table) {
            $table->string("title");
            $table->string("company");
            $table->date("last_day");
            $table->text("description");
            $table->string("image", 50)->nullable();
            $table->foreignId("category_id")->constrained()->onDelete("cascade");
            $table->foreignId("salary_id")->constrained()->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vacants', function (Blueprint $table) {
            $table->dropColumn([   
                "title", 
                "company", 
                "last_day",
                "description", 
                "image", 
                "category_id", 
                "salary_id"
            ]);
        });
    }
};
