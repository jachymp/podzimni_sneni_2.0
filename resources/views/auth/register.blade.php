@extends('layout/main')

@section('content')
    @foreach ($errors->all() as $error)
        <div class="error">{{ $error }}</div>
    @endforeach

    <form action="{{ route('register') }}" method="post">
        @csrf
        <label for="name">Jméno:</label>
        <input type="text" name="name" value="{{ old('name') }}">
        <label for="surname">Příjmeni:</label>
        <input type="text" name="surname" value="{{ old('surname') }}">
        <label for="email">Email:</label>
        <input type="email" name="email" value="{{ old('email') }}">
        <label for="password">Heslo:</label>
        <input type="password" name="password" value="">
        <label for="password_confirmation">Povrzení hesla:</label>
        <input type="password" name="password_confirmation" value="">

        <button>Register</button>

    </form>
@endsection
