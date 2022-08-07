<form action="{{ route('login') }}" method="post">
    @csrf

    <input type="email" name="email" value="{{ old('email') }}">

    <input type="password" name="password" value="">

    <button>Login</button>

</form>

@if (!Auth::check())
    <p>Nemáš ještě účet? Tak si ho <a href="/register">vytvoř</a>.</p>
@endif
