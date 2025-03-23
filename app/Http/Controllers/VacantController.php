<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Salary;
use App\Models\Vacant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Models\UserVacant;

class VacantController extends Controller
{
    //

    public function __construct(){}


    public function index()
    {
        $vacants = Vacant::where('user_id', auth()->user()->id)
            ->join('categories', 'vacants.category_id', '=', 'categories.id')
            ->join('salaries', 'vacants.salary_id', '=', 'salaries.id')
            ->select('vacants.*', 'categories.category as category_name', 'salaries.salary as salary_pay')
            ->get();

        return Inertia::render('Dashboard', compact('vacants'));
    }

    public function create(){
        
        Gate::authorize('viewAny', Vacant::class);

        $salaries = Salary::all();
        $categories = Category::all();
        
        return Inertia::render('Vacants/CreateVacants', [
            'salaries' => $salaries,
            'categories' => $categories
        ]);
    }
    
    public function store(Request $request)
    {
        
        Gate::authorize('viewAny', Vacant::class);

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

        return back()->with("success", "La vacante ha sido creada correctamente!");
    }

    public function show(Vacant $vacant)
    {

        $categories = Category::all();
        $salaries = Salary::all();

        return Inertia::render('Vacants/ShowVacant', [
            'vacant' => $vacant,
            'categories' => $categories,
            'salaries' => $salaries
        ]);
    }

    public function update(Request $request, Vacant $vacant)
    {

        Gate::authorize('viewAny', $vacant);

        if(auth()->user()->id !== $vacant->user_id){
            return back()->with("error", "You don't have permission to update this Vacant!");
        }

        // dd($request->visible);
        $vacant->update([
            "title" => $request->title,
            "company" => $request->company,
            "last_day" => $request->last_day,
            "description" => $request->description,
            "category_id" => $request->category,
            "salary_id" => $request->salary,
            "visible" => $request->visible
        ]);

        return redirect()->back()->with("success", "La vacante ha sido actualizada correctamente!");
    }

    public function search()
    {
        Gate::authorize("viewCandidates", Vacant::class);

        $vacants = Vacant::where("visible", 1)
            ->where("status", "open")
            ->join('categories', 'vacants.category_id', '=', 'categories.id')
            ->join('salaries', 'vacants.salary_id', '=', 'salaries.id')
            ->select('vacants.*', 'categories.category as category_name', 'salaries.salary as salary_pay')
            ->get();

        return Inertia::render('Vacants/SearchedVacants', [
            "vacants" => $vacants
        ]);

    }

    public function postulateShow(Vacant $vacant) 
    {
        $vacant = $vacant->join('categories', 'vacants.category_id', '=', 'categories.id')
            ->join('salaries', 'vacants.salary_id', '=', 'salaries.id')
            ->select('vacants.*', 'categories.category as category_name', 'salaries.salary as salary_pay')
            ->first();

        return Inertia::render('Vacants/PostulateVacant', [
            "vacant" => $vacant
        ]);
    }

    public function apply(Request $request, Vacant $vacant)
    {

        // dd($request->file("cv"));

        Gate::authorize('viewCandidates', $vacant);

        $request->validate([
            "cv" => "required"
        ]);

        // save cv in to public path
        $cv = $request->file("cv");
        $cvName = Str::uuid().'.'.$cv->extension();
        $cv->move(public_path('Cvs'), $cvName);

        UserVacant::create([
            "vacant_id" => $vacant->id,
            "user_id" => auth()->user()->id,
            "cv" => $request->cv
        ]);


        $postulates = UserVacant::where("user_id", auth()->user()->id)->get();

        return Inertia::render('Vacants/postulates', [
            "postulates" => $postulates
        ]);

    }

    public function destroy(Vacant $vacant)
    {
        
        if(auth()->user()->id !== $vacant->user_id){
            return back()->with("error", "You don't have permission to delete this Vacant!");
        }

        $vacant->delete();
        return back()->with("success", "La vacante ha sido eliminada correctamente!");
    }
}
