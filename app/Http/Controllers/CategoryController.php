<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use Intervention\Image\ImageManager;


class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
//        $categories=Category::all();
//        return response()->json($categories);

        $category=Category::select(
            'id',
            'name',
            'slug',
            'status',
            'images',
        )->get();
        $category = $category->map(function ($product) {
            $product->images = json_decode($product->images);
            return $product;
        });

        return CategoryResource::collection($category) ;
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
    public function store(StoreCategoryRequest $request)
    {

        $request->validated();
        try {

            $imageNames = [];

            if ($request->images) {

                foreach ($request->images as $image) {
                    if (isset($image)) {
                        $relativePath =$this->saveImage($image);
//                        dd($relativePath,"ABSOLUTE");
                        $imageNames[] = $relativePath;
                    }
                }
            }

            $productData = $request->except('images') + ['images' => json_encode($imageNames) ]; // Convert array to JSON string
            Category::create($productData);

            return response()->json([
                'message' => 'Category Created Successfully!!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something went wrong while creating a product!!'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
    private function saveImage($image): string
    {
        // Check if image is valid base64 string
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            // Take out the base64 encoded text without mime type
            $image = substr($image, strpos($image, ',') + 1);
            // Get file extension
            $type = strtolower($type[1]); // jpg, png, gif

            // Check if file is an image
            if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new \Exception('invalid image type');
            }
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if ($image === false) {
                throw new \Exception('base64_decode failed');
            }
        } else {
            throw new \Exception('did not match data URI with image data');
        }

        $dir = 'images/';
        $file = Str::random() . '.' . $type;
        $absolutePath = public_path($dir);

        $relativePath = $dir . $file;
        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }
//        file_put_contents($relativePath, $image);
        $image = Image::make($image);
        $image->resize(800, null, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });
        $image->save($absolutePath . $file, 80, 'jpg');
        return $relativePath;
    }


    public function resizeExistingImages()
    {
        $categories = Category::all();

        foreach ($categories as $category) {
            $images = json_decode($category->images, true);

            foreach ($images as $index => $imagePath) {
                $absolutePath = public_path($imagePath);

                if (File::exists($absolutePath)) {
                    $manager = new ImageManager();
                    $image = $manager->make($absolutePath);
                    $image->resize(800, 600)->save($absolutePath);
                }
            }
        }

        echo "Existing images resized successfully.";
    }


}
