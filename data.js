// ============================================================
// WU LIN AWAKENING — game data
// ============================================================

const FACTIONS = [
  {
    id: "orthodox",
    name: "Orthodox",
    subtitle: "The Murim Alliance",
    color: "#C9A24B",
    desc: "Bound by honor, duty, and the greater good. The Nine Great Sects and Five Great Families hold seats. They set the rules of the Jianghu and decide what is and isn't acceptable martial conduct. Powerful, political, and not always as righteous as they claim."
  },
  {
    id: "unorthodox",
    name: "Unorthodox",
    subtitle: "The Unorthodox Alliance",
    color: "#6B6259",
    desc: "Not an organized alliance — a loose criminal underworld the Orthodox have collectively labeled as such. Assassins, bandits, rogue cultivators. They cooperate when profitable and betray each other just as readily. Some are monsters. Some are just people the Alliance decided to exclude."
  },
  {
    id: "demonic",
    name: "Heavenly Demonic Cult",
    subtitle: "The Brotherhood",
    color: "#9B2226",
    desc: "Ruthless and cold to outsiders. Unbreakable within. They have their own code — it just isn't one the Orthodox recognize. Loyalty to your cult brothers above everything. Betraying a brother is the only unforgivable sin. Everything else is permitted."
  },
  {
    id: "unaffiliated",
    name: "Unaffiliated",
    subtitle: "Wanderers of Jianghu",
    color: "#3D6B5C",
    desc: "The countless martial artists who stand outside every major power. They have no alliance, no shared code, and no leader. Some seek enlightenment. Some seek profit. Some simply refuse to kneel to any sect or cult. In a world divided by banners and loyalties, they alone are truly free — and often pay the price for it."
  }
];

const STATS = [
  { id: "str", name: "Strength", abbr: "STR", desc: "Raw physical power. Contributes to Posture pool, Block reaction, heavy weapon damage, and Steady Action recovery." },
  { id: "dex", name: "Dexterity", abbr: "DEX", desc: "Speed and precision. Determines Stance Score (10 + DEX mod), Dodge reaction, passive Posture recovery per turn, finesse weapon damage, and initiative." },
  { id: "con", name: "Constitution", abbr: "CON", desc: "Endurance and resilience. Determines Wound threshold (CON mod + 3) and contributes to Qi pool." },
  { id: "int", name: "Intelligence", abbr: "INT", desc: "Learning and theory. Adds to array and talisman damage, governs Formation mastery, and speeds martial art learning." },
  { id: "wis", name: "Wisdom", abbr: "WIS", desc: "Combat sense and perception. Sets Technique difficulty for opponents, governs Qi Sense and awareness." },
  { id: "cha", name: "Charisma", abbr: "CHA", desc: "Presence, reputation, and force of will. Social influence and sect reputation." }
];

const DERIVED_VALUES = [
  { name: "Posture", formula: "8 + STR mod + DEX mod + half Level (round up)", desc: "Absorbs incoming hits 1:1 before Wounds are dealt. Deflecting and dodging are Posture exchanges. At 0 Posture you are completely vulnerable — every hit deals Wounds directly." },
  { name: "Wounds", formula: "CON mod + 3", desc: "Persistent real injury. Does not recover automatically — requires a Pharmacist, high-grade pills, or extended rest with medical attention." },
  { name: "Stance Score", formula: "10 + DEX mod + Realm Level", desc: "Attackers must beat this with a d20 attack roll to land a hit. Higher DEX means you are harder to strike cleanly." },
  { name: "Qi Pool", formula: "STR score + DEX score + CON score", desc: "Fuels techniques and talismans. Managed through Stars." }
];

const INTERNAL_INJURIES = [
  { level: 1, name: "Meridian Strain", effect: "Disadvantage on all attacks.", recovery: "Long rest and basic medicine (Blood Dan Pills help)" },
  { level: 2, name: "Meridian Damage", effect: "Half damage on all attacks.", recovery: "Long rest and basic medicine (Blood Dan Pills help)" },
  { level: 3, name: "Meridian Rupture", effect: "Half Qi pool maximum.", recovery: "Requires a Pharmacist or high-grade pills" },
  { level: 4, name: "Meridian Collapse", effect: "Cannot use Qi or techniques at all.", recovery: "Requires a Master Pharmacist and extended rest" },
  { level: 5, name: "Death", effect: "Meridians shattered. Instant death.", recovery: "Extraordinary revival only" }
];

const RACES = [
  {
    id: "human",
    name: "Human",
    blurb: "The most common cultivator. Adaptable and versatile.",
    bonus: "+1 to all six stats",
    extra: "+2 starting Mastery Points, +1 per cultivation rank.",
    variant: {
      name: "Qi Body Variant",
      desc: "Instead of +1 to all stats, choose one elemental Qi affinity. Compatible element formations and talismans are boosted. Opposing element formations cost more and deal less.",
      elements: ["Fire", "Water", "Earth", "Metal", "Wood"]
    }
  },
  {
    id: "yaoren",
    name: "Yaoren",
    blurb: "Cultivators with Demonic Qi running through their blood. They pass as human but high-level cultivators sense something wrong.",
    bonus: "+2 to one stat, +1 to another of your choice",
    extra: "Natural Demonic Qi affinity. Demonic techniques cost 1 less Qi to activate. Orthodox sects may treat you with hostility if discovered."
  },
  {
    id: "tianren",
    name: "Tianren",
    blurb: "Heaven-touched. Yang Qi flows naturally through them.",
    bonus: "+2 to one stat, +1 to another of your choice",
    extra: "Natural Yang Qi affinity. Yang techniques cost 1 less Qi to activate. Demonic and Yin techniques cost 1 more Qi — nature resists darkness."
  },
  {
    id: "huli_jing",
    name: "Huli Jing",
    blurb: "Fox spirit descent. Enormous Qi reserves, fragile bodies.",
    bonus: "+2 Charisma, +1 Dexterity",
    penalty: "-1 Strength, -1 Constitution",
    extra: "Double Qi Pool maximum. Bearing checks at advantage when using charm or misdirection. Natural affinity for illusion-based techniques."
  },
  {
    id: "death_touched",
    name: "Death Touched",
    blurb: "Their qi is reversed and dark, touched by the underworld.",
    bonus: "+1 to all stats",
    extra: "Death Qi: whenever a creature dies within 30 feet, regain 5 Qi. All martial arts gain an additional +1 damage."
  }
];

const BACKGROUNDS = [
  { id: "orphan", name: "Orphan", skills: ["Stealth", "Survival", "Deception", "Pick Pocketing", "Awareness"], pick: 2, tool: "Thieves Tools", equipment: "Thieves Tools, tattered cloak, 5 copper taels", featureName: "Street Survivor", feature: "When reduced to 0 Posture, once per combat immediately recover DEX mod Posture as a reaction." },
  { id: "criminal", name: "Criminal", skills: ["Stealth", "Deception", "Pick Pocketing", "Intimidation", "Awareness"], pick: 2, tool: "Thieves Tools", equipment: "Thieves Tools, dark traveling cloak, 10 silver taels", featureName: "Code of the Underworld", feature: "Advantage on Persuasion and Intimidation when dealing with criminal organizations. Criminal contacts in every major city." },
  { id: "wanderer", name: "Wanderer", skills: ["Survival", "Awareness", "History", "Animal Handling", "Athletics"], pick: 2, tool: "Horse Riding", equipment: "Traveling pack, bedroll, map of the region, 5 silver taels", featureName: "Thousand Roads", feature: "Cannot be surprised while outdoors. Survival checks at advantage outside of cities." },
  { id: "soldier", name: "Soldier", skills: ["Athletics", "Intimidation", "Awareness", "Medicine", "History"], pick: 2, tool: "Martial Weapons, Horse Riding", equipment: "Iron weapon of choice, soldier's uniform, 10 silver taels", featureName: "Battle Hardened", feature: "When fighting multiple enemies simultaneously, reduce incoming Posture damage by 1 from each attacker beyond the first." },
  { id: "imperial", name: "Imperial", skills: ["History", "Persuasion", "Deception", "Performance", "Intimidation"], pick: 2, tool: "Horse Riding", equipment: "Fine silk robes, imperial seal (minor), 50 silver taels", featureName: "Blood of Heaven", feature: "Once per session, invoke your royal blood to demand an audience, safe passage, or cease of hostilities. Does not work on Heavenly Demonic Cult or Unorthodox factions." },
  { id: "entertainer", name: "Entertainer", skills: ["Performance", "Deception", "Persuasion", "Acrobatics", "Awareness"], pick: 2, tool: "Finesse Weapons", equipment: "Instrument or prop of choice, costume, 15 silver taels", featureName: "Center Stage", feature: "Once per combat, perform a distracting flourish as a free action. All enemies targeting allies must save or redirect attention to you until end of their next turn." },
  { id: "daoist", name: "Daoist", skills: ["Religion", "Shamanism", "History", "Survival", "Awareness"], pick: 2, tool: "Talisman Making", equipment: "Daoist robes, blank talisman paper x10, special ink, 5 silver taels", featureName: "Harmony of Heaven and Earth", feature: "Passively sense cultivation levels of anyone within 30 feet. Qi Sense checks made with advantage." },
  { id: "talent", name: "Talent", skills: ["History", "Shamanism", "Alchemy", "Medicine", "Awareness"], pick: 2, tool: "One of your choice", equipment: "Cultivation manual (basic), ink and brush, 10 silver taels", featureName: "Heaven's Chosen", feature: "When learning a new martial art, add INT mod + WIS mod to the learning roll. Gain an extra star in every realm." },
  { id: "merchant", name: "Merchant", skills: ["Persuasion", "Deception", "History", "Awareness", "Intimidation"], pick: 2, tool: "Horse Riding", equipment: "Merchant scales, trade goods worth 30 silver taels, horse", featureName: "Silver Tongue", feature: "Advantage on Persuasion involving money, trade, or negotiation. Always know the approximate value of any item, pill, or weapon." },
  { id: "physician", name: "Physician", skills: ["Medicine", "Alchemy", "Awareness", "Persuasion", "History"], pick: 2, tool: "Herbalism", equipment: "Physician's kit, herbalism tools, 5 Blood Dan Pills, 10 silver taels", featureName: "Healing Hands", feature: "Out of combat Medicine checks at advantage. Once per short rest, stabilize a Wounded ally without materials through meridian work." },
  { id: "farmer", name: "Farmer / Peasant", skills: ["Survival", "Athletics", "Animal Handling", "Awareness", "Medicine"], pick: 2, tool: "Simple Weapons", equipment: "Iron tool weapon, farming clothes, 3 silver taels", featureName: "Iron Will", feature: "When Posture breaks, you have one turn of reduced defense before becoming completely vulnerable. Hard life built something unbreakable." },
  { id: "scholar", name: "Scholar", skills: ["History", "Shamanism", "Medicine", "Alchemy", "Awareness"], pick: 2, tool: "Talisman Making", equipment: "Blank talisman paper x5, scholarly robes, ink and brush, 10 silver taels", featureName: "Living Library", feature: "Once per session, recall obscure knowledge about any sect, technique, formation, or historical event on a History check. Shamanism and History checks at advantage." },
  { id: "fallen_noble", name: "Fallen Noble", skills: ["History", "Persuasion", "Intimidation", "Performance", "Deception"], pick: 2, tool: "Martial Weapons", equipment: "Tattered noble robes, family signet ring, 20 silver taels", featureName: "Ghost of Former Glory", feature: "Once per session, invoke your family name to gain access to noble circles, safe lodging, or information. Those who know your family's fall may use it against you." },
  { id: "sect_dropout", name: "Sect Dropout", skills: ["Athletics", "Awareness", "Stealth", "History", "Acrobatics"], pick: 2, tool: "Martial Weapons", equipment: "Worn sect robes, hidden technique scroll, 5 silver taels", featureName: "Forbidden Knowledge", feature: "Begin with one technique from your former sect you were not supposed to learn yet. Using it openly risks recognition by former members." },
  { id: "blacksmith", name: "Blacksmith", skills: ["Athletics", "Crafting", "History", "Intimidation", "Awareness"], pick: 2, tool: "Blacksmithing", equipment: "Blacksmithing tools, iron weapon of choice, 15 silver taels", featureName: "Forged in Fire", feature: "Identify weapon quality tier, material, and flaws on sight. +1 to attack rolls with weapons you personally crafted." },
  { id: "hunter", name: "Hunter", skills: ["Survival", "Stealth", "Awareness", "Animal Handling", "Athletics"], pick: 2, tool: "Simple Weapons, Horse Riding", equipment: "Iron bow, quiver x20 arrows, hunting gear, 10 silver taels", featureName: "Predator's Eye", feature: "Cannot be ambushed while outdoors. First ambush attack automatically counts as Concealed regardless of weapon type." },
  { id: "slave", name: "Slave / Servant", skills: ["Stealth", "Deception", "Persuasion", "Awareness", "Pick Pocketing"], pick: 2, tool: "Thieves Tools", equipment: "Plain servant clothes, hidden iron knife, 2 silver taels", featureName: "Invisible", feature: "Advantage on Stealth checks in populated areas. Once per session, slip away from a dangerous situation without being noticed." }
];

const RANKS = [
  { level: 1, name: "Third Rate", xp: 0, age: "teen years", desc: "You can fight. Qi stirs but is unrefined. Common disciples and low-level warriors sit here their whole lives.", unlock: "Basic Qi Accumulation, Empowered Strike" },
  { level: 2, name: "Second Rate", xp: 300, age: "early 20s", desc: "You have grasped the basics of internal energy. Dangerous. A hundred common men could not take you.", unlock: "+2 Mastery Stars, +1 Skill Point" },
  { level: 3, name: "First Rate", xp: 900, age: "25-30", desc: "Your foundation is complete. Qi shapes your strikes. You are acknowledged as a true martial artist.", unlock: "+2 Mastery Stars, +1 Skill Point, +2 Stat Points" },
  { level: 4, name: "Ascendant — Entry", xp: 2700, age: "early 30s", desc: "You have left the common path. Others feel your presence before they see you. The world responds differently.", unlock: "+2 Mastery Stars, +1 Skill Point" },
  { level: 5, name: "Ascendant — Proficient", xp: 6500, age: "late 30s", desc: "Weapon Qi awakens.", unlock: "Weapon Qi (cover weapon in Qi: +1 damage, 3 Qi cost), +2 Mastery Stars, +1 Skill Point" },
  { level: 6, name: "Ascendant — Peak", xp: 14000, age: "40-50", desc: "Your foundation reaches its limit.", unlock: "+2 Mastery Stars, +1 Skill Point, +2 Stat Points" },
  { level: 7, name: "Transcendent — Entry", xp: 23000, age: "50s", desc: "Combat intuition borders on the supernatural. You can sense intent before attacks land.", unlock: "+2 Mastery Stars, +1 Skill Point" },
  { level: 8, name: "Transcendent — Proficient", xp: 34000, age: "60s", desc: "Enhanced Weapon Qi awakens.", unlock: "Enhanced Weapon Qi (+2 damage, 5 Qi cost), +2 Mastery Stars, +1 Skill Point" },
  { level: 9, name: "Transcendent — Peak", xp: 48000, age: "70s", desc: "Legends are written about Transcendents. Fewer than a hundred exist in the known world at any time.", unlock: "+2 Mastery Stars, +1 Skill Point, +2 Stat Points" },
  { level: 10, name: "Grandmaster — Entry", xp: 64000, age: "80-90", desc: "A rare level to reach.", unlock: "Qi Force, +3 Mastery Stars, +2 Skill Point" },
  { level: 11, name: "Grandmaster — Proficient", xp: 85000, age: "100s", desc: "Your mastery deepens further still.", unlock: "+3 Mastery Stars, +2 Skill Point" },
  { level: 12, name: "Grandmaster — Peak", xp: 100000, age: "150", desc: "The summit of mortal cultivation.", unlock: "+3 Mastery Stars, +2 Skill Point, +2 Stat Points" },
  { level: 13, name: "Immortal", xp: 250000, age: "300+", desc: "Centuries of cultivation. Near-impossible without resources.", unlock: "True Qi, +4 Mastery Stars, +3 Skill Point" },
  { level: 14, name: "Nature Realm", xp: null, age: "—", desc: "Requires Blood of all Four Divine Beasts + Immortal Peach.", unlock: "Will, +4 Mastery Stars, +3 Skill Point, Remove Stat limit" },
  { level: 15, name: "Void Realm", xp: null, age: "—", desc: "True comprehension of the Dao. No resource can substitute — the universe itself must acknowledge your understanding.", unlock: "True Dao, +5 Mastery Stars, +3 Skill Point, +4 Stat Points" }
];

const MASTERY_RANKS = [
  { name: "Untrained", bonus: 0, desc: "No training, standard rolls" },
  { name: "Disciple", bonus: 1, desc: "Basic training" },
  { name: "Adept", bonus: 2, desc: "Practiced" },
  { name: "Expert", bonus: 3, desc: "Seasoned" },
  { name: "Master", bonus: 4, desc: "Peak human" },
  { name: "Grandmaster", bonus: 5, desc: "Legendary" }
];

const SKILLS = [
  { name: "Acrobatics", desc: "Performing agile movements, balancing, dodging, tumbling, and maintaining control of your body." },
  { name: "Alchemy", desc: "Identifying, and using potions, pills, poisons, medicines, and other crafted substances." },
  { name: "Animal Handling", desc: "Calming, training, understanding, and controlling animals or beasts." },
  { name: "Athletics", desc: "Raw physical ability: climbing, swimming, jumping, lifting, grappling, and feats of strength." },
  { name: "Awareness", desc: "Noticing details through your senses, spotting hidden things, and detecting danger or unusual activity." },
  { name: "Deception", desc: "Lying, disguising intentions, creating false stories, and misleading others." },
  { name: "History", desc: "Knowledge of past events, legends, cultures, factions, wars, and important figures." },
  { name: "Intimidation", desc: "Using threats, presence, fear, or force of personality to influence others." },
  { name: "Medicine", desc: "Treating injuries, diagnosing conditions, understanding the body, and providing care." },
  { name: "Performance", desc: "Entertaining, inspiring, storytelling, music, acting, or displaying a skill publicly." },
  { name: "Persuasion", desc: "Convincing others through charm, logic, negotiation, or diplomacy." },
  { name: "Quick Hands", desc: "Fast and precise hand movements: pickpocketing, sleight of hand, hidden actions, and manipulating objects." },
  { name: "Religion", desc: "Understanding faiths, spiritual traditions, divine beings, rituals, and religious knowledge." },
  { name: "Shamanism", desc: "Knowledge of spirits, performing rituals, using spiritual practices, and understanding supernatural forces. Also governs knowledge of arrays and talismans." },
  { name: "Stealth", desc: "Moving silently, hiding, avoiding detection, and remaining unseen." },
  { name: "Survival", desc: "Finding food, navigating, tracking, enduring harsh environments, and living off the land." }
];

const WEAPON_CATEGORIES = [
  { name: "Simple Weapons", desc: "Basic weapons that require little training and can be used effectively by almost anyone." },
  { name: "Martial Weapons", desc: "Advanced weapons that require proper training, technique, and combat skill to use well." },
  { name: "Heavy Weapons", desc: "Large, powerful weapons that rely on strength, momentum, and force but are harder to wield quickly." },
  { name: "Finesse Weapons", desc: "Lightweight, precise weapons that rely on speed, accuracy, and technique rather than raw strength." },
  { name: "Concealed Weapons", desc: "Small or hidden weapons designed for surprise attacks, stealth, and catching opponents off guard." }
];

// ============================================================
// CLASSES & SKILL TREES
// Each tree node: id, name, tier (depth), col (lane position), prereq (array of ids), desc, prereqLabel
// Coordinates are computed by tier(row)/col(column) — layout engine spaces them.
// ============================================================

const CLASSES = [
  {
    id: "general",
    name: "General",
    color: "#8A8270",
    requirement: "No requirements",
    flavor: "Anyone can take these features so long they meet the acquisition requirements.",
    equipment: [],
    proficiencies: [],
    tree: [
      { id: "g_qisense", name: "Qi Sensing", tier: 0, col: 2, prereq: [], prereqLabel: "None", desc: "Detect lower cultivation levels of those within 30 feet. Passive." },
      { id: "g_ironbody", name: "Iron Body Training", tier: 1, col: 2, prereq: ["g_qisense"], prereqLabel: "First Rate", desc: "Reduce incoming Posture damage by 1 from unarmed strikes and light weapons." },
      { id: "g_meridian", name: "Meridian Expansion", tier: 2, col: 1, prereq: ["g_ironbody"], prereqLabel: "Ascendant Entry", desc: "+3 to Qi Pool maximum. Can be taken twice.", repeatable: true },
      { id: "g_prescience", name: "Combat Prescience", tier: 2, col: 3, prereq: ["g_ironbody"], prereqLabel: "Transcendent Entry", desc: "Once per combat, automatically succeed on one Dodge or Block reaction without spending your reaction." },
      { id: "g_pressure", name: "Realm Pressure", tier: 3, col: 2, prereq: ["g_meridian", "g_prescience"], prereqLabel: "Grandmaster Entry", desc: "Your presence suppresses enemies two realms below you. They take -2 to all attack rolls while within 30 feet." }
    ]
  },
  {
    id: "assassin",
    name: "Assassin",
    color: "#5A1F22",
    requirement: "Dexterity 12+",
    flavor: "Quick, precise martial artists, ranging from shinobi to swift swordsmen.",
    equipment: ["Concealed weapon of choice or 48 needles", "2 Daggers or Shortsword", "Reinforced Silk Robes", "5 Blood Dan Pills", "3 Blood Boosting Pills", "Death Warding Talisman"],
    proficiencies: ["Pick 2: Acrobatics, Awareness, Deception, Stealth, Performance or Pick Pocketing", "Adept: Thieves tools, Light Armor, Concealed weapons, Finesse weapons"],
    tree: [
      { id: "a_sneak0", name: "Sneak Attack", tier: 0, col: 2, prereq: [], prereqLabel: "Concealed weapon", desc: "On Critical Success with a concealed weapon, deal 1 bonus Wound damage." },
      { id: "a_sneak1", name: "Sneak Attack I", tier: 1, col: 2, prereq: ["a_sneak0"], prereqLabel: "Sneak Attack", desc: "Sneak attack triggers when the enemy isn't paying attention." },
      { id: "a_sneak2", name: "Sneak Attack II", tier: 2, col: 2, prereq: ["a_sneak1"], prereqLabel: "Sneak Attack I", desc: "On Success with a concealed weapon, deal 1 bonus Wound damage. On a Critical Success, deal 2 bonus Wounds." },
      { id: "a_cunning", name: "Cunning Action", tier: 3, col: 0, prereq: ["a_sneak2"], prereqLabel: "Sneak Attack II", desc: "Dash, Disengage, or Hide as a free action once per turn." },
      { id: "a_swash", name: "Swashbuckler", tier: 3, col: 1, prereq: ["a_sneak2"], prereqLabel: "Sneak Attack II", desc: "Feint as part of your attack. Gain +3 to the follow-up attack roll. Costs 1 action to feint, 1 to strike." },
      { id: "a_exec", name: "Executioner", tier: 3, col: 2, prereq: ["a_sneak2"], prereqLabel: "Sneak Attack II", desc: "When a target hits 0 Posture, make an attack as a Reaction with Sneak Attack bonus. Does not require a Concealed weapon." },
      { id: "a_cheat", name: "Cheat", tier: 3, col: 3, prereq: ["a_sneak2"], prereqLabel: "Sneak Attack II", desc: "When a target is engaged with an ally, any weapon may trigger Sneak Attack. Concealed weapon requirement ignored." },
      { id: "a_smoke", name: "Smoke Bomb", tier: 3, col: 4, prereq: ["a_sneak2"], prereqLabel: "Sneak Attack II", desc: "Spend 1 action to deploy a smoke bomb. Choose one: become Hidden, make an immediate Sneak Attack, or force nearby enemies to treat you as Concealed until your next turn." },
      { id: "a_death", name: "Death Blow", tier: 4, col: 2, prereq: ["a_exec"], prereqLabel: "Executioner", desc: "Against targets at 0 Posture: +1 Wound on all attacks. Sneak Attack deals 1 additional Wound." },
      { id: "a_underhand", name: "Underhanded Throw", tier: 4, col: 3, prereq: ["a_cheat"], prereqLabel: "Cheat", desc: "When throwing at an enemy engaged with an ally, +2 to attack roll." },
      { id: "a_opportunist", name: "Opportunist", tier: 5, col: 3, prereq: ["a_cheat"], prereqLabel: "Cheat", desc: "Once per round, when an ally damages a target within thrown weapon range, immediately make a thrown attack as a Reaction." },
      { id: "a_shadow", name: "Shadow Strike", tier: 4, col: 4, prereq: ["a_smoke"], prereqLabel: "Smoke Bomb", desc: "After deploying smoke, move up to your speed before making the Sneak Attack. Movement does not provoke reactions." },
      { id: "a_vanish", name: "Vanishing Act", tier: 5, col: 4, prereq: ["a_shadow"], prereqLabel: "Shadow Strike", desc: "After a Sneak Attack, immediately Hide as a free action." },
      { id: "a_sneak3", name: "Sneak Attack III", tier: 4, col: 1, prereq: ["a_swash"], prereqLabel: "Sneak Attack II, Ascendant Peak", desc: "Once per turn, spend 1 action to make a concealed follow-up after a regular attack triggering sneak attack. Deals 1 less Wound than normal Sneak Attack. Free if the original attack was a Critical Success." },
      { id: "a_sneak4", name: "Sneak Attack IV", tier: 5, col: 1, prereq: ["a_sneak3"], prereqLabel: "Sneak Attack III", desc: "On Success: 2 bonus Wounds. On Critical Success: 3 bonus Wounds." }
    ]
  },
  {
    id: "martial_artist",
    name: "Martial Artist",
    color: "#7A3B14",
    requirement: "Strength 12+",
    flavor: "Disciplined, strong and resilient, ranging from swift swordsmen to powerful axe men.",
    equipment: ["Martial weapon of choice or Heavy weapon of choice", "Reinforced Leather Armor or Reinforced Silk Robes", "5 Blood Dan Pills", "3 Blood Boosting Pills", "Death Warding Talisman"],
    proficiencies: ["Pick 2: Acrobatics, Athletics, Awareness, Intimidation, History or Religion", "Pick 4 Adept: Light/Medium/Heavy Armor, Martial/Simple/Heavy/Finesse Weapons"],
    tree: [
      { id: "m_flow0", name: "Flowstate", tier: 0, col: 2, prereq: [], prereqLabel: "None", desc: "1 action to activate. While active: +2 DMG, +2 Posture recovery/turn, advantage on STR checks. Breaks on Posture break, stun, or ending turn out of combat. Lasts 1 minute. 2 uses/long rest (3 at Ascendant Proficient, 4 at Grandmaster Entry)." },
      { id: "m_flow1", name: "Flowstate I", tier: 1, col: 2, prereq: ["m_flow0"], prereqLabel: "Flowstate", desc: "+3 DMG, +3 Posture recovery. Reduce incoming Wound damage by 1 once per turn." },
      { id: "m_flow2", name: "Flowstate II", tier: 2, col: 2, prereq: ["m_flow1"], prereqLabel: "Flowstate I", desc: "+4 DMG, +4 Posture recovery. Posture no longer breaks from a single hit." },
      { id: "m_action", name: "Action Surge", tier: 3, col: 0, prereq: ["m_flow2"], prereqLabel: "Flowstate II", desc: "Once per Flowstate, gain 1 additional action on your turn. Making an attack with this action has no penalty. Cannot trigger another Flowstate or Action Surge." },
      { id: "m_bloodlust", name: "Bloodlust", tier: 3, col: 1, prereq: ["m_flow2"], prereqLabel: "Flowstate II", desc: "Each consecutive hit on the same target adds +1 damage, stacking up to +3. Lose 1 Posture per turn — you stop defending entirely." },
      { id: "m_diamond", name: "Diamond Skin", tier: 3, col: 2, prereq: ["m_flow2"], prereqLabel: "Flowstate II", desc: "Reduce all incoming Posture damage by STR mod while Flowstate is active. Cannot be moved, knocked back, or tripped during Flowstate." },
      { id: "m_footwork", name: "Flowing Footwork", tier: 3, col: 3, prereq: ["m_flow2"], prereqLabel: "Flowstate II", desc: "Move freely through the battlefield without provoking opportunity attacks." },
      { id: "m_reckless", name: "Reckless Strike", tier: 4, col: 1, prereq: ["m_bloodlust"], prereqLabel: "Bloodlust", desc: "Make an attack with a +5 bonus to the attack roll, but enemies have a +5 bonus when attacking you." },
      { id: "m_unstoppable", name: "Unstoppable", tier: 5, col: 1, prereq: ["m_reckless"], prereqLabel: "Reckless Strike", desc: "When Posture would break, instead remain at 1 Posture once per Flowstate. +2 DMG for every Wound you have taken." },
      { id: "m_unbreakable", name: "Unbreakable", tier: 4, col: 2, prereq: ["m_diamond"], prereqLabel: "Diamond Skin", desc: "Once per Flowstate, when you would take Wounds, reduce them to 0. Posture recovery doubled for one turn after blocking a heavy attack." },
      { id: "m_multi", name: "Multi Attack", tier: 4, col: 3, prereq: ["m_footwork"], prereqLabel: "Flowstate II (req. Dodge)", desc: "While Flowstate is active, make 2 regular attacks per attack action. Each attack rolls separately." },
      { id: "m_swift", name: "Swift Strike", tier: 5, col: 3, prereq: ["m_multi"], prereqLabel: "Multi Attack", desc: "Once per turn, during Flowstate, reduce the action cost of a Martial Technique by 1. If reduced to 0, execute 1 Technique for free." },
      { id: "m_flow3", name: "Flowstate III", tier: 4, col: 4, prereq: ["m_flow2"], prereqLabel: "Flowstate II, Ascendant Peak", desc: "+5 DMG, +5 Posture recovery. Wounds received during Flowstate reduced by 1. Shockwaves push enemies back 5 feet." },
      { id: "m_flow4", name: "Flowstate IV", tier: 5, col: 4, prereq: ["m_flow3"], prereqLabel: "Flowstate III, Grandmaster Peak", desc: "+6 DMG, +6 Posture recovery. Wounds reduced by 2 during Flowstate. Enemies one realm below take -2 to attack rolls in your presence." }
    ]
  },
  {
    id: "monk",
    name: "Monk",
    color: "#3D6B5C",
    requirement: "Strength 10+, Dexterity 12+",
    flavor: "One with their body, containing an unbreakable bond with their spirit.",
    equipment: ["Gauntlet or Bo-Staff", "Reinforced Leather Armor or Reinforced Silk Robes", "5 Blood Dan Pills", "3 Blood Boosting Pills", "Death Warding Talisman"],
    proficiencies: ["Pick 2: Acrobatics, Athletics, Awareness, Shamanism, History or Religion", "Adept: Light armor, Simple weapons, Finesse weapons"],
    note: "Focus Points: WIS modifier as maximum focus points (minimum 1).",
    tree: [
      { id: "k_conv0", name: "Convergence", tier: 0, col: 2, prereq: [], prereqLabel: "None", desc: "Whenever you land an impact attack, expend 1 focus point to unleash a burst of qi piercing defenses, dealing 1 impact wound. On a crit, 2 wounds and stun." },
      { id: "k_conv1", name: "Convergence I", tier: 1, col: 2, prereq: ["k_conv0"], prereqLabel: "Convergence", desc: "Add WIS modifier to Stance and gain Yang, Yin, or Demonic Qi on convergent attacks (Yang: Radiant, Yin: Frozen, Demonic: Corrosion)." },
      { id: "k_conv2", name: "Convergence II", tier: 2, col: 2, prereq: ["k_conv1"], prereqLabel: "Convergence I", desc: "+1 damage on the regular attack and gain advantage on STR saves on breaking stance." },
      { id: "k_sturdy", name: "Sturdy Strike", tier: 3, col: 0, prereq: ["k_conv2"], prereqLabel: "Convergence II", desc: "Sacrifice 2 posture to get a +2 bonus to the attack roll." },
      { id: "k_cstrike", name: "Convergent Strike", tier: 3, col: 1, prereq: ["k_conv2"], prereqLabel: "Convergence II", desc: "In an extremely stable stance, strike enemies 5 feet behind and deal half damage to their posture. Wound damage bonus doesn't go through." },
      { id: "k_tcstrike", name: "True Convergent Strike", tier: 4, col: 1, prereq: ["k_cstrike"], prereqLabel: "Convergent Strike", desc: "Strike enemies 10 feet behind and deal full damage to their posture. Wound damage bonus doesn't go through." },
      { id: "k_cwave", name: "Convergent Wave", tier: 5, col: 1, prereq: ["k_tcstrike"], prereqLabel: "Convergent Strike", desc: "Unleash a wave of energy through a cone of enemies within 15 feet, half damage to their posture. Wound damage bonus doesn't go through." },
      { id: "k_axiom", name: "Axiom", tier: 3, col: 2, prereq: ["k_conv2"], prereqLabel: "Convergence II", desc: "If you successfully trigger 3 Convergences in 1 turn, gain another action and recover 1 focus point." },
      { id: "k_dual", name: "Dual Convergence", tier: 4, col: 2, prereq: ["k_axiom"], prereqLabel: "Axiom", desc: "When you take 2 attack actions, unleash 2 impact attacks with no penalties, both eligible for Convergence." },
      { id: "k_triple", name: "Triple Convergence", tier: 5, col: 2, prereq: ["k_dual"], prereqLabel: "Dual Convergence, Grandmaster Peak", desc: "When you take 3 attack actions, unleash 3 impact attacks with no penalties, all eligible for Convergence." },
      { id: "k_soul", name: "Soul Shattering Combo", tier: 4, col: 3, prereq: ["k_axiom"], prereqLabel: "Axiom", desc: "Successfully triggering Axiom also boosts the next Convergence by +1 wound." },
      { id: "k_focus", name: "Focus", tier: 3, col: 4, prereq: ["k_conv2"], prereqLabel: "Convergence II", desc: "Expand your maximum focus by an extra focus point." },
      { id: "k_efocus", name: "Enhanced Focus", tier: 4, col: 4, prereq: ["k_focus"], prereqLabel: "Focus", desc: "Regain a focus point whenever you land a critical hit." },
      { id: "k_pfocus", name: "Precision Focus", tier: 5, col: 4, prereq: ["k_efocus"], prereqLabel: "Enhanced Focus", desc: "Gain an extra focus point whenever you gain a focus point back." },
      { id: "k_conv3", name: "Convergence III", tier: 3, col: 5, prereq: ["k_conv2"], prereqLabel: "Convergence II, Transcendent", desc: "+1 Wound damage and gain resistance from your chosen Qi type (Radiant/Frozen/Corrosion)." },
      { id: "k_conv4", name: "Convergence of Qi IV", tier: 4, col: 5, prereq: ["k_conv3"], prereqLabel: "Convergence III, Grandmaster", desc: "+2 damage on the regular attack and gain advantage on STR saves on breaking stance." }
    ]
  },
  {
    id: "pharmacist",
    name: "Pharmacist",
    color: "#6B8E4E",
    requirement: "Dexterity 12+, Intelligence 10+",
    flavor: "Experts in medicine and compositions of them as well as poisons. They use this knowledge in combat to make it hell to fight.",
    equipment: ["Shortsword or Claw Gauntlet", "Reinforced Silk Robes", "Alchemy Furnace", "30 needles", "5 Blood Dan Pills", "3 Blood Boosting Pills", "Death Warding Talisman"],
    proficiencies: ["Pick 2: History, Medicine, Quick Hands, Religion or Survival", "Adept: Simple Finesse weapons, light armor"],
    tree: [
      { id: "p_acu0", name: "Acupuncture", tier: 0, col: 2, prereq: [], prereqLabel: "None", desc: "Choose to heal or attack an acupuncture point. Melee, advantage on allies. Crit Dmg: target recovers 2 less posture. Dmg: Dazed, -1 next attack. Heal: healing effect 2 turns. Crit Heal: target gains 1 wound instantly." },
      { id: "p_acu1", name: "Acupuncture I", tier: 1, col: 2, prereq: ["p_acu0"], prereqLabel: "Acupuncture", desc: "Range increases to 10 feet. Crit Dmg: Dazed -2 next turn. Crit Heal: removes a level of internal injuries." },
      { id: "p_acu2", name: "Acupuncture II", tier: 2, col: 2, prereq: ["p_acu1"], prereqLabel: "Acupuncture I", desc: "Range increases to 30 feet. Crit Dmg: enemy loses an action on their turn. Crit Heal: stabilize creatures from death." },
      { id: "p_flying", name: "Flying Needle", tier: 3, col: 0, prereq: ["p_acu2"], prereqLabel: "Acupuncture II", desc: "Use concealed needles; on a critical success, deal 1 thrusting wound." },
      { id: "p_poison", name: "Poison Qi", tier: 3, col: 1, prereq: ["p_acu2"], prereqLabel: "Acupuncture II", desc: "Unleash poison stored in your dantian as healing or poison effects in melee range. Medicinal: heal an ally's wound per turn of contact. Poisonous: 1 Poison damage per melee attack." },
      { id: "p_poisonaura", name: "Poison Qi Aura", tier: 4, col: 1, prereq: ["p_poison"], prereqLabel: "Poison Qi", desc: "Poison Qi can be imbued into needles and concealed weapons. If the needle remains embedded, effects persist." },
      { id: "p_truepoison", name: "True Poison Qi", tier: 5, col: 1, prereq: ["p_poisonaura"], prereqLabel: "Poison Qi Aura, 1 of the 10 legendary poisons", desc: "Poison qi aura takes shape and inflicts regular damage on top of the new poison damage." },
      { id: "p_stim", name: "Qi Stimulation", tier: 3, col: 2, prereq: ["p_acu2"], prereqLabel: "Acupuncture II", desc: "Target gains +2 to next attack roll and recovers DEX mod Posture immediately. If used more than CON mod times per day, causes 1 Internal Injury from meridian strain." },
      { id: "p_surge", name: "Surge", tier: 4, col: 2, prereq: ["p_stim"], prereqLabel: "Qi Injection", desc: "Push an ally beyond their limits: 1 additional action next turn and +3 attack roll for 2 turns. Once per short rest." },
      { id: "p_overdrive", name: "Overdrive", tier: 5, col: 2, prereq: ["p_surge"], prereqLabel: "Surge, Transcendent Entry", desc: "Force a cultivator into a temporary peak state for 3 turns: all stats +2. Afterwards gain a level of exhaustion. Once per long rest." },
      { id: "p_pill", name: "Pill Crafting", tier: 3, col: 3, prereq: ["p_acu2"], prereqLabel: "Acupuncture II", desc: "Refine pills during a Long Rest. Know INT mod pill formulas; refine INT mod pills per long rest. Pill rank depends on cultivation realm and materials." },
      { id: "p_pillmaster", name: "Pill Master", tier: 4, col: 3, prereq: ["p_pill"], prereqLabel: "Pill Crafting", desc: "Automatically identify pills, poisons, herbs, ingredients. Pill effects increased by INT mod. May improve a pill one rank higher during downtime." },
      { id: "p_dantian", name: "Dantian Furnace", tier: 5, col: 3, prereq: ["p_pillmaster"], prereqLabel: "Pill Master, Grandmaster Entry", desc: "Store a furnace in your dantian; craft 1 pill per day, immune to theft/damage. Release a stored pill onto a needle when attacking or healing." },
      { id: "p_acu3", name: "Acupuncture III", tier: 3, col: 4, prereq: ["p_acu2"], prereqLabel: "Acupuncture II, Ascendant", desc: "Crit Dmg: 1 level of Internal Injury. Dmg: inflict 1 thrusting wound. Success: heal 1 wound instantly. Crit Success: full Internal Injury removal." },
      { id: "p_acu4", name: "Acupuncture IV", tier: 4, col: 4, prereq: ["p_acu3"], prereqLabel: "Acupuncture III, Transcendent", desc: "Target 2 creatures when treating or attacking with one action, no penalty." },
      { id: "p_death", name: "Death Point", tier: 5, col: 4, prereq: ["p_acu4"], prereqLabel: "Acupuncture IV, Grandmaster Peak", desc: "Target the Death acupoint, forcing a CON save vs your attack roll as DC. On success, immediate posture break; otherwise 10 wounds of damage." }
    ]
  },
  {
    id: "shaman",
    name: "Shaman",
    color: "#4A3B6B",
    requirement: "Intelligence 12+, Wisdom 10+",
    flavor: "Experts in taoist magic, utilizing talismans, hand signs, and spirit pacts.",
    equipment: ["Shortsword or Claw Gauntlet", "Reinforced Silk Robes", "Alchemy Furnace", "30 needles", "5 Blood Dan Pills", "3 Blood Boosting Pills", "Death Warding Talisman"],
    proficiencies: ["Pick 2: History, Medicine, Quick Hands, Religion or Shamanism", "Adept: Simple Finesse weapons, light armor"],
    tree: [
      { id: "s_newmoon", name: "Shamanism — New Moon", tier: 0, col: 2, prereq: [], prereqLabel: "None", desc: "Obtain New Moon level spells, rituals and talismans. Gain Lunar Eyes — see spirits and their strength if weaker than you." },
      { id: "s_waxing", name: "Shamanism — Waxing Crescent", tier: 1, col: 2, prereq: ["s_newmoon"], prereqLabel: "New Moon Shamanism", desc: "Obtain Waxing Crescent level spells, rituals and talismans." },
      { id: "s_fullmoon", name: "Shamanism — Full Moon", tier: 4, col: 2, prereq: ["s_waxing"], prereqLabel: "Waxing Crescent Shamanism", desc: "Obtain Full Moon level spells, rituals and talismans." },
      { id: "s_waning", name: "Shamanism — Waning Crescent", tier: 5, col: 2, prereq: ["s_fullmoon"], prereqLabel: "Full Moon Shamanism", desc: "Obtain Waning Crescent level spells, rituals and talismans." },
      { id: "s_jing", name: "Jing Essence", tier: 2, col: 0, prereq: ["s_waxing"], prereqLabel: "Waxing Crescent Shamanism", desc: "Learn INT mod Jing spells without counting against your known spell list. Casting a Jing spell grants temporary vitality tanking INT mod wounds." },
      { id: "s_jingbody", name: "Jing Body", tier: 3, col: 0, prereq: ["s_jing"], prereqLabel: "Jing Essence", desc: "Each Jing spell cast regains 1 wound or 1 posture. Healing spells on yourself are doubled." },
      { id: "s_eternaljing", name: "Eternal Jing", tier: 4, col: 0, prereq: ["s_jingbody"], prereqLabel: "Jing Body", desc: "Every round, gain temporary vitality tanking INT mod wounds. Once per long rest, an ally who would fall unconscious instead recovers INT mod wounds and keeps fighting." },
      { id: "s_shenfusion", name: "Shen Fusion", tier: 2, col: 1, prereq: ["s_waxing"], prereqLabel: "Waxing Crescent Shamanism", desc: "Unify with your familiar spirit for 1 minute, taking their STR/CON/DEX and abilities, HP and Posture pools. Overflow damage applies to you at the spirit's max wounds. INT mod uses per long rest. WIS DC 15 to resist possession with another spirit." },
      { id: "s_shenunif", name: "Shen Unification", tier: 3, col: 1, prereq: ["s_shenfusion"], prereqLabel: "Shen Fusion", desc: "When unifying, retain 2 separate bodies sharing senses, communicating telepathically. Perform attacks through them by command." },
      { id: "s_celestial", name: "Celestial Shen", tier: 4, col: 1, prereq: ["s_shenunif"], prereqLabel: "Shen Unification", desc: "Unifying turns you into the spirit itself, gaining its features and new stats/health equal to yours. Overflow damage applies to you at max wounds." },
      { id: "s_forbidden", name: "Forbidden Shen", tier: 2, col: 3, prereq: ["s_waxing"], prereqLabel: "Waxing Crescent Shamanism", desc: "Learn up to INT mod Death Taoist Arts instead of regular Taoist arts, not counting against techniques known. Obtain Death Qi in your dantian instead of life qi." },
      { id: "s_yama", name: "Spirit of Yama", tier: 3, col: 3, prereq: ["s_forbidden"], prereqLabel: "Forbidden Shen, Grandmaster Entry or Death Qi Core", desc: "Turn any slain creature into your undead familiar using death qi, no sacrificial rituals needed. At max familiars, they become Jiangshi." },
      { id: "s_taoharmony", name: "Tao Harmony", tier: 2, col: 4, prereq: ["s_waxing"], prereqLabel: "Waxing Crescent Shamanism", desc: "Whenever you cast a Wuxing spell, add your INT mod to the damage of the spell." },
      { id: "s_taomastery", name: "Tao Mastery", tier: 3, col: 4, prereq: ["s_taoharmony"], prereqLabel: "Tao Harmony", desc: "Obtain Divine Lightning that always deals one lightning wound — a substitute for all wuxing elements." },
      { id: "s_taosage", name: "Tao Sage", tier: 4, col: 4, prereq: ["s_taomastery"], prereqLabel: "Tao Mastery", desc: "All attacks you make occur invisibly but can be spotted using Lunar Eyes." }
    ]
  }
];

// Mythical treasures / lore for Nature Realm
const MYTHICAL_TREASURES = [
  { name: "Blood of the Azure Dragon", dir: "East", essence: "Wood essence, spring vitality" },
  { name: "Blood of the Vermilion Bird", dir: "South", essence: "Fire essence, summer radiance" },
  { name: "Blood of the White Tiger", dir: "West", essence: "Metal essence, autumn sharpness" },
  { name: "Blood of the Black Tortoise", dir: "North", essence: "Water essence, winter endurance" },
  { name: "The Immortal Peach", dir: "Center", essence: "Earth essence, bridge to immortality" }
];

const TECHNIQUE_RULES = {
  roll: "d20 + relevant mod vs enemy Stance",
  outcomes: [
    { result: "Critical Success", effect: "Double damage." },
    { result: "Success", effect: "Normal damage." },
    { result: "Failure", effect: "Technique fails." },
    { result: "Critical Failure", effect: "Technique fails and doubles Posture cost." }
  ],
  map: "-5 on second attack action, -10 on third attack action (Multiple Attack Penalty). Some techniques and features reduce or ignore MAP."
};
