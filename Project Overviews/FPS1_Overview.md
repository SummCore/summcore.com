# JET PACK BLOWOUT - Complete Game Overview

**Project:** jet-pack-blowout v0.1.0
**Engine:** Babylon.js 8.50.2 + Havok Physics V2
**Stack:** TypeScript, Vite 7.3, Zustand 5 + Immer
**Genre:** Aerial arena FPS with jetpack flight, WipEout-style pickup combat, and race modes

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Game Modes](#game-modes)
3. [Pilots (6)](#pilots)
4. [Arenas (4)](#arenas)
5. [Weapons (7)](#weapons)
6. [Powerups (3)](#powerups)
7. [Pickup Pads (30)](#pickup-pads)
8. [Jetpack Flight System](#jetpack-flight-system)
9. [Race System](#race-system)
10. [Bot AI (5 Bots)](#bot-ai)
11. [HUD](#hud)
12. [Main Menu](#main-menu)
13. [Core Systems](#core-systems)
14. [Audio](#audio)
15. [Build & Config](#build--config)

---

## Project Structure

```
src/
  main.ts                     Entry point: engine init, menu, game start
  core/
    GameEngine.ts             Main loop, system coordination, physics
    GameStore.ts              Zustand state: player, weapon, match, race
    InputManager.ts           WASD, Space, Shift, LMB, F key tracking
    AudioManager.ts           Music, SFX, voice playback
  systems/
    JetpackSystem.ts          Flight physics, fuel, thrust, boost
  ui/
    MainMenu.ts               Pre-game: pilot, mode, arena, race config
    HUD.ts                    In-game overlay: bars, speed, weapon, minimap
  pilots/
    PilotTypes.ts             6 pilot configs with jetpack tuning
  game/
    ArenaTypes.ts             4 arena configs with spawn points
    ArenaBuilder.ts           Procedural arena geometry generation
    RaceTypes.ts              'circuit' | 'elimination'
    RaceSystem.ts             Laps, checkpoints, 4 circuits, elimination
  entities/
    RaceRing.ts               Checkpoint ring with glow/detection
  weapons/
    WeaponTypes.ts            7 weapon configs (damage, fire rate, uses)
    WeaponSystem.ts           Player firing: hitscan, projectile, beam
    WeaponVisuals.ts          Muzzle flash, tracers, explosions, beams
    Projectile.ts             Rocket/missile physics, homing, splash
    DamageSystem.ts           Damage application, splash radius
  powerups/
    PowerupTypes.ts           3 powerup configs (health, shield, speed)
    PowerupSystem.ts          Spawn management, player/bot collection
    Powerup.ts                Bobbing mesh, respawn timer
  pickups/
    PickupPadTypes.ts         30 pad spawn locations + configs
    PickupPadSystem.ts        Pad management, random weapon assignment
    PickupPad.ts              Glow ring pad, weapon/speed delivery
  ai/
    BotTypes.ts               5 bot configs, spawn points, difficulty
    BotSystem.ts              Bot spawning, projectile tracking, pickups
    Bot.ts                    5-state FSM AI, targeting, dodging
public/
  audio/
    music/                    36 tracks (Electronic, SciFi, Action, etc.)
    sfx/                      Guns (4), Explosions (2), Voice (3)
```

---

## Game Modes

| Mode | Weapons | Bots | Race | Description |
|------|---------|------|------|-------------|
| **Deathmatch** | Yes | 0-5 | No | Arena combat with weapon pads and powerups |
| **Race** | Yes | 0-5 | Yes | Ring circuit racing with combat, circuit or elimination |
| **Free Fly** | Yes | No | No | Solo exploration, no bots |

All modes include weapon pads, speed pads, and powerups. Match timer: 5 minutes. Player respawns after 3 seconds with 3-second spawn protection.

---

## Pilots

6 pilots, each with unique health/shield and a signature jetpack tuning (11 parameters). Replaces the old generic jetpack preset selector.

| Pilot | Callsign | HP | Shield | Max Speed | Fuel | Archetype |
|-------|----------|----|--------|-----------|------|-----------|
| **VIPER** | VPR-X1 | 80 | 35 | 110 | 55 | Fragile speedster |
| **TITAN** | TTN-M7 | 140 | 70 | 52 | 200 | Slow fortress |
| **GHOST** | GHT-00 | 100 | 50 | 82 | 100 | All-rounder |
| **PHOENIX** | PHX-99 | 85 | 30 | 95 | 70 | Glass cannon |
| **FORTRESS** | FRT-D4 | 110 | 90 | 58 | 160 | Shield specialist |
| **BLITZ** | BLZ-K9 | 90 | 40 | 90 | 75 | Fast hybrid |

### Display Stats (menu bars, 0-1 normalized)

| Pilot | SPD | ARM | SHD | FUL | Color |
|-------|-----|-----|-----|-----|-------|
| VIPER | .95 | .30 | .25 | .25 | #ff3333 |
| TITAN | .20 | .95 | .90 | .95 | #4488cc |
| GHOST | .55 | .55 | .55 | .55 | #888899 |
| PHOENIX | .80 | .35 | .20 | .35 | #ff6600 |
| FORTRESS | .25 | .70 | 1.0 | .80 | #2266aa |
| BLITZ | .75 | .40 | .35 | .40 | #00cc88 |

### Jetpack Tuning Per Pilot

| Param | Viper | Titan | Ghost | Phoenix | Fortress | Blitz |
|-------|-------|-------|-------|---------|----------|-------|
| Thrust Force | 55 | 38 | 45 | 50 | 40 | 48 |
| Movement Force | 85 | 50 | 70 | 80 | 55 | 75 |
| Boost Force | 75 | 45 | 60 | 100 | 50 | 65 |
| Max Speed | 110 | 52 | 82 | 95 | 58 | 90 |
| Max Fuel | 55 | 200 | 100 | 70 | 160 | 75 |
| Fuel Recharge | 35 | 15 | 25 | 30 | 18 | 32 |
| Thrust Cost | 30 | 18 | 25 | 28 | 20 | 22 |
| Boost Cost | 20 | 30 | 25 | 22 | 28 | 18 |
| Air Friction | 0.96 | 0.98 | 0.97 | 0.955 | 0.98 | 0.965 |
| Boost Cooldown | 0.4 | 1.4 | 0.75 | 0.35 | 1.1 | 0.55 |
| Gravity Scale | 0.12 | 0.2 | 0.15 | 0.11 | 0.19 | 0.13 |

---

## Arenas

4 distinct arenas with unique geometry, lighting, and spawn points.

### NEON FOUNDRY (Default)

| Property | Value |
|----------|-------|
| Size | 200 units |
| Accent | #ff6600 (orange) |
| Theme | Industrial corridors, tight cover, close-quarters ambushes |
| Spawns | 7 points (y=8-25) |

**Geometry:** 4 corner towers (8x12x8 + platform + spire), central platform (20m dia, y=15), 8 angled walls, 2 diagonal bridges (54m), 4 ramps. Orange accent lights.

### SKY REACH

| Property | Value |
|----------|-------|
| Size | 250 units |
| Accent | #44aaff (cyan) |
| Theme | Towering platforms, vertical combat, long sight lines |
| Spawns | 7 points (y=15-45) |

**Geometry:** 6 floating platforms (y=20-45, 10-18m dia), narrow walkways, central spire (50m tall). Blue/white accent lights, beacon at top.

### THE PIT

| Property | Value |
|----------|-------|
| Size | 150 units |
| Accent | #ff4444 (red) |
| Theme | Sunken circular arena, spiral ramps, nowhere to hide |
| Spawns | 7 points (y=-18 to 5) |

**Geometry:** Circular rim walls (55m radius, 12 segments), sunken floor (y=-20), spiral ramp (8 segments), 4 staggered inner platforms. Red accent lights.

### CRYSTAL GRID

| Property | Value |
|----------|-------|
| Size | 200 units |
| Accent | #00ffcc (teal) |
| Theme | Symmetric open grid, glass walls, precision combat |
| Spawns | 7 points (y=8-15) |

**Geometry:** 5x5 transparent wall grid (alpha 0.35, cyan emissive), 4 corner platforms (y=12) with pillars, central platform (y=15) with glowing torus. Cyan/green accent lights.

### Shared Arena Features

- **Ground:** Procedural grid texture (32px), physics aggregate
- **Skybox:** 1000-unit cube, dark-to-light gradient, 100 star field points
- **Physics:** All platforms/walls have physics bodies for collision

---

## Weapons

7 weapons using a WipEout-style single-slot pickup model. Player starts unarmed, picks up from pads, fires until empty or absorbs for shield.

| # | Weapon | Type | Damage | Fire Rate | Uses | Absorb |
|---|--------|------|--------|-----------|------|--------|
| 0 | **Machine Gun** | Hitscan | 10 | 14/s | 60 | +10 shield |
| 1 | **Rocket Launcher** | Projectile | 70 | 1.5/s | 5 | +30 shield |
| 2 | **Laser** | Continuous | 35/s | Beam | 100 energy | +20 shield |
| 3 | **Shotgun** | Spread | 12 x6 pellets | 1.8/s | 8 | +15 shield |
| 4 | **Railgun** | Hitscan | 120 | 0.5/s | 3 | +35 shield |
| 5 | **Heat Seekers** | Seeking | 55 | 2/s | 4 | +25 shield |
| 6 | **Flak Cannon** | Proj. Spread | 15 x8 pellets | 2.5/s | 6 | +20 shield |

### Weapon Details

**Machine Gun** — High fire rate, low damage. 180m range, 0.025 rad spread. Auto-fire.

**Rocket Launcher** — Slow, heavy. 55 m/s projectile, 250m range. Splash: 10m radius, 35 damage.

**Laser** — Continuous beam. 150m range. Drains energy pool instead of discrete uses.

**Shotgun** — 6 pellets per shot. 60m range, 0.12 rad spread. Close-range devastation.

**Railgun** — Single massive hit, penetrating. 250m range, no spread. 2-second cooldown.

**Heat Seekers** — Homing missiles. 40 m/s, homing strength 3.0. Splash: 6m radius, 25 damage.

**Flak Cannon** — 8 pellets of slow projectiles. 30 m/s, 0.08 rad spread. Splash: 3m radius, 10 damage each.

### Weapon Colors (HUD)

| Weapon | RGB |
|--------|-----|
| Machine Gun | (1.0, 0.8, 0.2) yellow-orange |
| Rocket | (1.0, 0.3, 0.1) red-orange |
| Laser | (1.0, 0.1, 0.1) red |
| Shotgun | (0.8, 0.6, 0.3) brown |
| Railgun | (0.2, 0.8, 1.0) cyan |
| Heat Seekers | (1.0, 0.5, 0.0) orange |
| Flak Cannon | (0.6, 1.0, 0.3) green-yellow |

### Weapon Mechanics

- **Pickup:** Walk over weapon pad, replaces current weapon
- **Fire:** LMB or E, decrements uses. Auto-fire for machine gun and laser
- **Absorb:** F key converts weapon to shield energy (value per weapon above)
- **Empty:** Weapon clears when uses reach 0, player becomes unarmed
- **Respawn unarmed:** Player respawns with no weapon, must find a pad

---

## Powerups

3 powerup types spawned at fixed positions. Bobbing animation, respawn on timer.

| Type | Value | Respawn | Color | Shape |
|------|-------|---------|-------|-------|
| **Health Pack** | +50 HP | 15s | Red (1, 0.2, 0.2) | Cube (1.2 units) |
| **Shield Boost** | +50 Shield | 20s | Blue (0.2, 0.5, 1) | Diamond polyhedron |
| **Speed Boost** | 1.5x speed, 8s | 25s | Yellow (1, 1, 0.2) | Cone (arrow) |

### Spawn Locations (7 total)

| Position | Type |
|----------|------|
| (35, 3, 35) | Health |
| (-35, 3, -35) | Health |
| (0, 12, 0) | Health |
| (-35, 8, 35) | Shield |
| (35, 8, -35) | Shield |
| (20, 5, 0) | Speed |
| (-20, 5, 0) | Speed |

Bots can also pick up powerups (health/shield only, not speed).

---

## Pickup Pads

30 pads total: 18 weapon, 12 speed. WipEout-style ground pads with glow effects.

### Weapon Pads (18)

- **Respawn:** 10 seconds
- **Color:** Cyan glow (0, 0.8, 1)
- **Shape:** Circular platform, 3m diameter
- **Mechanic:** Grants a random weapon from the full pool with maximum uses
- **Locations:** Towers (4), bridges (2), center (1), ramps (4), walls (4), ground (3)

### Speed Pads (12)

- **Respawn:** 5 seconds
- **Boost Force:** 40 units (directional)
- **Color:** Yellow glow (1, 0.9, 0.1)
- **Shape:** Triangular arrow, 3.5m
- **Mechanic:** Directional impulse in pad's facing direction
- **Locations:** Ramps (4), boost ring (4), bridges (2), walls (2)

### Pad Placement Philosophy

- **Premium** (contested): Central platform (y=15.8), tower tops (y=13)
- **Mid-tier** (elevated): Bridges (y=12), elevated walls (y=4-8)
- **Ground** (easy access): Near ramps and scattered at ground level

---

## Jetpack Flight System

Full 3D flight driven by camera direction. Thrust (Space) pushes up/forward, WASD moves laterally, Boost (Shift) dashes forward.

### Physics Parameters (Balanced Preset)

| Parameter | Value |
|-----------|-------|
| Max Fuel | 100 |
| Fuel Recharge | 25/s (grounded or not thrusting) |
| Thrust Fuel Cost | 25/s |
| Boost Fuel Cost | 25 (instant) |
| Thrust Force | 45 |
| Movement Force | 70 (WASD) |
| Boost Force | 60 |
| Air Friction | 0.97/frame |
| Max Speed | 80 m/s |
| Boost Cooldown | 0.8s |
| Boost Duration | 0.35s |
| Gravity Scale | 0.15 (reduces standard 9.81 gravity) |

### 3 Base Presets (used by bots)

| Preset | Fuel | Recharge | Max Speed | Cooldown | Gravity |
|--------|------|----------|-----------|----------|---------|
| Speed | 60 | 30/s | 100 | 0.5s | 0.12 |
| Balanced | 100 | 25/s | 80 | 0.8s | 0.15 |
| Tank | 180 | 18/s | 60 | 1.2s | 0.18 |

### Flight Features

- **Thrust:** Space key, flies in camera look direction
- **Boost:** Shift key, short dash in forward direction with cooldown
- **Momentum:** Velocity persists, friction gradually slows
- **Ground collision:** Minimum height 1.5m, cancels downward velocity
- **External impulse:** Speed pads inject directional force
- **Custom tuning:** Each pilot overrides all 11 parameters via `applyCustomTuning()`

---

## Race System

Ring checkpoint racing with 4 circuit layouts. Supports circuit (complete all laps) and elimination (last place cut each lap) modes.

### Circuit Types

| Circuit | Shape | Dimensions | Character |
|---------|-------|------------|-----------|
| **Figure-8** | Lemniscate infinity | 45m radius, 8-16m height | Classic flowing loop |
| **Oval** | Wide ellipse | 55m x 35m, 10-16m | Speed track, gentle turns |
| **Helix** | Spiral climb + dive | 35m radius, 5-45m height | Dramatic vertical |
| **Zigzag** | Sharp reversals | 25m segments, 8-26m | Precision turns |

### Race Parameters

| Parameter | Value |
|-----------|-------|
| Checkpoints per lap | 12 rings |
| Laps | 1-10 (default 3) |
| Ring detection radius | 6m |
| Ring states | Inactive (gray), Active (cyan), Passed (green) |
| Ring animation | 0.5 rad/s rotation, pulsing glow |

### Elimination Mode

- Tracks all racers (player + bots) via `racerProgress` map
- After each completed lap, last-place racer is eliminated
- Standings sorted by: most laps > most checkpoints > least time
- Bot positions estimated by nearest-checkpoint heuristic
- Eliminated bots are killed and hidden (no respawn)
- If player is eliminated, they die (game over)
- If only player remains, they win

### HUD Race Elements

- **Position:** `POS: X/Y` — green (1st), orange (2nd-3rd), red (4th+)
- **Elimination feed:** Red `ELIMINATED: <name>` messages, 4s fade

---

## Bot AI

5 bots with 3 difficulty tiers. 5-state finite state machine with awareness of weapons, powerups, threats, and multiple targets.

### Bot Roster

| Bot | Difficulty | Accuracy | Reaction | Aggression | Speed | Preferred Weapon | Color |
|-----|-----------|----------|----------|------------|-------|------------------|-------|
| **Hotshot** | Easy | 30% | 1.0s | 30% | 8 | Machine Gun | Red |
| **Burnout** | Easy | 35% | 0.9s | 40% | 9 | Machine Gun | Orange |
| **Sky King** | Medium | 55% | 0.6s | 60% | 11 | Rocket Launcher | Blue |
| **Nitro** | Medium | 50% | 0.7s | 55% | 10 | Laser | Purple |
| **Ace** | Hard | 75% | 0.3s | 80% | 14 | Rocket Launcher | Gold |

### AI States

| State | Behavior |
|-------|----------|
| **Patrol** | Random waypoint navigation at 60% speed |
| **Chase** | Pursue detected target, gain altitude advantage |
| **Attack** | Strafe around target at 50% speed, fire weapons, maintain height |
| **Flee** | Low health (<25-30%), seek health/shield pickups, regen 5 HP/s |
| **SeekPickup** | When unarmed, navigate to nearest active weapon pad |

### AI Features

- **Target selection:** Distance, health, player priority, sticky targeting
- **Line of sight:** Raycasting before engaging
- **Target leading:** Velocity estimation with lead time for projectiles (80% accuracy factor)
- **Strafing:** Randomized rhythm per bot (freq 1.2-2.0, random phase)
- **Dodging:** Medium/Hard bots dodge incoming projectiles (1.5s/0.8s reaction window)
- **Weapon absorption:** Medium/Hard bots convert weapon to shield when fleeing
- **Arena bounds:** +-90 unit boundary, 50m height limit
- **Combat range:** 60m detection, 40m attack engagement

### Bot Stats

| Stat | Value |
|------|-------|
| Health | 100 |
| Starting Shield | 25 |
| Max Shield | 50 |
| Respawn Timer | 5 seconds |
| Flee Threshold (Easy) | 30% HP |
| Flee Threshold (Medium) | 25% HP |
| Flee Threshold (Hard) | 15% HP |
| Nameplate | Colored billboard text above bot |

---

## HUD

DOM-based overlay with cyberpunk monospace styling.

### Layout

| Position | Element | Details |
|----------|---------|---------|
| **Center** | Crosshair | Cross lines + red dot |
| **Bottom-Left** | Health/Shield/Fuel bars | Gradient fills, color-coded warnings |
| **Bottom-Center** | Speed | m/s value, yellow when boosting |
| **Bottom-Right** | Weapon panel | Name, uses bar, absorb hint, flash on pickup |
| **Top-Left** | Match timer + K/D | MM:SS (red <30s), kills/deaths |
| **Top-Left (race)** | Position | POS: X/Y with color coding |
| **Top-Right** | Kill feed + controls | 5 recent kills (8s fade), keybind guide |
| **Bottom-Right** | Minimap | 130x130px, player/bot/powerup dots |

### Health Bar Colors

| Range | Color |
|-------|-------|
| >25% | Red gradient (#ff3333 to #cc0000) |
| <25% | Dark red (#ff0000 to #880000) |

### Fuel Bar Colors

| Range | Color |
|-------|-------|
| >50% | Green (#00ff88) |
| 20-50% | Orange (#ffaa00) |
| <20% | Red (#ff4444) |

### Minimap

- 130x130px canvas, 0.6 scale factor
- Player: green dot (center), direction line
- Bots: red dots (relative position)
- Powerups: blue squares
- ~108 unit visible radius

---

## Main Menu

Full-screen DOM overlay with neon cyberpunk theme.

### Sections (top to bottom)

1. **Title** — "JET PACK BLOWOUT" (cyan + red glow)
2. **Pilot Name** — Text input, 16 char max
3. **Select Pilot** — 3x2 grid of pilot cards with stat bars (SPD/ARM/SHD/FUL)
4. **Game Mode** — 3 toggle buttons: Deathmatch / Race / Free Fly
5. **Arena** — 2x2 grid of arena cards with descriptions
6. **Circuit** — 4 buttons: Figure 8 / Oval / Helix / Zigzag (race only)
7. **Race Type** — 2 buttons: Circuit / Elimination (race only)
8. **Laps** — Slider 1-10 (race only)
9. **Bots** — Slider 0-5 (hidden in freefly)
10. **LAUNCH** — Start button

### Visibility Rules

- Circuit, Race Type, Laps: visible only in Race mode
- Bots: visible in Deathmatch + Race, hidden in Free Fly

### GameConfig Output

```typescript
interface GameConfig {
  playerName: string;       // Text input
  gameMode: GameMode;       // 'deathmatch' | 'race' | 'freefly'
  pilotId: PilotId;         // 6 pilot ids
  arenaId: ArenaId;         // 4 arena ids
  laps: number;             // 1-10
  raceType: RaceType;       // 'circuit' | 'elimination'
  botCount: number;         // 0-5
  circuit: CircuitType;     // 'figure8' | 'oval' | 'helix' | 'zigzag'
}
```

---

## Core Systems

### GameEngine (src/core/GameEngine.ts)

**Initialization:**
1. Babylon.js Engine + Scene (clear color: dark blue)
2. Havok Physics V2 (gravity: -9.81 m/s^2)
3. UniversalCamera (FOV 1.2, sensitivity 1500, no default keys)
4. Hemispheric light (0.8) + directional sun (0.4)
5. InputManager + AudioManager

**Configuration (after menu):**
1. Build arena geometry via ArenaBuilder(arenaId)
2. Apply pilot stats to GameStore (maxHealth, maxShield)
3. Create JetpackSystem with pilot's custom tuning
4. Create HUD, weapon system, powerup system, pickup pads, bots
5. Register racers if race mode
6. Wire elimination callback if elimination mode
7. Reset match state, delayed race start (1.5s)

**Update Loop Order:**
1. Death/respawn check
2. Match timer (spawn protection, speed boost, respawn countdowns)
3. Jetpack physics
4. Weapon system
5. Race system + bot progress estimation
6. Powerup system
7. Pickup pad system
8. Bot system (AI + projectiles)
9. HUD update + minimap entities
10. Input previous state snapshot

### GameStore (src/core/GameStore.ts)

Zustand + Immer for immutable state updates.

**Player State:**
- health/maxHealth, shield/maxShield, isDead, respawnTimer (3s)
- kills, deaths, speed, fuelPercentage, isBoosting
- speedMultiplier (1-1.5x), speedBoostTimer, spawnProtection (3s)

**Weapon State:**
- weaponId (WeaponId | null), usesRemaining

**Match State:**
- timer, maxTime (300s), isActive, killFeed (max 5 entries)

**Race State:**
- currentLap, totalLaps, raceTime, bestLapTime

**Key Actions:**
- `takeDamage(amount)` — Shield absorbs first, then health. Death at 0 HP.
- `firePickupWeapon()` — Decrements uses, clears weapon at 0.
- `absorbWeapon()` — Converts weapon to shield energy, returns amount gained.
- `setPilotStats(maxHealth, maxShield)` — Sets pilot-specific caps.
- `resetMatch()` — Uses dynamic maxHealth/maxShield, not hardcoded.

### InputManager (src/core/InputManager.ts)

| Key | Action |
|-----|--------|
| W/A/S/D | Movement (lateral) |
| Space | Jetpack thrust |
| Shift | Jetpack boost |
| LMB / E | Fire weapon |
| F | Absorb weapon for shield |

Tracks current + previous frame state for "just pressed" detection. Captures mouse wheel delta.

### AudioManager (src/core/AudioManager.ts)

| Category | Volume | Files |
|----------|--------|-------|
| Music | 30% | Electronic Vol7 Turbo Main.wav |
| SFX | 60% | machine-gun, rocket, laser, explosions |
| Voice | 72% | "Here we go", "Time to fight", "Lets end this" |

Sound cloning for overlapping rapid-fire effects.

---

## Audio

### Music (public/audio/music/)

36 wav tracks available. Current gameplay track: `Electronic Vol7 Turbo Main.wav`

Other categories: ActionFlick, HeavyElectronic, SciFiHorror, Chiptune themes.

### SFX (public/audio/sfx/)

| File | Used For |
|------|----------|
| machine-gun.wav | Machine Gun fire |
| laser.wav | Laser beam |
| lightmachinegun3.wav | Alternate gun SFX |
| triple-shot.wav | Multi-pellet weapons |
| astronomical.wav | Rocket explosion |
| comet_explosion.wav | Death explosion |

### Voice (public/audio/sfx/)

| File | Trigger |
|------|---------|
| "Here we go" | Race/match start |
| "Time to fight" | Combat voice |
| "Lets end this" | Low HP warning |

---

## Build & Config

### Dependencies

```json
{
  "@babylonjs/core": "^8.50.2",
  "@babylonjs/havok": "^1.3.11",
  "immer": "^11.1.3",
  "zustand": "^5.0.11"
}
```

### Dev Dependencies

```json
{
  "@types/node": "^25.2.2",
  "typescript": "^5.9.3",
  "vite": "^7.3.1"
}
```

### Scripts

| Script | Command |
|--------|---------|
| `npm run dev` | Vite dev server (port 5173, auto-open) |
| `npm run build` | `tsc && vite build` |
| `npm run preview` | Preview production build |

### TypeScript Config

- Target: ES2020, Module: ESNext, Bundler resolution
- Strict mode, no emit (Vite handles output)
- Path aliases: `@/*`, `@core/*`, `@game/*`, `@entities/*`, `@systems/*`, `@weapons/*`, `@characters/*`, `@ai/*`, `@powerups/*`, `@pickups/*`, `@pilots/*`

### Vite Config

- Dev server: port 5173, auto-open browser
- Build: ES2020 target, sourcemaps enabled
- Manual chunks: `babylon` (core), `babylon-havok` (physics)
- Havok excluded from pre-bundling optimization

### index.html

- Full-viewport canvas (#renderCanvas)
- Loading overlay with title text
- ES module script entry: `/src/main.ts`

---

## Application Flow

```
1. index.html loads
2. main.ts runs:
   a. Get canvas element
   b. Create GameEngine
   c. engine.initialize() — physics, camera, lighting, input, audio
   d. Hide loading overlay
   e. Show MainMenu
3. Player configures game (pilot, mode, arena, etc.)
4. Click LAUNCH:
   a. Menu hides, pointer locks
   b. engine.configureGame(config) — builds arena, applies pilot, creates systems
   c. engine.start() — begins render loop
   d. 1.5s delay: race starts (if race mode)
   e. 2.0s delay: voice line + gameplay music
5. Game loop runs at display refresh rate
6. Player dies → 3s respawn → spawn protection 3s
7. Match timer counts up to 5 minutes
```
