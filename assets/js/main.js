function getARandomPokemon() {
    let pokemon = {
        nombre: "",
        numero: 0,
        img: ""


    };
    let number = Math.floor((Math.random() * 721)) + 1;
    let url = "https://pokeapi.co/api/v2/pokemon/" + number + "/";
    var jqxhr = $.ajax(url)
        .done(function(result) {
            pokemon.nombre = result.name;
            pokemon.numero = number;
            pokemon.img = result.sprites.other.dream_world.front_default ? result.sprites.other.dream_world.front_default : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + number + ".png";
            $('#pokemon img').attr('src', pokemon.img);
            $('#name').html(pokemon.nombre);
            $('#load').hide();
            $('#pokemon').show();
            $('#guessinput').show();
            $('#guess').show();

            console.log(result);
        })
        .fail(function() {
            alert("error");
        })
        .always(function() {});
}

function findAPokemon(id) {
    let pokemon = {
        nombre: "",
        numero: 0,
        img: "",
        peso: "",
        altura: "",
        sexo: 0,
        tipo: [],
        categoria: [],
        habilidad: []
    };
    let url = "https://pokeapi.co/api/v2/pokemon/" + id + "/";
    var jqxhr = $.ajax(url)
        .done(function(result) {
            console.log(result);
            $('#habilidad').empty();
            $('#categoria').empty();
            $('#tipo').empty();
            $('#name_pkdx').empty();
            pokemon.nombre = result.name;
            pokemon.numero = result.id;
            pokemon.img = result.sprites.other.dream_world.front_default ? result.sprites.other.dream_world.front_default : result.sprites.front_default ? result.sprites.front_default : 'assets/img/gotas.gif';
            pokemon.peso = (result.weight / 10) + "Kg";
            pokemon.altura = (result.height / 10) + "m";
            result.abilities.forEach(el => {
                pokemon.habilidad.push(el.ability.name);
            })
            result.held_items.forEach(el => {
                pokemon.categoria.push(el.item.name);
            })
            result.types.forEach(el => {
                pokemon.tipo.push(el.type.name);
            })
            if (pokemon.img === 'assets/img/gotas.gif') {
                $('#title_name').html('Ups! no tenemos imagen de este pokemon!');
            } else {
                $('#title_name').empty();
            }
            $('#finded_pokemon').attr('src', pokemon.img);
            $('#finded_pokemon').css('filter', 'drop-shadow(8px -14px 9px black)');
            $('#name_pkdx').html(pokemon.nombre);
            $('#weight').html(pokemon.peso);
            $('#height').html(pokemon.altura);
            pokemon.habilidad.forEach(el => {
                $('#habilidad').append('<span>' + el + '</span><br>');
            });
            pokemon.categoria.forEach(el => {
                $('#categoria').append('<span>' + el + '</span><br>');
            });
            pokemon.tipo.forEach(el => {
                $('#tipo').append('<span>' + el + '</span><br>');
            });
            let stats = [];
            result.stats.forEach(element => {
                stats.push({
                    label: element.stat.name,
                    y: element.base_stat
                });
            });
            var chart = new CanvasJS.Chart("stats", {
                theme: "light2", // "light1", "light2", "dark1"
                animationEnabled: true,
                exportEnabled: true,
                title: {
                    text: "Estadisticas"
                },
                axisX: {
                    margin: 10,
                    labelPlacement: "inside",
                    tickPlacement: "inside"
                },
                axisY2: {
                    title: "point",
                    titleFontSize: 14,
                    includeZero: true
                },
                data: [{
                    type: "bar",
                    axisYType: "secondary",
                    indexLabel: "{y}",
                    dataPoints: stats
                }]
            });
            $('#load_pkdex').hide();
            $('#pkdx').show();
            chart.render();

        })
        .fail(function() {
            $('#habilidad').empty();
            $('#categoria').empty();
            $('#tipo').empty();
            $('#name_pkdx').empty();
            $('#weight').empty();
            $('#height').empty();
            $('#finded_pokemon').attr('src', 'assets/img/___.gif');
            $('#finded_pokemon').css('filter', 'none');
            $('#title_name').html('Uy!, no encontramos tu Pokemon. Busca nuevamente.')
            $('#load_pkdex').hide();
            $('#pkdx').show();
            var chart = new CanvasJS.Chart("stats", {
                theme: "light2", // "light1", "light2", "dark1"
                animationEnabled: true,
                exportEnabled: true,
                title: {
                    text: "Estadisticas"
                },
                axisX: {
                    margin: 10,
                    labelPlacement: "inside",
                    tickPlacement: "inside"
                },
                axisY2: {
                    title: "point",
                    titleFontSize: 14,
                    includeZero: true
                },
                data: [{
                    type: "bar",
                    axisYType: "secondary",
                    indexLabel: "{y}",
                    dataPoints: []
                }]
            });
            $('#load_pkdex').hide();
            $('#pkdx').show();
            chart.render();
        })
        .always(function() {});
}

function guess() {
    $('#guess').on('click', () => {
        $('#pokemon img').css('filter', 'brightness(1)');
        let img = $('#pokemon img');
        let named = $.trim($('#name').html());
        let userNamed = $.trim($('#guessinput').val());
        let guessed = named === userNamed;
        console.log(guessed);
        console.log(named);
        console.log(userNamed);
        if (guessed) {
            console.log('wena perrin');
            $('#succes').modal('show');
            $('#succes').find('.modal-title').text('Muy bien! era ' + named + '!')
            $('#succes').find('#img_').attr('src', img[0].src);
            $('#pokemon img').css('filter', 'brightness(0)');
            $('#guessinput').val('');
            setTimeout(() => {
                $('#succes').modal('hide');
                getARandomPokemon();
                $('#load').show();
                $('#pokemon').hide();
                $('#guessinput').hide();
                $('#guess').hide();
            }, 4000);

        } else {
            console.log('cuack');
            console.log('Era ' + named + ' !!!!');
            $('#fail').modal('show')
            $('#fail').find('.modal-title').text('Oh no! era ' + named + '!')
            $('#fail').find('#img_f').attr('src', img[0].src);
            $('#pokemon img').css('filter', 'brightness(0)');
            $('#guessinput').val('');
            setTimeout(() => {
                $('#fail').modal('hide');
                getARandomPokemon();
                $('#load').show();
                $('#pokemon').hide();
                $('#guessinput').hide();
                $('#guess').hide();
            }, 4000);

        }
    });
}










$(document).ready(() => {
    guess();
    $('#find_button').on('click', () => {
        let idPokemon = $.trim($('#find').val());
        $('#pkdx').hide();
        $('#load_pkdex').show();
        findAPokemon(idPokemon);
    });


    $('.pokedex_selected').on('click', () => {
        $('header').fadeOut();
        $('#guess_section').hide();
        $('#pokedex_section').fadeIn();
        setTimeout(() => {
            $('#load_pkdex').hide();
        }, 2000);
        setTimeout(() => {
            $('#input_find').show();
        }, 2100);
    });

    $('.game').on('click', () => {
        $('header').fadeOut();
        $('#pokedex_section').hide();
        $('#guess_section').fadeIn();
        getARandomPokemon();
    });
});
console.log('cargado');