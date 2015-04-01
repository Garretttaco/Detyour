@extends('layout')



@section('main_content')
<div class="main-container">
	<div class="content">
		<h1>Preferences</h1>
		<div>
			{{-- display preferences per a specific category  --}}
			<select name="category" class="category-all">
				<option value="" selected='selected' disabled>Choose Category</option>
				@foreach($categories->getArray() as $cat)
				<option value="{{$cat->category_id}}">{{$cat->category_name}}</option>
				@endforeach
			</select>
		</div>
		<div class="pref-container">
			{{-- update current preferences --}}
			<div class="edit-pref">
				{{-- add new preference --}}
				<form action="">
					<input type="hidden" name="_token" value="{{ csrf_token() }}">
					<h2>Add Preference</h2>
					<input class="add-pref-data" type="text" name="preference">
					<button class="add-pref">Add</button>
				</form>
			</div>
			<h2 class="edit-pref">Edit Preferences</h2>	
			<form action="/yes" method="POST">	
				<input type="hidden" name="_token" value="{{ csrf_token() }}">
				<aside class="pref-append">
				</aside>
				<button class="edit-pref">Save Preferences</button>
			</form>
		</div>
	</div>
</div>

@endsection