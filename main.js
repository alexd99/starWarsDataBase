let films;
let person;
let species;
let planets;
let starShips;
let vehicles;

function runAPI() {
    //get all films
    for (let i = 1; i <= 7; i++) {
        $.get('https://swapi.co/api/films/'+i+'/', function (data, status) {
            films = data;
            $('#filmNameList').append('<option onchange="getFilm(' + i + ')" value="' + i + '">' + '#' + films.episode_id + ' ' + films.title, '</option>');
        });
    }
    //get all characters
    for (let i = 1; i <= 87; i++) {
        $.get('https://swapi.co/api/people/' + i + '/', function (data, status) {
            person = data;
            $('#characterNameList').append('<option onchange="getCharacter(' + i + ')" value="' + i + '">' + person.name + '</option>');
        });
    }
    //get all species
    for (let i = 1; i <= 37; i++) {
        $.get('https://swapi.co/api/species/'+i+'/', function (data, status) {
            species = data;
            $('#speciesList').append('<option onchange="getspecies(' + i + ')" value="' + i + '">' + species.name + '</option>');
        });
    }
    //get all planets
    for (let i = 1; i <= 61; i++) {
        $.get('https://swapi.co/api/planets/'+i+'/', function (data, status) {
            planets = data;

            if (planets.name !== 'unknown') {
                $('#planetList').append('<option onchange="getPlanet(' + i + ')" value="' + i + '">' + planets.name + '</option>');
            }
        });
    }
    //get all starShips
    for (let i = 1; i <= 37; i++) {
        $.get('https://swapi.co/api/starships/'+i+'/', function (data, status) {
            starShips = data;
            $('#starShipList').append('<option onchange="getStarShip(' + i + ')" value="' + i + '">' + starShips.name + '</option>');
        });
    }
    //get all vehicles
    for (let i = 1; i <= 39; i++) {
        $.get('https://swapi.co/api/vehicles/'+i+'/', function (data, status) {
            vehicles = data;
            $('#vehicleList').append('<option onchange="getVehicle(' + i + ')" value="' + i + '">' + vehicles.name + '</option>');
        });
    }
}

function getFilm(filmId) {

    let film;

    let filmCharacters;
    let filmCharactersArray = [];

    let filmSpecies;
    let filmSpeciesArray = [];

    let filmPlanets;
    let filmPlanetsArray = [];

    let filmStarships;
    let filmStarshipsArray = [];

    let filmVehicles;
    let filmVehiclesArray = [];

    $('.filmsSpeciesTitle').html('');
    $('.filmCharactersTitle').html('');
    $('.filmsPlanetsTitle').html('');
    $('.filmStarShipsTitle').html('');
    $('.filmVehiclesTitle').html('');

    $('.filmCharacters').html('');
    $('.filmSpecies').html('');
    $('.filmPlanets').html('');
    $('.filmStarShips').html('');
    $('.filmVehicles').html('');


    $.get('https://swapi.co/api/films/'+filmId+'/', function (data, status) {
        film = data;

        for(let i = 0; i < film.characters.length; i++){
            $.get(film.characters[i], function (data, status) {
                filmCharacters = data;
                filmCharactersArray = filmCharactersArray.concat(filmCharacters.name).sort();

                //planetPeopleSortedArray = planetPeopleArray.sort();
            });
            window.setTimeout(function () {
                $('.filmCharacters').append('<h3>'+filmCharactersArray[i]+'</h3>')
            },3000);
        }

        for(let i = 0; i < film.species.length; i++){
            $.get(film.species[i], function (data, status) {
                filmSpecies = data;
                filmSpeciesArray = filmSpeciesArray.concat(filmSpecies.name).sort();
            });
            window.setTimeout(function () {
                $('.filmSpecies').append('<h3>'+filmSpeciesArray[i]+'</h3>')
            },3000);
        }

        for(let i = 0; i < film.planets.length; i++){
            $.get(film.planets[i], function (data, status) {
                filmPlanets = data;
                filmPlanetsArray = filmPlanetsArray.concat(filmPlanets.name).sort();
            });
            window.setTimeout(function () {
                $('.filmPlanets').append('<h3>'+filmPlanetsArray[i]+'</h3>')
            },3000);
        }

        for(let i = 0; i < film.starships.length; i++){
            $.get(film.starships[i], function (data, status) {
                filmStarships = data;
                filmStarshipsArray = filmStarshipsArray.concat(filmStarships.name).sort();
            });
            window.setTimeout(function () {
                $('.filmStarShips').append('<h3>'+filmStarshipsArray[i]+'</h3>')
            },3000);
        }

        for(let i = 0; i < film.vehicles.length; i++){
            $.get(film.vehicles[i], function (data, status) {
                filmVehicles = data;
                filmVehiclesArray = filmVehiclesArray.concat(filmVehicles.name).sort();
            });
            window.setTimeout(function () {
                $('.filmVehicles').append('<h3>'+filmVehiclesArray[i]+'</h3>')
            },3000);
        }

        $('.filmTitle').html('#'+ film.episode_id+ ' ' + film.title );
        $('.filmScroll').html(film.opening_crawl);
        $('.filmReleaseDate').html('Released: ' + film.release_date);
        $('.filmDirector').html('Director: ' + film.director);
        $('.filmProducer').html('Producer(s): ' + film.producer);

        $('.filmsSpeciesTitle').html('Species');
        $('.filmCharactersTitle').html('Characters');
        $('.filmsPlanetsTitle').html('Planets');
        $('.filmStarShipsTitle').html('Star Ships');
        $('.filmVehiclesTitle').html('Vehicles');

        $('.filmCreatedTitle').html('Film Created');
        $('.filmCreated').html(film.created);
        $('.filmEditedTitle').html('Film Edited');
        $('.filmEdited').html(film.edited);
    });
}

function getCharacter(characterId){
    let character;
    let knownSpecies;
    let homeWorld;
    let films;
    let filmArray = [];
    let sortedFilmArray;
    let vehicles;
    let vehiclesArray = [];
    let sortedVehiclesArray;
    let starShips;
    let starShipsArray = [];
    let sortedStarShipsArray;

    $.get('https://swapi.co/api/people/'+characterId+'/', function (data, status) {
        character = data;

        if(character.species.length !== 0) {
            $.get(character.species, function (data, status) {
                knownSpecies = data;
                $('.species').html('Species: ' + knownSpecies.name);
            });
        }
        else{
            $('.species').html('Species: Unknown');
        }
        $.get(character.homeworld, function (data, status) {
            homeWorld = data;
            $('.home').html('Home World: '+homeWorld.name);
        });

        for(let i = 0; i < character.films.length; i++){
            $('.filmAppearances').html('');

            $.get(character.films[i], function (data, status) {
                films = data;
                filmArray.push('#'+films.episode_id + ' ' +films.title);
                sortedFilmArray = filmArray.sort();
            });

            setTimeout(function(){
                $('.filmAppearances').append('<h3>' + sortedFilmArray[i] + '</h3>');

            }, 3000);
        }

        for(let i = 0; i < character.vehicles.length; i++){
            $('.vehicles').html('');

            $.get(character.vehicles[i], function (data, status) {
                vehicles = data;
                vehiclesArray.push(vehicles.name);
                sortedVehiclesArray = vehiclesArray.sort();
            });

            setTimeout(function(){
                $('.vehicles').append('<h3>' + sortedVehiclesArray[i] + '</h3>');
            }, 3000);
        }

        for(let i = 0; i < character.starships.length; i++){
            $('.starShips').html('');

            $.get(character.starships[i], function (data, status) {
                starShips = data;
                starShipsArray.push(starShips.name);
                sortedStarShipsArray = starShipsArray.sort();
            });

            setTimeout(function(){
                $('.starShips').append('<h3>' + sortedStarShipsArray[i] + '</h3>');
            }, 3000);
        }

        $('.characterName').html(character.name);
        $('.born').html('Born: '+character.birth_year);
        $('.characterAppearance').html('Character Appearance');
        $('.gender').html('Gender: '+character.gender);
        $('.eyes').html('Eye Color: '+character.eye_color);
        $('.hair').html('Hair Color: '+character.hair_color);
        $('.skin').html('Skin Color: '+character.skin_color);
        //takes height in cm and converts to ft
        $('.height').html('Height: '+ Math.round(character.height / 30.48)+ ' ft');
        if (isNaN(character.height) === true){
            $('.height').html('Height: Unknown');
        }
        else {
            $('.height').html('Height: '+ Math.round(character.height / 30.48)+ ' ft');
        }
        //takes mass in kg and converts to lbs
        if (isNaN(character.mass) === true){
            $('.mass').html('Mass : Unknown');
        }
        else {
            $('.mass').html('Mass : '+Math.round(character.mass * 2.2046226218)+ ' lbs');
        }
        $('.createdTitle').html('Character Created');
        $('.created').html(character.created);
        $('.editedTitle').html('Character Edited');
        $('.edited').html(character.edited);

        $('.filmAppearancesTitle').html('Film Appearances');
        $('.vehiclesTitle').html('Vehicles');
        $('.starShipsTitle').html('Star Ships');

    });
}
function getSpecies(speciesId) {
    let homeWorld;
    let speciesPeople;
    let speciesPeopleArray = [];
    let speciesPeopleSortedArray = [];
    let films;
    let filmArray = [];
    let sortedFilmArray;

    $('.speciesPeople').html('');
    $('.speciesFilms').html('');

    $.get('https://swapi.co/api/species/'+speciesId+'/', function (data, status) {
        species = data;

        if (species.homeworld !== null){
            $.get(species.homeworld, function (data, status) {
                homeWorld = data;
                $('.speciesHomeWorld').html('Home World: '+homeWorld.name);
            });
        }
        else {
            $('.speciesHomeWorld').html('Home World: n/a' );
        }

        for(let i = 0; i < species.people.length; i++){
            $.get(species.people[i], function (data, status) {
                speciesPeople = data;
                speciesPeopleArray.push(speciesPeople.name);
                speciesPeopleSortedArray = speciesPeopleArray.sort();
            });
            window.setTimeout(function () {
                $('.speciesPeople').append('<h3>'+speciesPeopleSortedArray[i]+'</h3>')
            },3000);
        }
        for(let i = 0; i < species.films.length; i++){

            $.get(species.films[i], function (data, status) {
                films = data;
                filmArray.push('#'+films.episode_id + ' ' +films.title);
                sortedFilmArray = filmArray.sort();
            });

            setTimeout(function(){
                $('.speciesFilms').append('<h3>' + sortedFilmArray[i] + '</h3>');
            }, 3000);
        }

        $('.speciesName').html(species.name);
        $('.speciesClass').html('Classification: ' + species.classification);
        $('.speciesDes').html('Designation: ' + species.designation);
        $('.speciesLanguage').html('Language: ' + species.language);
        $('.speciesLife').html('Average Life Span: ' + species.average_lifespan);
        // takes average height from cm to ft
        if (isNaN(species.average_height) === true){
            $('.speciesHeight').html('Height: n/a');
        }
        else {
            $('.speciesHeight').html('Height: '+ Math.round(species.average_height / 30.48)+ ' ft');
        }
        $('.speciesEyes').html('Eye Color(s): ' + species.eye_colors);
        $('.speciesHair').html('Hair Color(s): ' + species.hair_colors);
        $('.speciesSkin').html('Skin Color(s): ' + species.skin_colors);

        $('.speciesCreatedTitle').html('Species Created');
        $('.speciesCreated').html(species.created);
        $('.speciesEditedTitle').html('Species Edited');
        $('.speciesEdited').html(species.edited);

        $('.speciePeopleTitle').html('Characters Of This Race');
        $('.specieFilmTitle').html('Films This Race is in');


    });
}

function getPlanet(planetId) {
    let planet;
    let planetPeople;
    let planetPeopleArray = [];
    let films;
    let filmArray = [];
    let sortedFilmArray;

    $('.planetPeople').html('');
    $('.planetFilms').html('');

    $.get('https://swapi.co/api/planets/'+planetId+'/', function (data, status) {
        planet = data;

        for(let i = 0; i < planet.residents.length; i++){
            $.get(planet.residents[i], function (data, status) {
                planetPeople = data;
                planetPeopleArray = planetPeopleArray.concat(planetPeople.name).sort();

                //planetPeopleSortedArray = planetPeopleArray.sort();
            });
            window.setTimeout(function () {
                $('.planetPeople').append('<h3>'+planetPeopleArray[i]+'</h3>')
            },3000);
        }

        for(let i = 0; i < planet.films.length; i++){

            $.get(planet.films[i], function (data, status) {
                films = data;
                filmArray.push('#'+films.episode_id + ' ' +films.title);
                sortedFilmArray = filmArray.sort();
            });

            setTimeout(function(){
                $('.planetFilms').append('<h3>' + sortedFilmArray[i] + '</h3>');
            }, 3000);
        }

        $('.planetName').html(planet.name);
        $('.planetClimate').html('Climate: ' + planet.climate);
        $('.planetTeriann').html('Terrain: ' + planet.terrain);
        $('.planetWater').html('Percent of Surface That is Water: ' + planet.surface_water);
        $('.planetPopulation').html('Population: ' + planet.population);
        $('.planetRotationPeriod').html('Hours in a Day: ' + planet.rotation_period);
        $('.planetOrbitalPeriod').html('Days in a Year: ' + planet.orbital_period);

        if(isNaN(Number(planet.diameter)) === true){
            $('.planetDiameter').html('Diameter: Unknown');
        }
        else {
            $('.planetDiameter').html('Diameter: ' + Number(Math.round(planet.orbital_period * 0.62137 )) + ' Miles');
        }

        $('.planetGravity').html('Gravity:  ' + planet.gravity + ' G(s)');

        $('.planetPeopleTitle').html('Characters From Here');
        $('.planetFilmTitle').html('Films This Planet is in');

        $('.planetCreatedTitle').html('Planet Created');
        $('.planetCreated').html(planet.created);
        $('.planetEditedTitle').html('Planet Edited');
        $('.planetEdited').html(planet.edited);

    });

}

function getStarShip(starShipId) {
    let starShips;

    let pilots;
    let pilotsArray = [];

    let films;
    let filmsArray = [];
    let sortedFilmArray = [];

    $('.starShipPilot').html('');
    $('.starShipFilms').html('');

    $.get('https://swapi.co/api/starships/'+starShipId+'/', function (data, status) {
        starShips = data;

        console.log(starShips);

        for(let i = 0; i < starShips.pilots.length; i++){
            $.get(starShips.pilots[i], function (data, status) {
                pilots = data;
                pilotsArray = pilotsArray.concat(pilots.name).sort();

                //planetPeopleSortedArray = planetPeopleArray.sort();
            });
            window.setTimeout(function () {
                $('.starShipPilot').append('<h3>'+pilotsArray[i]+'</h3>')
            },3000);
        }

        for(let i = 0; i < starShips.films.length; i++){

            $.get(starShips.films[i], function (data, status) {
                films = data;
                filmsArray.push('#'+films.episode_id + ' ' +films.title);
                sortedFilmArray = filmsArray.sort();
            });

            setTimeout(function(){
                $('.starShipFilms').append('<h3>' + sortedFilmArray[i] + '</h3>');
            }, 3000);
        }


        $('.starShipName').html(starShips.name);
        $('.starShipModel').html('Model: ' + starShips.model);
        $('.starShipClass').html('Class: ' + starShips.starship_class);
        $('.starShipManufacturer').html('Manufacturer(s): ' + starShips.manufacturer);
        $('.starShipHyperdriveRating').html('Hyperdrive Class: ' + starShips.hyperdrive_rating);

        if (isNaN(Number(starShips.length*3.28)) === true){
            $('.starShipLength').html('Length: Unknown');
        }
        else{
            $('.starShipLength').html('Length: ' + Math.round(Number(starShips.length * 3.28084)) + ' ft');
        }

        if(isNaN(Number(starShips.cargo_capacity * 2.20462)) === true){
            $('.starShipMaxCargoCapacity').html('Max Cargo Capacity: Unknown');
        }
        else {
            $('.starShipMaxCargoCapacity').html('Max Cargo Capacity: ' + Math.round(Number(starShips.cargo_capacity * 2.20462)) + ' lbs');
        }


        if(starShips.consumables === 'none' || starShips.consumables === '0'){
            $('.starShipConsumables').html('Vehicle Doesn\'t Hold Supplies');
        }
        else {
            $('.starShipConsumables').html('Supplies Will Last: ' + starShips.consumables);
        }
        $('.starShipCrew').html('Number of Crew: ' + starShips.crew);
        $('.starShipPassengers').html('Maximum Passengers : ' + starShips.passengers);
        $('.starShipMaxAtmospheringSpeed').html('Maximum Speed in Atmosphere: ' + starShips.max_atmosphering_speed);
        $('.starShipMGLT').html('Maximum Number of Megalights Per Hour: ' + starShips.MGLT);

        if(starShips.cost_in_credits === 'unknown'){
            $('.starCostInCredits').html('Cost: ' + starShips.cost_in_credits);
            $('.starCostInUSD').html('Cost: ' + starShips.cost_in_credits);
        }
        else {
            $('.starCostInCredits').html('Cost: ' + starShips.cost_in_credits + ' Credits');
            $('.starCostInUSD').html('Cost: ' + starShips.cost_in_credits * 1.50 + ' USD*');
        }

        $('.starShipCreatedTitle').html('Star Ship Created');
        $('.starShipCreated').html(starShips.created);
        $('.starShipEditedTitle').html('Star Ship Edited');
        $('.starShipEdited').html(starShips.edited);

        $('.starShipPilotTitle').html('Pilots');
        $('.starShipFilmTitle').html('Films This Star Ship is in');


    });
}

function getVehicle(vehiclesId) {
    let vehicle;

    let pilots;
    let pilotsArray = [];

    let films;
    let filmsArray = [];
    let sortedFilmArray = [];

    $('.vehiclePilot').html('');
    $('.vehicleFilms').html('');

    $.get('https://swapi.co/api/vehicles/'+vehiclesId+'/', function (data, status) {
        vehicle = data;
        console.log(vehicle);

        for(let i = 0; i < vehicle.pilots.length; i++){
            $.get(vehicle.pilots[i], function (data, status) {
                pilots = data;
                pilotsArray = pilotsArray.concat(pilots.name).sort();

                //planetPeopleSortedArray = planetPeopleArray.sort();
            });
            window.setTimeout(function () {
                $('.vehiclePilot').append('<h3>'+pilotsArray[i]+'</h3>')
            },3000);
        }

        for(let i = 0; i < vehicle.films.length; i++){

            $.get(vehicle.films[i], function (data, status) {
                films = data;
                filmsArray.push('#'+films.episode_id + ' ' +films.title);
                sortedFilmArray = filmsArray.sort();
            });

            setTimeout(function(){
                $('.vehicleFilms').append('<h3>' + sortedFilmArray[i] + '</h3>');
            }, 3000);
        }

        $('.vehicleName').html(vehicle.name);
        $('.vehicleModel').html('Model: ' + vehicle.model);
        $('.vehicleClass').html('Class: ' + vehicle.vehicle_class);
        $('.vehicleManufacturer').html('Manufacturer(s): ' + vehicle.manufacturer);

        if (isNaN(Number(vehicle.length*3.28)) === true){
            $('.vehicleLength').html('Length: Unknown');
        }
        else{
            $('.vehicleLength').html('Length: ' + Math.round(Number(vehicle.length * 3.28084)) + ' ft');
        }

        if(isNaN(Number(vehicle.cargo_capacity * 2.20462)) === true){
            $('.vehicleMaxCargoCapacity').html('Max Cargo Capacity: Unknown');
        }
        else {
            $('.vehicleMaxCargoCapacity').html('Max Cargo Capacity: ' + Math.round(Number(vehicle.cargo_capacity * 2.20462)) + ' lbs');
        }

        if(vehicle.consumables === 'none' || vehicle.consumables === '0'){
            $('.vehicleConsumables').html('Vehicle Doesn\'t Hold Supplies');
        }
        else {
            $('.vehicleConsumables').html('Supplies Will Last: ' + vehicle.consumables);
        }
        $('.vehicleCrew').html('Number of Crew: ' + vehicle.crew);
        $('.vehiclePassengers').html('Maximum Passengers : ' + vehicle.passengers);
        $('.vehicleMaxAtmospheringSpeed').html('Maximum Speed in Atmosphere: ' + vehicle.max_atmosphering_speed);

        if(vehicle.cost_in_credits === 'unknown'){
            $('.vehicleCostInCredits').html('Cost: ' + vehicle.cost_in_credits);
            $('.vehicleCostInUSD').html('Cost: ' + vehicle.cost_in_credits);
        }
        else {
            $('.vehicleCostInCredits').html('Cost: ' + vehicle.cost_in_credits + ' Credits');
            $('.vehicleCostInUSD').html('Cost: ' + vehicle.cost_in_credits * 1.50 + ' USD*');
        }

        $('.vehiclePilotTitle').html('Pilots');
        $('.vehicleFilmTitle').html('Films This Vehicle is in');

        $('.vehicleCreatedTitle').html('Vehicle Created');
        $('.vehicleCreated').html(vehicle.created);
        $('.vehicleEditedTitle').html('Vehicle Edited');
        $('.vehicleEdited').html(vehicle.edited);
    });
}