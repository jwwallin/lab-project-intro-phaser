function main() {

  window.onload = function () {

    let game = new Phaser.Game("99%", "99%", Phaser.AUTO, '', { preload: preload, create: create, update: update });

    WebFontConfig = {

      active: function () { game.time.events.add(Phaser.Timer.SECOND, timeEvents, this); },

      google: {
        families: ['Arvo']
      }

    };

    let title;
    let text;
    let music;

    let names = "Maria Kostina, Konsta Purtsi, Niki Niittymäki, Miika Peltotalo, Kimmo Mikkola, Aleksi Papalitsas, Kalle Päivärinne, Jarno Laihinen, Aapo Torkkeli, Oskari Vahala, Antti Auranen, Marko Loponen, Meri Saarinen, Kristian Tuohimaa, Tero Yrjölä, Jaakko Kotitalo, Niklas Niemelä, Emma Lepistö, Jali Rainio, Mikael Janhonen, Santeri Juhela, Sebastian Paakkola, Roni Ronkainen, Lauri Jussinmäki, Heikki Koski, Johan Sjövall, Juho Kronbäck, Jaakko Oksanen, Antti Hakkala, Matias Virta, Hannu-Pekka Hedman, Joona Juusti, Juho Kuusinen, Risto Punkkinen, Peetu Seilonen, Julius Rajala, Tapani Joelsson, Adrian Borzyszkowski, Joonas Leivo, Lauri Laakkonen, Fairuz Bhuiyan, Henri Maunu, Samuli Virtanen, Anastasiia Smirnova, Niko Ekilä, Sampsa Vuorela, Topi Vakkuri, Elmo Kilkki, Loviisa Mäenpää, Vesa Saarikko, Sakari Snäll, Samuli Pitkänen, Tommi Hilanne, Vilho Kivihalme, Pilvi Rajala, Roy Grönroos, Pyry Vuorela, Antti Vainikka, Samuel Lindqvist, Teppo Vättö, Tatu Heinonen, Jaakko Jokinen, Matti Liikala, Susanna Landström, Juho Matikainen, Valtteri Ukkonen, Lassi Salomaa, Josia Nyman, Teppo Huhtala, Juha-Pekka Samuelsson, Anna Paloposki, Sauli Pihl, Petri Nissilä, Ilkka Tommola, Pekka Maanpää, Teemu Laakso, Oskari Linden, Esa Aaltonen, Ville Suominen, Seppo Virtanen, Sampsa Rauti, Tuukka Panula, Tommi Välimäki, Atte Nuutinen, Khadar Wais, Antti Hurtta, Ville Leppänen, Pertti Ranttila, Nikke Tamminen, Mikko Raula, Konsta Sinisalo, Juha Anttila, Eevert Koskinen, Eetu Tapola, Markus Juhonen, Antti Merinen, Petteri Mäki, Markus Lindberg, Asser Junnila, Matti Iso-Järvenpää, Sami Teräväinen, Juho Vainio, Topi Mäkinen, Rami Laihinen, Canhao Xu, Sami Nieminen, Heini Ahde, Miika Sundström, Patrik Ala-Äijälä, Joni Roinila, Atte Moisio, Jani Sipponen, Ohto Myllynen, Tommi Tapaninaho, Susanna Nevalainen, Vesa Keskitalo, Joni Uitto, Taneli Veistinen, Ville Ämmälä, Jarno Vuorenmaa, Miikka Lehtonen, Eveliina Saari, Pasi Liljeberg, Mikko Forsman, Juho Terrijärvi, Samuli Suomi";

    let distance = 300;
    let speed = 1;
    let stars;

    let max = 200;
    let xx = [];
    let yy = [];
    let zz = [];

    function preload() {
      game.load.image('star', 'assets/graphics/star.png');
      game.load.image('ship', 'assets/graphics/tribase-u3-d0.png');
      game.load.spritesheet('engineEffect', 'assets/graphics/light_glow_effect.png', 64, 64, 10);
      game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
      game.load.audio('music', ['assets/music/Ending.wav']);
    }

    function timeEvents() {
      playMusic();
      showTitle();
      game.time.events.add(8500, showText, this);
      game.time.events.add(79500, flySpaceship, this);
      game.time.events.add(120000, timeEvents, this);
    }

    function showTitle() {

      let title = game.add.text(
        game.world.centerX, game.world.centerY,
        "KIITOS KAIKILLE\nKURSSILAISILLE\n&\nOHJAAJILLE",
        {
          font: `70 100px "Arvo"`,
          fill: 'rgb(0,0,0)',
          stroke: '#ff6',
          strokeThickness: 5,
          align: 'center'
        });
      title.anchor.setTo(0.5);
      title.scale.setTo(2, 2);

      game.add.tween(title).to({ y: '-50' }, 13000, Phaser.Easing.Linear.Out, true);
      game.add.tween(title.scale).to({ x: 0, y: 0 }, 11000, Phaser.Easing.Linear.Out, true);
      game.add.tween(title).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.In, true, 9500);
    }

    function showText() {

      let text = game.add.text(
        game.world.centerX, game.world.height, names,
        {
          font: `70 44px "Arvo"`,
          fill: '#ff6',
          wordWrap: true,
          wordWrapWidth: game.width * 0.6,
          align: 'center'
        });
      text.anchor.setTo(0.5, 0);

      let textTween = game.add.tween(text).to({ y: -(game.height * 4) }, 71000, Phaser.Easing.Linear.InOut, true);
    }

    function flySpaceship() {

      let effect = game.add.sprite(0, 0, 'engineEffect');
      effect.anchor.setTo(0.5);
      effect.scale.set(3);
      let anim = effect.animations.add('fire');
      anim.play(20, true);
      let effect2 = game.add.sprite(0, 0, 'engineEffect');
      effect2.anchor.setTo(0.5);
      effect2.scale.set(3);
      let anim2 = effect2.animations.add('fire');
      anim2.play(30, true);

      let ship = game.add.sprite(game.world.centerX, game.world.centerY, 'ship');
      ship.anchor.setTo(0.5);
      ship.addChild(effect);
      ship.addChild(effect2);

      ship.scale.set(30);

      game.add.tween(ship).to({ y: '-50' }, 30000, Phaser.Easing.Linear.Out, true);
      game.add.tween(ship.scale).to(0, 28000, Phaser.Easing.Linear.Out, true);
      game.add.tween(ship).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.In, true, 28500);
      game.add.tween(ship).to( { angle: 360 }, 10000, Phaser.Easing.Linear.None, true, 0, -1);
    }

    function create() {

      // create stars for animation
      if (game.renderType === Phaser.WEBGL) {
        max = 2000;
      }

      var sprites = game.add.spriteBatch();

      stars = [];

      for (var i = 0; i < max; i++) {
        xx[i] = Math.floor(Math.random() * game.world.width) - 400;
        yy[i] = Math.floor(Math.random() * game.world.height) - 300;
        zz[i] = Math.floor(Math.random() * 1700) - 100;

        var star = game.make.sprite(0, 0, 'star');
        star.anchor.set(0.5);

        sprites.addChild(star);

        stars.push(star);
      }
    }

    function playMusic() {
      music = game.add.audio('music', 1, true);
      music.play();
    }

    function update() {
      // star animation
      for (var i = 0; i < max; i++) {
        stars[i].perspective = distance / (distance - zz[i]);
        stars[i].x = game.world.centerX + xx[i] * stars[i].perspective;
        stars[i].y = game.world.centerY + yy[i] * stars[i].perspective;

        zz[i] -= speed;

        if (zz[i] < -300) {
          zz[i] += 600;
        }

        stars[i].alpha = Math.min(stars[i].perspective / 2, 1);
        stars[i].scale.set(stars[i].perspective / 2);
        stars[i].rotation += 0.1;

      }
    }
  };
}

main();
