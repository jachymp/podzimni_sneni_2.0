@extends('layout/main')

@section('content')
  <nav class="navbar">
      <div class="logo-name">
          <img src="img/PS_2022_motivy-13.svg" alt="sneni">
          <h1 class="brand-title">{{$description->grade}}. PODZIMNÍ SNĚNÍ</h1>
      </div>
      <a href="#" class="toggle-button">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
      </a>
      <div class="navbar-links">
          <ul>
              <li><a href="#intro">O festivalu</a></li>
              <li><a href="#bands-section">Kapely</a></li>
              <li><a href="#lineup-section">Program</a></li>
          </ul>
      </div>

  </nav>

  <script>
      const toggleButton = document.getElementsByClassName('toggle-button')[0];
      const navBarLinks = document.getElementsByClassName('navbar-links')[0];

      toggleButton.addEventListener('click', () => {
          navBarLinks.classList.toggle('active')
      })
  </script>

       <div id="intro" class="intro-desc">
           <div class="forest"></div>
           <p>{{$description->fest_description}}</p>
           <p>{{date('d. m. Y', strtotime($description->from))}} - {{date('d. m. Y', strtotime($description->to))}}</p>
       </div>

        <div class="book-buttons">
            @if ($description->ticket_link)
            <button><a href={{$description->ticket_link}} target="_blank">kup si lístek</a></button>
            @endif
            @if ($description->accomodation_link)
            <button><a href={{$description->accomodation_link}} target="_blank">zarezervuj si chatku</a></button>
            @endif
        </div>

        <img class="free-pic" src="img/PS_2022_motivy-06.svg" alt="vlnka">

        <h2>ceník</h2>
       <div class="pricelist">
           <div class="fr">Pátek</div>
           <div class="st">Sobota</div>
           <div class="all">Celý</div>
           <div class="student">Student</div>
           <div class="student-fr">{{$description->fest_price_friday_student}} Kč</div>
           <div class="student-st">{{$description->fest_price_saturday_student}} Kč</div>
           <div class="student-all">{{$description->fest_price_all_student}} Kč</div>
           <div class="normal">Bez slevy</div>
           <div class="normal-fr">{{$description->fest_price_friday}} Kč</div>
           <div class="normal-st">{{$description->fest_price_saturday}} Kč</div>
           <div class="normal-all">{{$description->fest_price_all}} Kč</div>
       </div>

        <img class="free-pic" id="bands-section" src="img/PS_2022_motivy-07.svg" alt="vlnka">


{{-- KAPELY --}}
    <div>
        <h2>kapely</h2>
        <div class="band-card-container">
        @foreach($bands as $index => $band)
            <div id="band-card" class="band-card--heading" onclick=setClass({{$index}})>
                <h4>{{$band->name}}</h4>
                <p>{{$band->description}}</p>
                <div class="band-card--icons">
                    <div class="band-card--icon">
                        <img src="img/calendar.png">
                        <p>{{$band->day}}</p>
                    </div>
                    <div class="band-card--icon">
                        <img src="img/clock.png">
                        <p>{{$band->time_from}}</p>
                    </div>
                    <div class="band-card--icon">
                        <img src="img/pin.png">
                        <p>{{$band->place->name}}</p>
                    </div>
                </div>

                @if($band->link)
                <button><a href={{$band->link}} target="_blank">Poslechni si</a></button>
                @endif
            </div>
            @endforeach
        </div>
    </div>

    <script>
        const setClass = (index) => {
            const band = document.querySelectorAll('#band-card');
            if(band[index].classList.contains('band-card--heading')) {
                band[index].classList.remove('band-card--heading');
                band[index].classList.add('band-card--content');
            } else if (band[index].classList.contains('band-card--content')){
                band[index].classList.remove('band-card--content');
                band[index].classList.add('band-card--heading');
            }
        }
    </script>

{{-- LINEUP --}}
     <div id="lineup-section">
         <h2>line up</h2>
         <div class="lineup-container">
             <img class="lines-pic" src="img/PS_2022_motivy-10.svg">
             <div class="lineup-friday">
                 <h3>pátek</h3>
                     <h4>jídelna</h4>
                     @foreach($lineupF as $lineup)
                         @if($lineup->place->name == 'Jídelna')
                         <div class="place-item">
                             <p>{{substr($lineup->time_from, 0, -3)}}</p>
                             <p>{{substr($lineup->time_to, 0, -3)}}</p>
                             <p>{{$lineup->name}}</p>
                         </div>
                         @endif
                     @endforeach
                     <h4>sedmík</h4>
                     @foreach($lineupF as $lineup)
                         @if($lineup->place->name == 'Sedmík')
                         <div class="place-item">
                             <p>{{substr($lineup->time_from, 0, -3)}}</p>
                             <p>{{substr($lineup->time_to, 0, -3)}}</p>
                             <p>{{$lineup->name}}</p>
                         </div>
                         @endif
                     @endforeach
                     <h4>modul</h4>
                     @foreach($lineupF as $lineup)
                         @if($lineup->place->name == 'Modul')
                         <div class="place-item">
                             <p>{{substr($lineup->time_from, 0, -3)}}</p>
                             <p>{{substr($lineup->time_to, 0, -3)}}</p>
                             <p>{{$lineup->name}}</p>
                         </div>
                         @endif
                     @endforeach
             </div>
             <div class="lineup-saturday">
                 <h3>sobota</h3>
                 <h4>jídelna</h4>
                     @foreach($lineupS as $lineup)
                         @if($lineup->place->name == 'Jídelna')
                             <div class="place-item">
                                 <p>{{substr($lineup->time_from, 0, -3)}}</p>
                                 <p>{{substr($lineup->time_to, 0, -3)}}</p>
                                 <p>{{$lineup->name}}</p>
                             </div>
                         @endif
                     @endforeach
                     <h4>sedmík</h4>
                     @foreach($lineupS as $lineup)
                         @if($lineup->place->name == 'Sedmík')
                         <div class="place-item">
                             <p>{{substr($lineup->time_from, 0, -3)}}</p>
                             <p>{{substr($lineup->time_to, 0, -3)}}</p>
                             <p>{{$lineup->name}}</p>
                         </div>
                         @endif
                     @endforeach
                     <h4>modul</h4>
                     @foreach($lineupS as $lineup)
                         @if($lineup->place->name == 'Modul')
                         <div class="place-item">
                             <p>{{substr($lineup->time_from, 0, -3)}}</p>
                             <p>{{substr($lineup->time_to, 0, -3)}}</p>
                             <p>{{$lineup->name}}</p>
                         </div>
                         @endif
                     @endforeach
             </div>
             <img class="lines-pic" src="img/PS_2022_motivy-11.svg">
         </div>
     </div>
  <div class="star-pic">
      <img src="img/PS_2022_motivy-04.svg">
      <img src="img/PS_2022_motivy-04.svg">
      <img src="img/PS_2022_motivy-04.svg">
  </div>

  <h2>doprovodný program</h2>
  <div class="support">
      <img class="lines-pic" src="img/PS_2022_motivy-09.svg">
      <div class="support-saturday">
          <h3>sobota</h3>
          @foreach($supportSat as $supSat)
              <div class="place-item">
                  <p>{{substr($lineup->time_from, 0, -3)}}</p>
                  <p>{{substr($lineup->time_to, 0, -3)}}</p>
                  <p>{{$supSat->name}}</p>
              </div>
          @endforeach
      </div>
      <div class="support-sunday">
          <h3>neděle</h3>
          @foreach($supportSun as $supSun)
              <div class="place-item">
                  <p>{{substr($lineup->time_from, 0, -3)}}</p>
                  <p>{{substr($lineup->time_to, 0, -3)}}</p>
                  <p>{{$supSun->name}}</p>
              </div>
          @endforeach
      </div>
      <img class="lines-pic" src="img/PS_2022_motivy-09.svg">
  </div>

<footer>
    <p>Vytvořeno s <span>&#10084;</span> pro všechny ještěry!</p>
    <div class="footer">
        <div class="footer-images">
            <a href="https://open.spotify.com/playlist/1p5EYccYTMFU9yVJuiAX88?si=EfFq1efeQuKWsdbOtQDxlw" target="_blank">
                <img alt="spotify" src="img/spotify.png">
            </a>
            <a href="https://www.facebook.com/podzimnisneni" target="_blank">
                <img src="img/facebook.png">
            </a>
            <a href="https://www.instagram.com/podzimni_sneni/" target="_blank">
                <img src="img/instagram.png">
            </a>
        </div>
    </div>
    <div class="address">
        <div><a href="https://goo.gl/maps/43P28q6Y7xS6JzFc8" target="_blank">Tábor Jana Ámose Komenského</a></div>
        <div>Běleč nad Orlicí 121</div>
        <div>Běleč nad Orlicí 503 46</div>
    </div>

</footer>

@endsection









