<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Salary;
use App\Models\Vacant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    //

    public function index()
    {

        $category = Category::all();
        $salary = Salary::all();
        $vacants = Vacant::with('category', 'salary')
            ->where('status', 'open')
            ->where('visible', true)
            ->orderBy('created_at', 'desc')
            ->paginate(10);


        return Inertia::render('Welcome', [
            'categories' => $category,
            'salaries' => $salary,
            'vacants' =>  $vacants
        ]);
    }


    public function filterVacants(Request $request)
    {
        $term = $request->term ?? '';
        // dd($request->all());

        if( $term == null && $request->category == null && $request->salary == null ) {
            // dd($request->all(), 'no hay nada');
            return redirect()->route('welcome');
        }

        // dd( $category->id, $salary->id, $term );
       $vacantsFiltered = Vacant::with('category', 'salary')
           ->where('status', 'open')
           ->where('visible', true)
           ->when($request->category, function ($query, $categoryId) {
               $query->where('category_id', $categoryId);
           })
           ->when($request->salary, function ($query, $salaryId) {
               $query->where('salary_id', $salaryId);
           })
           ->when($term, function ($query, $term) {
               $query->where('title', 'like', "%$term%");
           })
           ->orderBy('created_at', 'desc')
           ->paginate(10);


        // dd($vacantsFiltered->toArray());

        return inertia('Welcome', [
            'vacants' => $vacantsFiltered,
            'categories' => Category::all(),
            'salaries' => Salary::all(),
        ]);

    }

}
