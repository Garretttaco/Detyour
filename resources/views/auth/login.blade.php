@extends('app')

@section('content')
<div class="container-fluid">
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			<div class="panel panel-default">
				<div class="panel-heading">Login</div>
				<div class="panel-body">
					@if (count($errors) > 0)
					<div class="alert alert-danger">
						<strong>Whoops!</strong> There were some problems with your input.<br><br>
						<ul>
							@foreach ($errors->all() as $error)
							<li>{{ $error }}</li>
							@endforeach
						</ul>
					</div>
					@endif

					<form method="POST" action="{{ url('/auth/login') }}">
						<input type="hidden" name="_token" value="{{ csrf_token() }}">

						<label>E-Mail Address</label>
						
						<input type="email" name="email" value="{{ old('email') }}">
						
						

						<label>Password</label>
						<input type="password" name="password">

						<button>Login</button>

						<a href="{{ url('/password/email') }}">Forgot Your Password?</a>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection
