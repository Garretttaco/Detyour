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
					<h2>Add Preference</h2>
					<input type="text" name="preference">
					<button>Add</button>
				</form>
			</div>
			<h2 class="edit-pref">Edit Preferences</h2>	
			<form action="">	
				<aside class="pref-append">
				</aside>
				<button class="edit-pref">Save Preferences</button>
			</form>
		</div>
	</div>
</div>

@endsection