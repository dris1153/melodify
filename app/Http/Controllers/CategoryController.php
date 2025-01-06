<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function list()
    {
        $categories = Category::all();
        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Categories/Edit');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        //
        $category = Category::find($id);
        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id): RedirectResponse
    {
        $request = request();
        $category = Category::find($id);
        $request = request();

        $category->fill($request->all());

        $category->save();
        return redirect()->route('admin.categories.edit', ['id' => $id]);
    }

    public function create_handle(): RedirectResponse
    {

        $request = request();
        $category = new Category();
        $category->fill($request->all());

        $category->save();
        return redirect()->route('admin.categories.list');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete($id)
    {
        //
        $category = Category::find($id);
        $category->delete();
        return redirect()->route('admin.categories.list');
    }
}
