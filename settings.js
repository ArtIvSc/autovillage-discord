// AutoVillage — game settings. Edit a value, save the file, reload the game (F5).
// F3 (developer menu) -> "Game settings" edits these live and can save / download a new copy of this file.
// Times are in seconds, distances in tiles, speeds in tiles per second, shares from 0 to 1.
window.AV_SETTINGS = {
  field: {
    startSize: 2,   // starting field is N x N tiles (even number); a ring is added when every tile is taken
  },
  start: {
    buildings: ['builderHouse', 'knightHouse', 'hospital', 'jail', 'turret'],   // starting village: builderHouse, knightHouse, hospital, jail, turret (repeats allowed)
    delay: 2,   // the starting buildings appear this long after the game starts
    finishTime: 1,   // and finish themselves this long after appearing
  },
  choice: {
    interval: 15,   // a new pair of choice buttons every N s; an unanswered pair fires one option at random
  },
  waves: {
    first: 1,   // first wave warning at this time
    interval: 60,   // time between waves
    warning: 2,   // the "Wave N" ribbon shows this long before the enemies come
    spacing: 0.25,   // time between the enemies of one wave
    // Идеи 2026-11-24 (adaptive waves, user decision: replaces the fixed list): enemies per wave =
    // village strength x perStrength x (1 + growth x (wave - 1)), at least min, at most max
    min: 1,   // smallest wave
    max: 60,   // biggest wave
    perStrength: 0.25,   // enemies per strength point
    growth: 0.15,   // each wave is this much bigger for the same strength
    strength: {
      villager: 1,   // strength of a level-1 worker (Builder, Jailer, Medic, Farmer)
      fighter: 2,   // ... of a level-1 Knight, Archer, Assassin or Commander
      heavyKnight: 4,   // ... of a level-1 Heavy Knight
      perLevel: 0.5,   // + this share of it per level above 1
      turret: 2,   // per finished Turret
      jail: 1,   // per finished Jail
      hospital: 1,   // per finished Hospital
    },
    mix: {
      goblin: {
        from: 2,   // from this wave on ...
        share: 0.25,   // ... each wave enemy is a Goblin with this chance (the rest of the mix: Cyclopes)
      },
      mage: {
        from: 3,
        share: 0.2,
      },
      golem: {
        from: 4,
        share: 0.1,
      },
      shaman: {
        from: 5,
        share: 0.1,
      },
    },
  },
  trickle: {
    interval: 2,   // one extra Cyclops every N s ...
    maxAlive: 10,   // ... while fewer than this many of them are alive
  },
  units: {
    builder: {
      hp: 50,
      sight: 99,   // finds construction sites and damaged buildings this far (99 = whole field)
      speed: 0.3,
      fear: 3,   // gets scared when an enemy comes this close
      repair: 5,   // HP repaired per hit (one hit per action interval)
      fearDelay: 2,   // a scared Builder runs to a shelter by itself after this long
      perSite: 3,   // at most this many Builders work on one building
    },
    knight: {
      hp: 40,
      sight: 99,   // attacks enemies this far (99 = whole field)
      speed: 0.3,
      damage: 10,
    },
    jailer: {
      hp: 40,
      sight: 99,   // hunts enemies this far (99 = whole field)
      speed: 0.5,
      damage: 5,   // melee when every Jail is full
      grab: 1,   // grabs an enemy from this distance
      carrySpeed: 0.7,   // speed multiplier while carrying a prisoner
    },
    medic: {
      hp: 40,
      sight: 99,
      speed: 1,   // Идеи 2026-11-23: twice as fast (was 0.5)
      threshold: 0.5,   // carries villagers below this share of HP to a Hospital
      grab: 1,   // picks a patient up from this distance
      carrySpeed: 0.7,   // speed multiplier while carrying a patient
    },
    archer: {
      hp: 30,
      sight: 99,   // shoots enemies this far (99 = whole field)
      speed: 0.3,
      damage: 8,   // damage per arrow
      range: 3,   // shoots from this distance
      every: 1.5,   // one arrow every N s
      arrowSpeed: 4,
    },
    assassin: {
      hp: 30,
      sight: 99,   // hunts ranged enemies (Fire Mages) first, then any enemy
      speed: 0.8,
      damage: 12,
    },
    commander: {
      hp: 50,
      sight: 99,
      speed: 0.3,
      squad: 5,   // gathers up to this many fighters (Knights, Archers, Assassins, Heavy Knights); the Commander itself doesn't fight
      recruit: 99,   // picks free fighters within this distance (99 = whole field)
      fight: 3,   // the squad fights enemies this close to the Commander
      lead: 2.5,   // stops this far from the enemy group it leads the squad to
      rally: 2,   // waits until its squad is on average this close before moving on
      danger: 1.5,   // an enemy this close (or a hit in the last 2 s) sends it back to its squad
      keepApart: 4,   // Commanders keep at least this far from each other
    },
    heavyKnight: {
      hp: 120,
      sight: 99,
      speed: 0.25,
      damage: 12,   // to every enemy within the radius ...
      radius: 1,   // ... around it
      every: 1.5,   // ... every N s
      size: 1.7,
    },
    farmer: {
      hp: 40,
      sight: 99,
      speed: 0.4,
      plant: 3,   // time to sow a farm
      harvest: 3,   // time to bring the harvest in
    },
    cyclops: {
      hp: 50,
      speed: 0.1,
      damage: 3,
      size: 1,   // scales the sprite and the area where the player can grab it
    },
    goblin: {
      hp: 20,
      speed: 0.35,
      damage: 2,
      size: 0.5,
    },
    golem: {
      hp: 150,
      speed: 0.05,
      damage: 3,
      size: 1.5,
    },
    mage: {
      hp: 30,
      speed: 0.12,
      damage: 5,   // fireball damage to everything in the blast
      size: 0.8,
      range: 2,   // shoots from this distance (was 3), and only once it is on the field
      every: 2,   // one fireball every N s
      blast: 0.6,   // blast radius
      fireballSpeed: 3,
    },
    shaman: {
      hp: 35,
      speed: 0.18,
      size: 0.8,
      heal: 8,   // HP healed to a wounded enemy ...
      every: 2,   // ... every N s
      range: 2,   // from this distance
    },
  },
  actions: {
    interval: 1,   // every unit hits / builds / repairs once per N s
    range: 0.6,   // ... from this distance
    dropRadius: 0.9,   // a dropped unit enters a building if released this close to it
    spacing: 0.5,   // villagers keep about this far apart (gentle push; enemies pass through)
    autoHeal: 0.3,   // villagers below this share of HP walk to a free Hospital bed by themselves
  },
  buildings: {
    buildWork: 5,   // hits a Builder needs to finish a construction site
    produce: 3,   // a finished house trains its villager after N s
    respawn: 30,   // a house / Jail brings its dead villager back after N s
    builderHouse: {
      hp: 20,
      shelter: 3,   // villagers it can shelter
    },
    knightHouse: {
      hp: 50,
      shelter: 3,
    },
    hospital: {
      hp: 50,
      beds: 3,
      heal: 6,   // HP healed ...
      every: 0.5,   // ... every N s
    },
    jail: {
      hp: 50,
      damage: 15,   // damage to the prisoner ...
      every: 3,   // ... every N s
    },
    archerTower: {
      hp: 40,
      shelter: 3,
    },
    hideout: {
      hp: 30,
      shelter: 3,
    },
    commandPost: {
      hp: 40,
      shelter: 3,
    },
    farm: {
      hp: 40,
      size: 2,   // tiles per side
      grow: 60,   // wheat ripens this long after sowing
      yield: 10000,   // food per harvest (Идеи 2026-11-24)
    },
    townHall: {
      hp: 150,
      size: 2,
      fieldSize: 6,   // appears in the centre once the field reaches N x N
      xpBonus: 0.5,   // villagers get this much more XP while it stands (+50%)
    },
    castle: {
      hp: 300,
      size: 4,
      fieldSize: 12,   // replaces the Town Hall once the field reaches N x N
      xpBonus: 0.5,   // keeps the Town Hall's XP bonus
    },
    turret: {
      hp: 50,
      damage: 20,   // damage per arrow
      every: 2,   // one arrow every N s
      range: 3,   // shoots at Cyclopes this close
      arrowSpeed: 3,
    },
  },
  levels: {
    xpBase: 10,   // XP from level L to L+1 = xpBase x L x L
    knightXp: 10,   // XP a Knight / Archer / Assassin gets per enemy it kills
    knightHp: 5,   // Knight / Archer / Assassin max HP per level
    builderWorkPerXp: 5,   // a Builder gets 1 XP per N hits of building / HP repaired
    builderBonus: 0.05,   // Builder build / repair speed per level (+5%)
    jailerSpeedBonus: 0.05,   // Jailer move speed per level (+5%)
  },
  events: {
    meteor: {
      hide: 5,   // time to hide villagers before the meteors fall
      count: 10,
      gap: 0.3,   // time between meteors
      damage: 30,
      radius: 0.9,
      after: 3,   // exits stay closed this long after the last meteor
    },
    plague: {
      duration: 30,
      patients: 1,   // villagers that fall sick at the start
      zeroSpeed: 1.5,   // the first patients move this much faster while the plague lasts
      damagePerSecond: 1,   // HP the sick lose per second outside the Hospital
    },
    quake: {
      duration: 5,   // shaking time; every building is hit once during it
      maxDamage: 0.5,   // random damage up to this share of the building's max HP
    },
  },
  food: {
    start: 30,   // food the village starts with
    every: 40,   // each villager eats once every N s ...
    builder: 1,   // ... this much food (per villager type)
    knight: 2,
    jailer: 1,
    medic: 1,
    archer: 1,
    assassin: 1,
    commander: 2,
    heavyKnight: 3,
    farmer: 1,
    hungry: 0.7,   // a hungry villager's speed, damage and work speed are multiplied by this until it eats
  },
  skills: {
    aimTime: 15,   // a picked skill waits this long for the player to tap the spot (the choice timer keeps running), then disappears
    fire: {
      radius: 1.5,   // every enemy this close to the tapped point catches fire
      damagePerSecond: 5,
      duration: 4,
    },
    freeze: {
      radius: 1.5,
      duration: 5,   // frozen enemies can't move or attack
    },
    lightning: {
      radius: 1.2,
      damage: 40,   // instant damage to every enemy in the radius
    },
  },
};
