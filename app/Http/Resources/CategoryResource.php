<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $imageUrls = [];
        $images = $this->images;
        if (!is_null($images)) {
            foreach ($images as $image) {
                $imageUrls[] = $image;
            }
        }
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'image_url' => $imageUrls,
            'images' => $this->images,
            'status' => !!$this->status,
        ];
    }
}
