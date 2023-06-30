<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $controller = App::make(CategoryController::class);
        $controller->resizeExistingImages();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
