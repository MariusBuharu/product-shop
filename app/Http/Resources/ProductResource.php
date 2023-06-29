<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $imageUrls = [];
        foreach ($this->images as $image) {
            $imageUrls[] = $image;
        }
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'image_url' => $imageUrls,
            'status' => !!$this->status,
            'description' => $this->description,
            'summary' => $this->summary,
            'price' => $this->price,
            'discounted_price' => $this->discounted_price,
            'images' => $this->images,
            'category_id' => $this->category_id,
            'brand_id' => $this->brand_id,
            'stock' => $this->stock,
//            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
//            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
