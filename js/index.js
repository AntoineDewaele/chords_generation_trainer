$(document).ready(function () {
    let settings = {
        number_of_keys: 38, // cannot exceed 83 nor be less than 35
        key_width: 30, // white key width in pixels
        key_height: 130, // white key height in pixels
        chord_color: '#bbd9e4', // color accent when a chord is chosen
        scale_color: '#fbce80' // color accent when a scale is chosen

    }

    $('#piano').vpcf(settings);
    $('#stop_btn').hide();

    let key_notes = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B', 'C', 'C#', 'D'];
    let middle_c = Math.round((settings.number_of_keys) / 12);
    middle_c = (Math.round(middle_c / 2) * 12) - 13;

    let interval, currentChord;
    let majorChords = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    let minorChords = ['Am', 'Bm', 'Cm', 'Dm', 'Em', 'Fm', 'Gm'];
    let bMajorChords = ['Ab', 'Bb', 'Db', 'Eb', 'Gb'];
    let bMinorChords = ['Abm', 'Bbm', 'Dbm', 'Ebm', 'Gbm'];
    let sharpMajorChords = ['A#', 'C#', 'D#', 'F#', 'G#'];
    let sharpMinorChords = ['A#m', 'C#m', 'D#m', 'F#m', 'G#m'];

    let availableChords = computeAvailableChords();
    console.log(availableChords);

    let chordsPosition = {
        'A': [10, 14, 17],
        'Am': [10, 13, 17],
        'Ab': [9, 13, 16],
        'Abm': [9, 12, 16],
        'A#': [11, 15, 18],
        'A#m': [11, 14, 18],
        'B': [12, 16, 19],
        'Bm': [12, 15, 19],
        'Bb': [11, 15, 18],
        'Bbm': [11, 14, 18],
        'C': [1, 5, 8],
        'Cm': [1, 4, 8],
        'C#': [2, 6, 9],
        'C#m': [2, 5, 9],
        'D': [3, 7, 10],
        'Dm': [3, 6, 10],
        'Db': [2, 6, 9],
        'Dbm': [2, 5, 9],
        'D#': [4, 8, 11],
        'D#m': [4, 7, 11],
        'E': [5, 9, 12],
        'Em': [5, 8, 12],
        'Eb': [4, 8, 11],
        'Ebm': [4, 7, 11],
        'F': [6, 10, 13],
        'Fm': [6, 9, 13],
        'F#': [7, 11, 14],
        'F#m': [7, 10, 14],
        'G': [8, 12, 15],
        'Gm': [8, 11, 15],
        'Gb': [7, 11, 14],
        'Gbm': [7, 10, 14],
        'G#': [9, 13, 16],
        'G#m': [9, 12, 16]
    }

    displayChords(chordsPosition['A'])

    $('#start_btn').click(function () {
        start();
    })

    $('#stop_btn').click(function () {
        stop();
    })

    $('.chords_configuration').click(function(){
        availableChords = computeAvailableChords();
    })

    $('#time_interval').on('change', function() {
        clearInterval(interval);
        interval = setInterval(function () {
            generateRandomChords();
        }, $('#time_interval').val() * 1000);
    })

    function start() {
        $('#start_btn').hide();
        $('#stop_btn').show();
        generateRandomChords();
        interval = setInterval(function () {
            generateRandomChords();
        }, $('#time_interval').val() * 1000);
    }

    function generateRandomChords() {
        let chordsCopy = [...availableChords]
        chordsCopy.splice(chordsCopy.indexOf(currentChord), 1);
        currentChord = chordsCopy[Math.floor(Math.random() * chordsCopy.length)];
        $('.chord').html(currentChord.replace("b", "<sup>b</sup>").replace('#', "<sup>#</sup>"));
        displayChords(chordsPosition[currentChord]);
    }

    function displayChords(chord) {
        $('.vpcf_black_key').css('background-color', '#000000');
        $('.vpcf_white_key').css('background-color', '#FFFFFF');

        $('.vpcf_notes').text('');

        $.each(chord, function (index, value) {
            let key_step = parseInt(value) + (middle_c);
            $('#vpcf_key_' + key_step).css('background-color', settings.chord_color);
            $('#vpcf_chords h3 .vpcf_notes').append(key_notes[(parseInt(value) - 1)] + ' ');
        });
    }

    function stop() {
        $('#stop_btn').hide();
        $('#start_btn').show();
        clearInterval(interval);
        displayChords([])
    }

    function computeAvailableChords() {
        let availableChords = [];

        if ($('#with_major_chords').is(':checked')) {
            availableChords = availableChords.concat(majorChords)
            if ($('#with_b_chords').is(':checked')) {
                availableChords = availableChords.concat(bMajorChords);
            }
            if ($('#with_sharp_chords').is(':checked')) {
                availableChords = availableChords.concat(sharpMajorChords);
            }
        }

        if ($('#with_minor_chords').is(':checked')) {
            availableChords = availableChords.concat(minorChords)
            if ($('#with_b_chords').is(':checked')) {
                availableChords = availableChords.concat(bMinorChords);
            }
            if ($('#with_sharp_chords').is(':checked')) {
                availableChords = availableChords.concat(sharpMinorChords);
            }
        }

        return availableChords;
    }
});
