@extends('layout')



@section('main_content')
<div class="main-container">
	<div class="content">
		<h1>Preferences</h1>
		<form action="">	
			<div class="pref">
				<h2>Categories</h2>
				<select name="category">
					<option value="1" selected>Gas</option>
					<option value="1">Food</option>
					<option value="1">Attractions</option>
				</select>
			</div>
			<div class="pref"><input type="text" value="Preference Name"></div>
			<div class="pref"><input type="text" value="Preference Name"></div>
			<div class="pref"><input type="text" value="Preference Name"></div>
			<div class="pref"><input type="text" value="Preference Name"></div>
		</form>
	</div>
</div>


<script id="template-menu-bar" type="text/x-handlebars-template">

</script>
@endsection