import rawGameData from "@hefty-studios/arena-game-data";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

type UnknownRecord = Record<string, unknown>;

type AssetRef = {
  id: string;
  type: string;
  slug: string;
  pathHint?: string;
};

type RawClass = {
  id: string;
  type: "class";
  name: string;
  displayName: string;
  slug: string;
  description: string;
  icon: UnknownRecord | null;
  stats: UnknownRecord;
  secondaryResource: UnknownRecord | null;
  specialisations: AssetRef[];
};

type RawSpecialisation = {
  id: string;
  type: "specialisation";
  name: string;
  displayName: string;
  slug: string;
  description: string;
  role: string;
  icon: UnknownRecord | null;
  abilityPoolAccesses: {
    pool: AssetRef;
    totalPoints: number;
    unlockRequirements: UnknownRecord;
  }[];
};

type RawAbilityPool = {
  id: string;
  type: "abilityPool";
  name: string;
  displayName: string;
  slug: string;
  description: string;
  icon: UnknownRecord | null;
  tag?: {
    raw: number;
    name: string;
  };
  entries: {
    kind: string;
    asset: AssetRef;
  }[];
};

type RawAbilityEffectRef = {
  definition: AssetRef;
  duration: number;
  value: number;
  tickInterval: number;
  reapplicationBehavior: {
    name: string;
  };
  statusType: {
    name: string;
  };
  isRemovable: boolean;
};

type RawAbility = {
  id: string;
  type: "ability";
  name: string;
  displayName: string;
  slug: string;
  description: string;
  icon: UnknownRecord | null;
  level: number;
  loadoutKind: {
    name: string;
  };
  output: UnknownRecord;
  damage: UnknownRecord;
  timing: UnknownRecord;
  resource: UnknownRecord;
  targeting: UnknownRecord;
  movement: UnknownRecord;
  worldEffects: UnknownRecord;
  presentation: UnknownRecord;
  buffs: RawAbilityEffectRef[];
  debuffs: RawAbilityEffectRef[];
};

type RawAutoAttack = {
  id: string;
  type: "autoAttack";
  name: string;
  displayName: string;
  slug: string;
  description: string;
  icon: UnknownRecord | null;
  combat: UnknownRecord;
  delivery: UnknownRecord;
};

type RawStatusEffectBehavior = UnknownRecord;

type RawBuff = {
  id: string;
  type: "buff";
  name: string;
  displayName: string;
  slug: string;
  description: string;
  icon: UnknownRecord | null;
  baseDuration: number;
  reapplicationBehavior: {
    name: string;
  };
  statusType: {
    name: string;
  };
  isRemovable: boolean;
  behaviors: RawStatusEffectBehavior[];
};

type RawDebuff = {
  id: string;
  type: "debuff";
  name: string;
  displayName: string;
  slug: string;
  description: string;
  icon: UnknownRecord | null;
  baseDuration: number;
  reapplicationBehavior: {
    name: string;
  };
  statusType: {
    name: string;
  };
  categories?: {
    names?: string[];
  };
  isRemovable: boolean;
  breakThreshold?: UnknownRecord | null;
  behaviors: RawStatusEffectBehavior[];
  legacyEffectSettings?: UnknownRecord | null;
};

type RawGameData = {
  schemaVersion: string;
  generatedAtUtc: string;
  sourceRevision: string | null;
  warnings?: string[];
  metadata: UnknownRecord;
  classes: RawClass[];
  specialisations: RawSpecialisation[];
  abilityPools: RawAbilityPool[];
  abilities: RawAbility[];
  autoAttacks: RawAutoAttack[];
  buffs: RawBuff[];
  debuffs: RawDebuff[];
};

export type SiteIcon = {
  available: boolean;
  src: string | null;
  pathHint: string | null;
};

const require = createRequire(import.meta.url);
const arenaDataPackageEntryPath = require.resolve("@hefty-studios/arena-game-data");
const arenaDataPackageRoot = path.dirname(arenaDataPackageEntryPath);
const arenaDataPackageVersion = JSON.parse(fs.readFileSync(path.join(arenaDataPackageRoot, "package.json"), "utf-8")).version as string;
const siteBase =
  typeof import.meta.env.BASE_URL === "string" && import.meta.env.BASE_URL.length > 0
    ? import.meta.env.BASE_URL.endsWith("/")
      ? import.meta.env.BASE_URL
      : `${import.meta.env.BASE_URL}/`
    : "/";

export type SiteStatusLink = {
  routeKey: string;
  id: string;
  slug: string;
  displayName: string;
  duration: number;
  value: number;
  tickInterval: number;
  reapplication: string;
  statusType: string;
  isRemovable: boolean;
};

export type SiteBuff = {
  id: string;
  routeKey: string;
  slug: string;
  displayName: string;
  description: string;
  icon: SiteIcon;
  baseDuration: number;
  reapplication: string;
  statusType: string;
  isRemovable: boolean;
  behaviors: string[];
};

export type SiteDebuff = {
  id: string;
  routeKey: string;
  slug: string;
  displayName: string;
  description: string;
  icon: SiteIcon;
  baseDuration: number;
  reapplication: string;
  statusType: string;
  categoryNames: string[];
  isRemovable: boolean;
  breakThreshold: string | null;
  behaviors: string[];
};

export type SiteAbility = {
  id: string;
  routeKey: string;
  slug: string;
  displayName: string;
  description: string;
  icon: SiteIcon;
  level: number;
  loadoutKind: string;
  isAutoAttack: boolean;
  outputSummary: string[];
  damageSummary: string[];
  timingSummary: string[];
  resourceSummary: string[];
  targetingSummary: string[];
  linkedBuffs: SiteStatusLink[];
  linkedDebuffs: SiteStatusLink[];
  poolMemberships: {
    id: string;
    routeKey: string;
    slug: string;
    displayName: string;
  }[];
  specialisationLinks: {
    id: string;
    slug: string;
    displayName: string;
    icon: SiteIcon;
    classSlug: string;
    classDisplayName: string;
  }[];
};

export type SiteAbilityPool = {
  id: string;
  routeKey: string;
  slug: string;
  displayName: string;
  description: string;
  icon: SiteIcon;
  tag: string;
  totalPoints: number;
  unlockRequirements: string[];
  abilities: Pick<SiteAbility, "id" | "routeKey" | "slug" | "displayName" | "description" | "level" | "loadoutKind" | "icon" | "isAutoAttack">[];
};

export type SitePool = {
  id: string;
  routeKey: string;
  slug: string;
  displayName: string;
  description: string;
  icon: SiteIcon;
  tag: string;
  damageTypes: string[];
  abilities: Pick<SiteAbility, "id" | "routeKey" | "slug" | "displayName" | "level" | "loadoutKind" | "description" | "icon" | "isAutoAttack">[];
  specialisations: {
    id: string;
    slug: string;
    displayName: string;
    icon: SiteIcon;
    classSlug: string;
    classDisplayName: string;
    totalPoints: number;
    unlockRequirements: string[];
  }[];
};

export type SiteSpecialisation = {
  id: string;
  slug: string;
  displayName: string;
  description: string;
  role: string;
  icon: SiteIcon;
  classId: string;
  classSlug: string;
  classDisplayName: string;
  abilityPools: SiteAbilityPool[];
};

export type SiteClass = {
  id: string;
  slug: string;
  displayName: string;
  description: string;
  icon: SiteIcon;
  stats: { label: string; value: string }[];
  secondaryResource: { label: string; value: string; description: string }[];
  specialisations: Pick<SiteSpecialisation, "id" | "slug" | "displayName" | "role" | "description" | "icon">[];
};

function isObject(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null;
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function assertGameData(value: unknown): asserts value is RawGameData {
  if (!isObject(value)) {
    throw new Error("Game data export is not an object.");
  }

  const requiredArrays = ["classes", "specialisations", "abilityPools", "abilities", "buffs", "debuffs"];

  for (const key of requiredArrays) {
    if (!Array.isArray(value[key])) {
      throw new Error(`Game data export is missing array '${key}'.`);
    }
  }
}

function toIcon(value: unknown): SiteIcon {
  if (!isObject(value)) {
    return { available: false, src: null, pathHint: null };
  }

  const iconId = asString(value.id);
  const packagePath = asString(value.packagePath);
  const relativePackagePath = packagePath ? packagePath.replace(/^\.\//, "") : iconId ? `icons/by-guid/${iconId}.webp` : "";
  const absolutePackagePath = relativePackagePath ? path.join(arenaDataPackageRoot, relativePackagePath) : "";
  const available = absolutePackagePath ? fs.existsSync(absolutePackagePath) : false;

  return {
    available,
    src: available && iconId ? `${siteBase}arena-icons/by-guid/${iconId}.webp` : null,
    pathHint: asString(value.pathHint) || null
  };
}

function toPairs(record: UnknownRecord | null | undefined, preferredOrder: string[] = []): { label: string; value: string }[] {
  if (!record) {
    return [];
  }

  const keys = Object.keys(record);
  const orderedKeys = [...preferredOrder.filter((key) => key in record), ...keys.filter((key) => !preferredOrder.includes(key))];

  return orderedKeys.map((key) => {
    const raw = record[key];
    return {
      label: startCase(key),
      value:
        key === "criticalStrikeChance" && typeof raw === "number"
          ? `${(raw * 100).toFixed(0)}%`
          : key === "haste" && typeof raw === "number"
            ? `${raw.toFixed(0)}%`
            : formatValue(raw)
    };
  });
}

function startCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function formatValue(value: unknown): string {
  if (typeof value === "number") {
    return Number.isInteger(value) ? `${value}` : value.toFixed(2);
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "string") {
    return value === "" ? "None" : value;
  }

  if (Array.isArray(value)) {
    return value.length === 0 ? "None" : value.map((item) => formatValue(item)).join(", ");
  }

  if (isObject(value)) {
    if ("name" in value && typeof value.name === "string") {
      return value.name;
    }

    if ("names" in value && Array.isArray(value.names)) {
      const names = value.names.filter((entry): entry is string => typeof entry === "string");
      return names.length > 0 ? names.join(", ") : "None";
    }

    return Object.entries(value)
      .map(([key, nested]) => `${startCase(key)}: ${formatValue(nested)}`)
      .join(" | ");
  }

  return "None";
}

function summarizeObject(record: UnknownRecord | null | undefined, keys: string[]): string[] {
  if (!record) {
    return [];
  }

  return keys
    .filter((key) => key in record)
    .map((key) => `${startCase(key)}: ${formatValue(record[key])}`);
}

function routeKeysBySlug<T extends { id: string; slug: string }>(items: T[]): Map<string, string> {
  const counts = new Map<string, number>();

  for (const item of items) {
    counts.set(item.slug, (counts.get(item.slug) ?? 0) + 1);
  }

  return new Map(items.map((item) => [item.id, (counts.get(item.slug) ?? 0) > 1 ? `${item.slug}--${item.id}` : item.slug]));
}

function summarizeBehavior(behavior: RawStatusEffectBehavior): string {
  if (!isObject(behavior)) {
    return "Unknown behavior";
  }

  const effectType = isObject(behavior.effectType) ? asString(behavior.effectType.name, "Effect") : "Effect";
  const baseValue = "baseValue" in behavior ? formatValue(behavior.baseValue) : "0";
  const requiredStacks = "requiredStacks" in behavior ? formatValue(behavior.requiredStacks) : "0";
  return `${effectType}: ${baseValue} (Stacks required: ${requiredStacks})`;
}

function summarizeBreakThreshold(value: unknown): string | null {
  if (!isObject(value) || !isObject(value.mode)) {
    return null;
  }

  return `${asString(value.mode.name, "Unknown")} ${formatValue(value.amount)}`;
}

function summarizeUnlockRequirements(value: UnknownRecord): string[] {
  return Object.entries(value)
    .filter(([, amount]) => typeof amount === "number" && amount >= 0)
    .map(([level, amount]) => {
      const label = startCase(level).replace(/^Level(\d)/, "Level $1");
      return `${label}: ${amount} points`;
    });
}

function getAccessibleLevels(value: UnknownRecord): Set<number> {
  return new Set(
    Object.entries(value)
      .filter(([, amount]) => typeof amount === "number" && amount >= 0)
      .map(([level]) => Number.parseInt(level.replace(/^level/i, ""), 10))
      .filter((level) => Number.isFinite(level))
  );
}

function compareAbilities(left: Pick<SiteAbility, "displayName" | "level" | "isAutoAttack">, right: Pick<SiteAbility, "displayName" | "level" | "isAutoAttack">): number {
  if (left.isAutoAttack !== right.isAutoAttack) {
    return left.isAutoAttack ? -1 : 1;
  }

  if (left.level !== right.level) {
    return left.level - right.level;
  }

  return left.displayName.localeCompare(right.displayName);
}

function extractDamageTypes(ability: Pick<SiteAbility, "damageSummary">): string[] {
  return ability.damageSummary
    .filter((entry) => entry.startsWith("Effect Type:") || entry.startsWith("Element:"))
    .map((entry) => entry.split(": ").slice(1).join(": ").trim())
    .filter((value) => value !== "" && value !== "None" && value !== "Untyped" && value !== "Unknown");
}

assertGameData(rawGameData);
const gameData: RawGameData = rawGameData;

const poolById = new Map(gameData.abilityPools.map((item) => [item.id, item]));

const classRouteKeys = routeKeysBySlug(gameData.classes);
const specRouteKeys = routeKeysBySlug(gameData.specialisations);
const poolRouteKeys = routeKeysBySlug(gameData.abilityPools);
const abilityRouteKeys = routeKeysBySlug([...gameData.abilities, ...gameData.autoAttacks]);
const buffRouteKeys = routeKeysBySlug(gameData.buffs);
const debuffRouteKeys = routeKeysBySlug(gameData.debuffs);

const specClassLinks = new Map<string, RawClass>();
for (const rawClass of gameData.classes) {
  for (const specRef of rawClass.specialisations) {
    specClassLinks.set(specRef.id, rawClass);
  }
}

const abilityPoolMembership = new Map<string, RawAbilityPool[]>();
for (const pool of gameData.abilityPools) {
  for (const entry of pool.entries) {
    if (entry.kind !== "ability") {
      continue;
    }

    const current = abilityPoolMembership.get(entry.asset.id) ?? [];
    current.push(pool);
    abilityPoolMembership.set(entry.asset.id, current);
  }
}

const abilitySpecMembership = new Map<string, RawSpecialisation[]>();
for (const spec of gameData.specialisations) {
  const seen = new Set<string>();
  for (const access of spec.abilityPoolAccesses) {
    const pool = poolById.get(access.pool.id);
    if (!pool) {
      continue;
    }

    for (const entry of pool.entries) {
      if (entry.kind !== "ability" || seen.has(entry.asset.id)) {
        continue;
      }

      seen.add(entry.asset.id);
      const current = abilitySpecMembership.get(entry.asset.id) ?? [];
      current.push(spec);
      abilitySpecMembership.set(entry.asset.id, current);
    }
  }
}

const siteBuffs = gameData.buffs.map<SiteBuff>((buff) => ({
  id: buff.id,
  routeKey: buffRouteKeys.get(buff.id) ?? buff.slug,
  slug: buff.slug,
  displayName: buff.displayName,
  description: buff.description,
  icon: toIcon(buff.icon),
  baseDuration: buff.baseDuration,
  reapplication: buff.reapplicationBehavior.name,
  statusType: buff.statusType.name,
  isRemovable: buff.isRemovable,
  behaviors: buff.behaviors.map((behavior) => summarizeBehavior(behavior))
}));

const siteDebuffs = gameData.debuffs.map<SiteDebuff>((debuff) => ({
  id: debuff.id,
  routeKey: debuffRouteKeys.get(debuff.id) ?? debuff.slug,
  slug: debuff.slug,
  displayName: debuff.displayName,
  description: debuff.description,
  icon: toIcon(debuff.icon),
  baseDuration: debuff.baseDuration,
  reapplication: debuff.reapplicationBehavior.name,
  statusType: debuff.statusType.name,
  categoryNames: asStringArray(debuff.categories?.names),
  isRemovable: debuff.isRemovable,
  breakThreshold: summarizeBreakThreshold(debuff.breakThreshold),
  behaviors: debuff.behaviors.map((behavior) => summarizeBehavior(behavior))
}));

const siteBuffById = new Map(siteBuffs.map((item) => [item.id, item]));
const siteDebuffById = new Map(siteDebuffs.map((item) => [item.id, item]));

const siteAbilities = gameData.abilities.map<SiteAbility>((ability) => ({
  id: ability.id,
  routeKey: abilityRouteKeys.get(ability.id) ?? ability.slug,
  slug: ability.slug,
  displayName: ability.displayName,
  description: ability.description,
  icon: toIcon(ability.icon),
  level: ability.level,
  loadoutKind: ability.loadoutKind.name,
  isAutoAttack: false,
  outputSummary: summarizeObject(ability.output, [
    "type",
    "value",
    "splashOutput",
    "splashRange",
    "scalingType",
    "distanceScalingMode",
    "distanceMinimumValue",
    "hitCount",
    "knockbackLevel"
  ]),
  damageSummary: summarizeObject(ability.damage, ["effectType", "element"]),
  timingSummary: summarizeObject(ability.timing, [
    "cooldown",
    "castTime",
    "castingType",
    "tickTime",
    "ignoresGlobalCooldown",
    "customGlobalCooldown",
    "sharedCooldown",
    "sharedCooldownGroup"
  ]),
  resourceSummary: summarizeObject(ability.resource, ["costType", "cost", "restoreType", "restoreAmount"]),
  targetingSummary: summarizeObject(ability.targeting, [
    "minimumRange",
    "range",
    "requiresFacingTarget",
    "delaysAutoAttack",
    "canActivateWhileControlled",
    "requiresTargetHealthAtOrBelowPercent",
    "targetAffinity",
    "deliveryMode"
  ]),
  linkedBuffs: ability.buffs
    .map((entry) => {
      const buff = siteBuffById.get(entry.definition.id);
      if (!buff) {
        return null;
      }

      return {
        routeKey: buff.routeKey,
        id: buff.id,
        slug: buff.slug,
        displayName: buff.displayName,
        duration: entry.duration,
        value: entry.value,
        tickInterval: entry.tickInterval,
        reapplication: entry.reapplicationBehavior.name,
        statusType: entry.statusType.name,
        isRemovable: entry.isRemovable
      };
    })
    .filter((item): item is SiteStatusLink => item !== null),
  linkedDebuffs: ability.debuffs
    .map((entry) => {
      const debuff = siteDebuffById.get(entry.definition.id);
      if (!debuff) {
        return null;
      }

      return {
        routeKey: debuff.routeKey,
        id: debuff.id,
        slug: debuff.slug,
        displayName: debuff.displayName,
        duration: entry.duration,
        value: entry.value,
        tickInterval: entry.tickInterval,
        reapplication: entry.reapplicationBehavior.name,
        statusType: entry.statusType.name,
        isRemovable: entry.isRemovable
      };
    })
    .filter((item): item is SiteStatusLink => item !== null),
  poolMemberships: (abilityPoolMembership.get(ability.id) ?? []).map((pool) => ({
    id: pool.id,
    routeKey: poolRouteKeys.get(pool.id) ?? pool.slug,
    slug: pool.slug,
    displayName: pool.displayName
  })),
  specialisationLinks: (abilitySpecMembership.get(ability.id) ?? []).map((spec) => {
    const linkedClass = specClassLinks.get(spec.id);
    return {
      id: spec.id,
      slug: spec.slug,
      displayName: spec.displayName,
      icon: toIcon(spec.icon),
      classSlug: linkedClass?.slug ?? "",
      classDisplayName: linkedClass?.displayName ?? "Unknown"
    };
  })
}));

const siteAutoAttacks = gameData.autoAttacks.map<SiteAbility>((autoAttack) => ({
  id: autoAttack.id,
  routeKey: abilityRouteKeys.get(autoAttack.id) ?? autoAttack.slug,
  slug: autoAttack.slug,
  displayName: autoAttack.displayName,
  description: autoAttack.description,
  icon: toIcon(autoAttack.icon),
  level: 0,
  loadoutKind: "Auto Attack",
  isAutoAttack: true,
  outputSummary: [],
  damageSummary: summarizeObject(autoAttack.combat, ["damage"]),
  timingSummary: summarizeObject(autoAttack.combat, ["attackInterval"]),
  resourceSummary: [],
  targetingSummary: summarizeObject(autoAttack.combat, ["range", "requiresTarget", "requiresFacingTarget"]).concat(
    summarizeObject(autoAttack.delivery, ["mode", "projectileSpeed"])
  ),
  linkedBuffs: [],
  linkedDebuffs: [],
  poolMemberships: [],
  specialisationLinks: []
}));

const allSiteAbilities = [...siteAbilities, ...siteAutoAttacks];

const siteAbilityById = new Map(allSiteAbilities.map((item) => [item.id, item]));

const siteSpecialisations = gameData.specialisations.map<SiteSpecialisation>((spec) => {
  const linkedClass = specClassLinks.get(spec.id);

  return {
    id: spec.id,
    slug: spec.slug,
    displayName: spec.displayName,
    description: spec.description,
    role: spec.role,
    icon: toIcon(spec.icon),
    classId: linkedClass?.id ?? "",
    classSlug: linkedClass?.slug ?? "",
    classDisplayName: linkedClass?.displayName ?? "Unknown",
    abilityPools: spec.abilityPoolAccesses
      .map((access) => {
        const pool = poolById.get(access.pool.id);
        if (!pool) {
          return null;
        }

        const accessibleLevels = getAccessibleLevels(access.unlockRequirements);

        return {
          id: pool.id,
          routeKey: poolRouteKeys.get(pool.id) ?? pool.slug,
          slug: pool.slug,
          displayName: pool.displayName,
          description: pool.description,
          icon: toIcon(pool.icon),
          tag: pool.tag?.name ?? "Shared",
          totalPoints: access.totalPoints,
          unlockRequirements: summarizeUnlockRequirements(access.unlockRequirements),
          abilities: pool.entries
            .filter((entry) => entry.kind === "ability" || entry.kind === "autoAttack")
            .map((entry) => siteAbilityById.get(entry.asset.id))
            .filter((item): item is SiteAbility => item !== undefined)
            .filter((ability) => ability.isAutoAttack || accessibleLevels.has(ability.level))
            .map((ability) => ({
              id: ability.id,
              routeKey: ability.routeKey,
              slug: ability.slug,
              displayName: ability.displayName,
              description: ability.description,
              level: ability.level,
              loadoutKind: ability.loadoutKind,
              icon: ability.icon,
              isAutoAttack: ability.isAutoAttack
            }))
            .sort(compareAbilities)
        };
      })
      .filter((item): item is SiteAbilityPool => item !== null)
  };
});

const siteSpecById = new Map(siteSpecialisations.map((item) => [item.id, item]));

const sitePools = gameData.abilityPools
  .map<SitePool>((pool) => {
    const resolvedAbilities = pool.entries
      .filter((entry) => entry.kind === "ability" || entry.kind === "autoAttack")
      .map((entry) => siteAbilityById.get(entry.asset.id))
      .filter((item): item is SiteAbility => item !== undefined);

    return {
      id: pool.id,
      routeKey: poolRouteKeys.get(pool.id) ?? pool.slug,
      slug: pool.slug,
      displayName: pool.displayName,
      description: pool.description,
      icon: toIcon(pool.icon),
      tag: pool.tag?.name ?? "Shared",
      damageTypes: [...new Set(resolvedAbilities.flatMap((ability) => extractDamageTypes(ability)))].sort((left, right) =>
        left.localeCompare(right)
      ),
      abilities: resolvedAbilities
        .map((ability) => ({
          id: ability.id,
          routeKey: ability.routeKey,
          slug: ability.slug,
          displayName: ability.displayName,
          description: ability.description,
          level: ability.level,
          loadoutKind: ability.loadoutKind,
          icon: ability.icon,
          isAutoAttack: ability.isAutoAttack
        }))
        .sort(compareAbilities),
      specialisations: gameData.specialisations
      .flatMap((spec) => {
        const access = spec.abilityPoolAccesses.find((item) => item.pool.id === pool.id);
        if (!access) {
          return [];
        }

        const linkedClass = specClassLinks.get(spec.id);
        return [
          {
            id: spec.id,
            slug: spec.slug,
            displayName: spec.displayName,
            icon: toIcon(spec.icon),
            classSlug: linkedClass?.slug ?? "",
            classDisplayName: linkedClass?.displayName ?? "Unknown",
            totalPoints: access.totalPoints,
            unlockRequirements: summarizeUnlockRequirements(access.unlockRequirements)
          }
        ];
      })
    };
  })
  .filter((pool) => pool.abilities.length > 0);

const siteClasses = gameData.classes.map<SiteClass>((item) => ({
  id: item.id,
  slug: item.slug,
  displayName: item.displayName,
  description: item.description,
  icon: toIcon(item.icon),
  stats: toPairs(item.stats, [
    "maxHealth",
    "physicalPower",
    "physicalDefense",
    "magicalPower",
    "magicalDefense",
    "speed",
    "haste",
    "criticalStrikeChance"
  ]),
  secondaryResource: summarizeObject(item.secondaryResource, ["type", "max", "regenPerSecond"]).map((entry) => {
    const [label, ...rest] = entry.split(": ");
    return {
      label,
      value: rest.join(": "),
      description: isObject(item.secondaryResource) ? asString(item.secondaryResource.description) : ""
    };
  }),
  specialisations: item.specialisations
    .map((specRef) => siteSpecById.get(specRef.id))
    .filter((entry): entry is SiteSpecialisation => entry !== undefined)
    .map((spec) => ({
      id: spec.id,
      slug: spec.slug,
      displayName: spec.displayName,
      role: spec.role,
      description: spec.description,
      icon: spec.icon
    }))
}));

const siteClassBySlug = new Map(siteClasses.map((item) => [item.slug, item]));
const siteSpecBySlug = new Map(siteSpecialisations.map((item) => [item.slug, item]));
const siteAbilityByRouteKey = new Map(allSiteAbilities.map((item) => [item.routeKey, item]));
const sitePoolByRouteKey = new Map(sitePools.map((item) => [item.routeKey, item]));

export const siteMeta = {
  schemaVersion: gameData.schemaVersion,
  packageVersion: arenaDataPackageVersion,
  generatedAtUtc: gameData.generatedAtUtc,
  sourceRevision: gameData.sourceRevision,
  metadata: gameData.metadata,
  totalClasses: siteClasses.length,
  totalSpecialisations: siteSpecialisations.length,
  totalPools: sitePools.length,
  totalAbilities: allSiteAbilities.length,
  totalBuffs: siteBuffs.length,
  totalDebuffs: siteDebuffs.length
};

export function getClasses(): SiteClass[] {
  return siteClasses;
}

export function getClassBySlug(slug: string): SiteClass | undefined {
  return siteClassBySlug.get(slug);
}

export function getSpecialisations(): SiteSpecialisation[] {
  return siteSpecialisations;
}

export function getSpecialisationBySlug(slug: string): SiteSpecialisation | undefined {
  return siteSpecBySlug.get(slug);
}

export function getAbilities(): SiteAbility[] {
  return allSiteAbilities;
}

export function getPools(): SitePool[] {
  return sitePools;
}

export function getPoolByRouteKey(routeKey: string): SitePool | undefined {
  return sitePoolByRouteKey.get(routeKey);
}

export function getAbilityByRouteKey(routeKey: string): SiteAbility | undefined {
  return siteAbilityByRouteKey.get(routeKey);
}

export function getAbilityRouteKeys(): string[] {
  return allSiteAbilities.map((item) => item.routeKey);
}

export function getAbilityRouteKeyById(id: string): string | undefined {
  return abilityRouteKeys.get(id);
}

export function getClassRouteKeyById(id: string): string | undefined {
  return classRouteKeys.get(id);
}

export function getSpecialisationRouteKeyById(id: string): string | undefined {
  return specRouteKeys.get(id);
}

export function getBuffById(id: string): SiteBuff | undefined {
  return siteBuffById.get(id);
}

export function getDebuffById(id: string): SiteDebuff | undefined {
  return siteDebuffById.get(id);
}

export function getBuffRouteKeyById(id: string): string | undefined {
  return buffRouteKeys.get(id);
}

export function getDebuffRouteKeyById(id: string): string | undefined {
  return debuffRouteKeys.get(id);
}
