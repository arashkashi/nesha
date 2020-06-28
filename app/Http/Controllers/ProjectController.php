<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Project;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class ProjectController extends Controller
{
    /**
     * Get all User.
     *
     * @return Response
     */
    public function allProjects()
    {
       return response()->json(['projects' =>  Project::all()], 200);
   }

   public function addNewProjectWith(Request $request) {

    try {
        $this->validate($request, [
            'name' => 'required|unique:projects',
            'properties' => 'required'
        ]);

        $project = new Project;
        $project->name = $request->input('name');
        $project->properties = $request->input('properties');

        $project->save();

        return response()->json(['project' => $project, 'message' => 'Added'], 201);
    } catch (Exception $e) {

        return response()->json(['message' => 'Project creation Failed: General'], 409);
    } catch (\Illuminate\Validation\ValidationException $e) {
        // do whatever else you need todo for your use case

        return response()->json(['message' => 'Project creation Failed: validation'], 409);
    }
}
    public function deleteProject($id) {

        try {
            $toBeDeleted = Project::findOrFail($id);
            $toBeDeleted->delete();

            return response()->json(['project' => $toBeDeleted, 'message' => 'Deleted'], 201);
        }
        catch (Exception $e) {

            return response()->json(['message' => 'Project creation Failed: General'], 409);
        }
    }

    public function singleProject($id)
    {
        try {
            $project = Project::findOrFail($id);

            return response()->json(['project' => $project], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => 'Project not found!'], 404);
        }
    }

    public function updateProject(Request $request) {

        try {
        $this->validate($request, [
            'project' => 'required'
        ]);

        $project_ = $request->input('Project');
        $project_id = $project_['id'];
        $project = Project::findOrFail($project_id);
        $project->name = $project_['name'];
        $project->properties = $project_['properties'];

        $project->save();

        return response()->json(['project' => $project['id'], 'message' => 'updated'], 201);
    } catch (Exception $e) {

        return response()->json(['message' => 'Project creation Failed: General'], 409);
    }

    }
}