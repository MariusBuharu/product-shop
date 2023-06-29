<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products=Product::select(
            'name',
            'slug',
            'status',
            'description',
            'summary',
            'price',
            'discounted_price',
            'images',
            'category_id',
            'brand_id',
            'stock'
        )->get();
        $products = $products->map(function ($product) {
            $product->images = json_decode($product->images);
            return $product;
        });

        return ProductResource::collection($products) ;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'slug' => 'required|string',
            'status' => 'required',
            'description' => 'required',
            'summary' => 'required',
            'price' => 'required|numeric',
            'discounted_price' => 'nullable|numeric',
            'images' => 'required|array',
            'images.*' => 'nullable|string', // Add validation for each image
            'category_id' => 'required|numeric',
            'brand_id' => 'nullable|exists:brands,id',
            'stock' => 'required'
        ]);

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
            $defaultDiscountedPrice = 0.0;
            $defaultBrandId = 1;
            $productData = $request->except('images') + ['images' => json_encode($imageNames),'brand_id' => $request->input('brand_id', $defaultBrandId),'discounted_price' => $request->input('discounted_price', $defaultDiscountedPrice),
                ]; // Convert array to JSON string
            Product::create($productData);

            return response()->json([
                'message' => 'Product Created Successfully!!'
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
    public function show($id)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try {

            if($product->image){
                $exists = Storage::disk('public')->exists("product/image/{$product->image}");
                if($exists){
                    Storage::disk('public')->delete("product/image/{$product->image}");
                }
            }

            $product->delete();

            return response()->json([
                'message'=>'Product Deleted Successfully!!'
            ]);

        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while deleting a product!!'
            ]);
        }
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
        file_put_contents($relativePath, $image);

        return $relativePath;
    }
}
