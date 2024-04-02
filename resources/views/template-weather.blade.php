{{-- 
  Template Name: Previsão do Tempo 
--}}

{{-- resources/views/template-weather.blade.php --}}
@extends('layouts.app')


@section('content')

<script src="https://kit.fontawesome.com/3875134aee.js" crossorigin="anonymous"></script>

<div class="min-h-screen bg-gray-200 flex items-center justify-center px-4">
  <div class="relative bg-gradient-to-r from-cyan-500 to-blue-500 p-5 rounded-xl shadow-2xl w-full max-w-4xl text-white">
    
    {{-- Data e Hora --}}
    <div id="current-datetime" class="absolute top-0 left-0 p-4 bg-blue-900 bg-opacity-60 rounded-br-xl rounded-tl-xl font-bold text-sm md:text-base lg:text-lg">
      <!-- O horário será atualizado pelo JavaScript -->
    </div>

    {{-- Campo de Entrada da Cidade --}}
    <div class="absolute top-0 right-0 p-4 bg-blue-900 bg-opacity-60 rounded-bl-xl rounded-tr-xl">
      <div class="growing-search">
        <div class="input">
          <input type="text" id="city-input" name="search" placeholder="Digite o nome da cidade"
          class="bg-transparent text-white placeholder-white w-full transition-all duration-150 ease-in-out border-none font-size-inherit padding-5px width-55px color-white border-bottom-2px-solid-white focus:width-150px" />
        </div>
        <div class="submit">
          <button type="button" class="text-white focus:outline-none">
            <span class="fa fa-search"></span>
          </button>
        </div>
      </div>
      <div id="autocomplete-results" class="bg-blue-900 opacity-60 mt-1 overflow-hidden rounded text-white"></div>
    </div>
    
    {{-- Informações Atuais do Tempo --}}
    <div id="current-weather" class="text-center mb-8 pt-16">
      <p id="location" class="text-2xl font-semibold">Carregando...</p>
      <div id="description" class="flex justify-center items-center mt-2">
        <i id="weather-icon" class="fas text-4xl"></i>
        <span class="text-lg ml-2">Carregando...</span>
      </div>
      <h1 id="temp" class="text-9xl font-bold my-4">...</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div><i class="fas fa-tint mr-2"></i> <span id="humidity">Umidade: ...</span></div>
        <div><i class="fas fa-wind mr-2"></i> <span id="wind">Vento: ...</span></div>
        <div><i class="fas fa-tachometer-alt mr-2"></i> <span id="pressure">Pressão: ...</span></div>
      </div>
    </div>

    {{-- Previsão Futura --}}
    <div id="forecast" class="forecast grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <!-- Previsões serão carregadas aqui pelo JavaScript -->
    </div>

  </div>
</div>

@endsection