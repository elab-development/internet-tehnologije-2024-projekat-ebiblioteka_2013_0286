<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookCollection;
use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        // return response()->json(Book::with('libraries')->get());
        // return new BookResource($book);
        $books = Book::with('libraries')->get();
        return new BookCollection($books);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        // $validator
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'genre' => 'required|string|max:100',
            'description' => 'required|string',
            'author_id' => 'required|exists:authors,id',
            'library_ids' => 'nullable | array',
            'library_ids.*' => 'exists:libraries, id'
        ]);

        $book = Book::create([
            'title' => $validated['title'],
            'genre' => $validated['genre'],
            'description' => $validated['description'],
            'author_id' => $validated['author_id']
        ]);

        if (!empty($validated['library_ids'])) {
            $book->libraries()->attach($validated['library_ids']);
        }

        return response()->json($book->load(['author', 'libraries']), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        //
        return response()->json($book->load('libraries'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book)
    {
        //
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'genre' => 'required|string|max:50',
            'description' => 'required|string',
            'author_id' => 'required|exists:authors,id',
            'library_ids' => 'nullable|array',
            'library_ids.*' => 'exists:libraries,id'
        ]);

        $book->update([
            'title' => $validated['title'],
            'genre' => $validated['genre'],
            'description' => $validated['description'],
            'author_id' => $validated['author_id']
        ]);

        if (isset($validated['library_ids'])) {
            $book->libraries()->sync($validated['library_ids']);
        }

        return response()->json($book->load(['author', 'libraries']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        //
        $book->delete();
        return response()->json(['message' => 'Book deleted successfully.'], 200);
    }
}
