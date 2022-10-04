@extends('layout/main')

@section('content')

  UVOD
    <div id="intro">
       <div class="intro-header">
           <div class="intro-header--left">
               <img src="img/PS_2022_motivy-13.svg" alt="sneni">
               <h1>Podzimní snění {{$description->grade}}</h1>
           </div>
           <div intro-header--mobile>
               <input type="checkbox" id="checkbox_toogle"/>
               <label for="checkbox_toogle" class="hamburger">&#9776;</label>
           </div>
          <div class="intro-header--right">
              <div><a href="#intro">O festivalu</a></div>
              <div><a href="#bands-section">Kapely</a></div>
              <div><a href="#lineup-section">Line up</a></div>
          </div>
       </div>
    </div>


       <div class="intro-desc">
           <div class="forest"></div>
           <p>{{$description->fest_description}}</p>
           <p>{{date('d. m. Y', strtotime($description->from))}} - {{date('d. m. Y', strtotime($description->to))}}</p>
       </div>

        <img class="free-pic" src="img/PS_2022_motivy-06.svg" alt="vlnka">

       <div class="pricelist">
           <div class="fr">Pátek</div>
           <div class="st">Sobota</div>
           <div class="all">Celý</div>
           <div class="student">Student</div>
           <div class="student-fr">{{$description->fest_price_friday_student}}</div>
           <div class="student-st">{{$description->fest_price_saturday_student}}</div>
           <div class="student-all">{{$description->fest_price_all_student}}</div>
           <div class="normal">Bez slevy</div>
           <div class="normal-fr">{{$description->fest_price_friday}}</div>
           <div class="normal-st">{{$description->fest_price_saturday}}</div>
           <div class="normal-all">{{$description->fest_price_all}}</div>
       </div>

    <img id="bands-section" class="free-pic" src="img/PS_2022_motivy-07.svg" alt="vlnka">


{{-- KAPELY --}}
    <div>
        <h2>Kapely</h2>
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
         <h2>Line up</h2>
         <div class="lineup-container">
             <img class="lines-pic" src="img/PS_2022_motivy-10.svg">
             <div class="lineup-friday">
                 <h3>Pátek</h3>
                     <h4>Jídelna</h4>
                     @foreach($lineupF as $lineup)
                         @if($lineup->place->name == 'Jídelna')
                         <div class="place-item">
                             <p>{{$lineup->time_from}}</p>
                             <p>{{$lineup->time_to}}</p>
                             <p>{{$lineup->name}}</p>
                         </div>
                         @endif
                     @endforeach
                     <h4>Sedmík</h4>
                     @foreach($lineupF as $lineup)
                         @if($lineup->place->name == 'Sedmík')
                         <div class="place-item">
                             <p>{{$lineup->time_from}}</p>
                             <p>{{$lineup->time_to}}</p>
                             <p>{{$lineup->name}}</p>
                         </div>
                         @endif
                     @endforeach
                     <h4>Modul</h4>
                     @foreach($lineupF as $lineup)
                         @if($lineup->place->name == 'Modul')
                         <div class="place-item">
                             <p>{{$lineup->time_from}}</p>
                             <p>{{$lineup->time_to}}</p>
                             <p>{{$lineup->name}}</p>
                         </div>
                         @endif
                     @endforeach
             </div>
             <div class="lineup-saturday">
                 <h3>Sobota</h3>
                 <h4>Jídelna</h4>
                     @foreach($lineupS as $lineup)
                         @if($lineup->place->name == 'Jídelna')
                             <div class="place-item">
                                 <p>{{$lineup->time_from}}</p>
                                 <p>{{$lineup->time_to}}</p>
                                 <p>{{$lineup->name}}</p>
                             </div>
                         @endif
                     @endforeach
                     <h4>Sedmík</h4>
                     @foreach($lineupS as $lineup)
                         @if($lineup->place->name == 'Sedmík')
                         <div class="place-item">
                             <p>{{$lineup->time_from}}</p>
                             <p>{{$lineup->time_to}}</p>
                             <p>{{$lineup->name}}</p>
                         </div>
                         @endif
                     @endforeach
                     <h4>Modul</h4>
                     @foreach($lineupS as $lineup)
                         @if($lineup->place->name == 'Modul')
                         <div class="place-item">
                             <p>{{$lineup->time_from}}</p>
                             <p>{{$lineup->time_to}}</p>
                             <p>{{$lineup->name}}</p>
                         </div>
                         @endif
                     @endforeach
             </div>
             <img class="lines-pic" src="img/PS_2022_motivy-11.svg">
         </div>
     </div>
    <img class="star-pic" src="img/PS_2022_motivy-04.svg">
    <img class="star-pic" src="img/PS_2022_motivy-04.svg">
    <img class="star-pic" src="img/PS_2022_motivy-04.svg">
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
        </div>
    </div>
    <div class="address">
        <div><a href="https://goo.gl/maps/43P28q6Y7xS6JzFc8" target="_blank">Tábor Jana Ámose Komenského</a></div>
        <div>Běleč nad Orlicí 121</div>
        <div>Běleč nad Orlicí 503 46</div>
    </div>

</footer>

@endsection









