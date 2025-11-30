# Backend API Requirements for Full Product Image Management

To fully support updating and managing product images (specifically deleting individual secondary images), the following API endpoints or modifications are recommended:

## 1. Delete Specific Product Image

**Endpoint:** `DELETE /api/v1/products/{productId}/images/{imageName}` (or similar)

**Description:** Allows the frontend to request the deletion of a specific image from a product's gallery.

**Parameters:**
- `productId`: The ID of the product.
- `imageName` or `imageId`: The identifier of the image to delete.

**Response:**
- `200 OK` on success.

## 2. Update Product with Image Retention Strategy

Alternatively, the `PUT /api/v1/products/{id}` endpoint could accept a list of "kept" images.

**Request Body (Multipart/Form-Data):**
- `...otherFields`
- `keptSecondaryImages`: `["image1.jpg", "image3.jpg"]` (List of filenames/URLs to keep)
- `secondaryImages`: `[File, File]` (New files to add)

**Logic:**
- The backend should replace the current list of secondary images with: `keptSecondaryImages` + `newlyUploadedImages`.
- Any image currently associated with the product that is NOT in `keptSecondaryImages` should be removed (unlinked and optionally deleted from storage).

## 3. Current Implementation Status

The frontend currently:
- Displays existing images in the update form.
- Allows uploading *new* images.
- **Does not** automatically delete removed existing images because the standard `PUT` update usually just adds new files or replaces the main one. Visual removal in the UI does not trigger a backend deletion yet.
