<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Salary;
use App\Models\Vacant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Inertia\Inertia;

class VacantController extends Controller
{
    //

    public function __construct(){}


    public function index(){

        $vacants = Vacant::join('categories', 'vacants.category_id', '=', 'categories.id')
            ->join('salaries', 'vacants.salary_id', '=', 'salaries.id')
            ->where('user_id', auth()->user()->id)->get();
        
        return Inertia::render('Dashboard', [
            'vacants' => $vacants
        ]);
    }

    public function create(){
        
        Gate::authorize('create', Vacant::class);

        $salaries = Salary::all();
        $categories = Category::all();
        
        return Inertia::render('Vacants/CreateVacants', [
            'salaries' => $salaries,
            'categories' => $categories
        ]);
    }
    
    public function store(Request $request){
        
        Gate::authorize('create', Vacant::class);

        // validation data
        $request->validate([
            'title' => 'required',
            'company' => 'required',
            'category' => 'required',
            'salary' => 'required',
            'description' => 'required',
            'last_day' => 'required',
        ]);

        $nameImage = "";
        //  verify if exist image
        if($request->hasFile('image')){
            $image = $request->file('image');
            $nameImage = Str::uuid().'.'.$image->extension();

            $image->move(public_path('VacantsImg'), $nameImage);
        }

        // create new Vacant
        Vacant::create([
            "title" => $request->title,
            "company" => $request->company,
            "last_day" => $request->last_day,
            "description" => $request->description,
            "image" => $nameImage,
            "category_id" => $request->category,
            "salary_id" => $request->salary,
            "user_id" => auth()->user()->id
        ]);

        return back()->with("success", "Vacant create successfully!");
    }

}
