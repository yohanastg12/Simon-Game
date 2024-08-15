var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = false;

// Menangani event keydown untuk memulai permainan
$(document).keydown(function() {
    if (level === 0) {
        $("#level-title").text("Level " + level);
        nextSequence();
        
    }
});

// Fungsi nextSequence untuk menghasilkan urutan warna yang acak


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        // Putar suara wrong.mp3
        playSound("wrong");

        // Tambahkan kelas game-over ke body
        $("body").addClass("game-over");

        // Hapus kelas game-over setelah 200 milidetik
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        // Ubah judul h1 menjadi "Game Over, Press Any Key to Restart"
        $("#level-title").text("Game Over, Press Any Key to Restart");

        // Reset variabel permainan
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function nextSequence() {

    userClickedPattern = [];
    
    level++;
    // Memperbarui teks h1 dengan level yang baru
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    // Menganimasikan tombol yang dipilih secara acak
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
}


// Menangani event klik pada tombol dengan class 'btn'
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    // Menganimasikan tombol yang diklik oleh pengguna
    $("#" + userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    // Memutar suara untuk tombol yang diklik oleh pengguna
    playSound(userChosenColour);

    // Memanggil currentColour
    animatePress(userChosenColour);

    
    // Memanggil fungsi checkAnswer 
    checkAnswer(userClickedPattern.length - 1);


});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour) {
    // Menambahkan kelas 'pressed' ke tombol yang diklik
    $("#" + currentColour).addClass("pressed");
    
    // Menghapus kelas 'pressed' setelah 100 milidetik
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

