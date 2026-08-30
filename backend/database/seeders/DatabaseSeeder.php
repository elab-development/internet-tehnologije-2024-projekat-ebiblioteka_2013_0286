<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\Book;
use App\Models\Library;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        Schema::disableForeignKeyConstraints();
        DB::table('book_library')->truncate();
        Book::truncate();
        Author::truncate();
        Library::truncate();

        User::factory()->create([
            'username' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $author1 = Author::create([
            'name' => 'Lav Tolstoy',
            'country' => 'Russia'
        ]);

        $author2 = Author::create([
            'name' => 'Milos Crnjanski',
            'country' => 'Srbija'
        ]);

        $book1 = Book::create([
            'title' => 'Ana Karenjina',
            'description' => 'Opis Ane Karenjine',
            'genre' => 'roman',
            'author_id' => $author1->id
        ]);
        $book2 = Book::create([
            'title' => 'Seobe',
            'description' => 'Opis seoba',
            'genre' => 'tragedija',
            'author_id' => $author2->id
        ]);

        $bookIds = [$book1->id, $book2->id];


        Library::factory()->count(3)->create()
            ->each(function ($library) use ($bookIds) {
                shuffle($bookIds);
                $random = rand(0, 2);
                $booksToAttach = array_slice($bookIds, 0, $random);
                if (!empty($booksToAttach)) {
                    $library->books()->attach($booksToAttach);
                }
            });
    }
}
