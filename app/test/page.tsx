"use client";

import { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/test/Sidebar";
import Topbar from "@/components/test/Topbar";
import ConsoleWindow from "@/components/test/ConsoleWindow";
import RightSidebar from "@/components/test/RightSidebar";

const LOG_LINES = [
  { text: "[12:38:58 INFO]: [Geyser-Spigot] Started Geyser on UDP port 19132", type: "info" as const },
  { text: "[12:38:58 INFO]: [Geyser-Spigot] Done (3.551s)! Run /geyser help for help!", type: "info" as const },
  { text: "[12:38:59 INFO]: [PlaceholderAPI] Placeholder expansion registration initializing...", type: "info" as const },
  { text: "[12:38:59 INFO]: Running delayed init tasks", type: "info" as const },
  { text: "[12:38:59 INFO]: [ViaVersion] Finished mapping loading, shutting down loader executor.", type: "info" as const },
  { text: "[12:38:59 INFO]: [GeyserUpdater] Checking for updates...", type: "info" as const },
  { text: "[12:38:59 INFO]: [CoreProtect] WorldEdit logging successfully initialized.", type: "info" as const },
  { text: '[12:38:59 INFO]: Done (34.654s)! For help, type "help"', type: "info" as const },
  { text: "[12:38:59 INFO]: [voicechat] Loading plugins", type: "info" as const },
  { text: "[12:38:59 INFO]: [voicechat] Loaded 0 plugin(s)", type: "info" as const },
  { text: "[12:38:59 INFO]: [voicechat] Initializing plugins", type: "info" as const },
  { text: "[12:38:59 INFO]: [voicechat] Initialized 0 plugin(s)", type: "info" as const },
  { text: "[12:38:59 INFO]: [voicechat] Using server-ip as bind address: 0.0.0.0", type: "info" as const },
  { text: "[12:38:59 INFO]: [voicechat] Voice chat server started at 0.0.0.0:25047", type: "info" as const },
  { text: "[12:38:59 WARN]: *************************************************************************************", type: "warn" as const },
  { text: "[12:38:59 WARN]: You are running the latest build for your Minecraft version (1.21.11)", type: "warn" as const },
  { text: "[12:38:59 WARN]: However, you are 2 release(s) behind the latest stable release (26.1.2)!", type: "warn" as const },
  { text: "[12:38:59 WARN]: It is recommended that you update as soon as possible", type: "warn" as const },
  { text: "[12:38:59 WARN]: https://papermc.io/downloads/paper", type: "warn" as const },
  { text: "[12:38:59 WARN]: *************************************************************************************", type: "warn" as const },
  { text: "[12:38:59 INFO]: [ViaVersion] You are running a development version of the plugin, please report any bugs to GitHub.", type: "info" as const },
  { text: "[12:38:59 INFO]: [PlaceholderAPI] Successfully registered external expansion: luckperms [5.4-R2]", type: "info" as const },
  { text: "[12:38:59 INFO]: 1 placeholder hook(s) registered!", type: "success" as const },
  { text: "[12:39:00 INFO]: [GeyserUpdater] geyser is up to date.", type: "info" as const },
  { text: "[12:39:00 INFO]: [GeyserUpdater] floodgate is up to date.", type: "info" as const },
  { text: "[12:39:00 INFO]: [GeyserUpdater] Update check completed.", type: "info" as const },
  { text: "[12:39:03 INFO]: [HuskHomes] Registered 'after_load' hooks", type: "info" as const },
  { text: "whitelist remove AQUER", type: "plain" as const },
  { text: "[12:42:51 INFO]: AQUER successfully removed from whitelist", type: "info" as const },
  { text: "whitelist remove AQUEUR", type: "plain" as const },
  { text: "[12:42:55 INFO]: AQUEUR not in whitelist", type: "info" as const },
  { text: "[12:43:58 INFO]: [GeyserUpdater] Checking for updates...", type: "info" as const },
  { text: "[12:43:59 INFO]: [GeyserUpdater] geyser is up to date.", type: "info" as const },
  { text: "[12:43:59 INFO]: [GeyserUpdater] floodgate is up to date.", type: "info" as const },
  { text: "[12:43:59 INFO]: [GeyserUpdater] Update check completed.", type: "info" as const },
  { text: "[12:44:01 INFO]: [LiteBans] Completed database migration check", type: "info" as const },
  { text: "[12:44:01 INFO]: [LiteBans] Loaded 127 active bans, 43 mutes, 18 warnings", type: "info" as const },
  { text: "[12:44:02 INFO]: [Essentials] Loading kit configurations...", type: "info" as const },
  { text: "[12:44:02 INFO]: [Essentials] Loaded 47 kits from kits.yml", type: "info" as const },
  { text: "[12:44:03 INFO]: [WorldEdit] Using modern Fawe (FastAsyncWorldEdit) backend", type: "info" as const },
  { text: "[12:44:03 INFO]: [WorldEdit] Max brush radius set to 125", type: "info" as const },
  { text: "[12:44:04 INFO]: [LuckPerms] Loading permission vault...", type: "info" as const },
  { text: "[12:44:04 INFO]: [LuckPerms] Registered 214 permissions across 38 groups", type: "info" as const },
  { text: "[12:44:05 INFO]: [CoreProtect] Database connection established (H2)", type: "info" as const },
  { text: "[12:44:05 INFO]: [CoreProtect] Logging initialized for 3 worlds", type: "info" as const },
  { text: "[12:44:06 INFO]: [dynmap] Using standard web server mode on port 8123", type: "info" as const },
  { text: "[12:44:06 INFO]: [dynmap] 12 tile renders queued for world 'world'", type: "info" as const },
  { text: "[12:44:07 INFO]: [Vault] Hooked into LuckPerms for permissions", type: "info" as const },
  { text: "[12:44:07 INFO]: [Vault] Hooked into Essentials for economy", type: "info" as const },
  { text: "[12:44:08 INFO]: [DeluxeHub] Loaded 16 spawn locations across 3 servers", type: "info" as const },
  { text: "[12:44:08 INFO]: [DeluxeHub] Enabled server selector item", type: "info" as const },
  { text: "[12:44:09 INFO]: Starting Minecraft server on 0.0.0.0:25565", type: "info" as const },
  { text: "[12:44:09 INFO]: Using epoll native transport for high-performance networking", type: "info" as const },
  { text: "[12:44:10 INFO]: Server is listening on /0.0.0.0:25565", type: "info" as const },
  { text: "[12:44:10 INFO]: Preparing spawn chunks for world 'world'...", type: "info" as const },
  { text: "[12:44:11 INFO]: Pre-spawn chunks generated in 1.342s", type: "info" as const },
  { text: "[12:44:11 INFO]: Preparing spawn chunks for world 'world_nether'...", type: "info" as const },
  { text: "[12:44:12 INFO]: Pre-spawn chunks generated in 0.891s", type: "info" as const },
  { text: "[12:44:12 INFO]: Preparing spawn chunks for world 'world_the_end'...", type: "info" as const },
  { text: "[12:44:12 INFO]: Pre-spawn chunks generated in 0.673s", type: "info" as const },
  { text: "[12:44:13 INFO]: [Player Analytics] Loaded analytics for 2,847 unique players", type: "info" as const },
  { text: "[12:44:13 INFO]: [DiscordSRV] Connected to Discord gateway (shard 0)", type: "info" as const },
  { text: "[12:44:14 INFO]: [DiscordSRV] Synced 12 text channels across 3 categories", type: "info" as const },
  { text: "[12:44:14 INFO]: [GriefPrevention] Loaded 1,234 claimed chunks", type: "info" as const },
  { text: "[12:44:15 INFO]: [GriefPrevention] 89 player claims restored from database", type: "info" as const },
  { text: "[12:44:15 INFO]: [GSit] Enabled sitting on stairs, slabs, and carpets", type: "info" as const },
  { text: "[12:44:16 INFO]: [ExcellentEnchants] Registered 37 custom enchantments", type: "info" as const },
  { text: "[12:44:16 INFO]: [ExcellentEnchants] 12 enchants available via enchanting table", type: "info" as const },
  { text: "[12:44:17 INFO]: [ExecutableItems] Loaded 214 custom items from database", type: "info" as const },
  { text: "[12:44:17 INFO]: [ExecutableItems] Registered 86 item abilities", type: "info" as const },
  { text: "[12:44:18 INFO]: [MythicMobs] Loaded 47 mob types from 12 packs", type: "info" as const },
  { text: "[12:44:18 INFO]: [MythicMobs] Spawner system initialized (34 active spawners)", type: "info" as const },
  { text: "[12:44:19 INFO]: [AuctionHouse] Loaded 2,347 active listings from database", type: "info" as const },
  { text: "[12:44:19 INFO]: [Jobs] Loaded 14 job types with 218 level rewards", type: "info" as const },
  { text: "[12:44:20 INFO]: [mcMMO] Loaded 12 skill trees with 385 abilities", type: "info" as const },
  { text: "[12:44:20 INFO]: [mcMMO] Database connection pool initialized (8 connections)", type: "info" as const },
  { text: "[12:44:21 INFO]: [Slimefun] Loading 47 research categories...", type: "info" as const },
  { text: "[12:44:21 INFO]: [Slimefun] Loaded 1,248 items across 32 categories", type: "info" as const },
  { text: "[12:44:22 INFO]: [BentoBox] Loading island grid for 'BSkyBlock'...", type: "info" as const },
  { text: "[12:44:22 INFO]: [BentoBox] 4,512 player islands loaded from database", type: "info" as const },
  { text: "[12:44:23 INFO]: [Parkour] Loaded 37 parkour courses across 3 worlds", type: "info" as const },
  { text: "[12:44:23 INFO]: [Parkour] 8,942 total parkour completions recorded", type: "info" as const },
  { text: "[12:44:24 INFO]: [BetterRTP] Loaded 37 biomes with weighted spawn probabilities", type: "info" as const },
  { text: "[12:44:24 INFO]: [BetterRTP] Average RTP distance: 1,247 blocks from spawn", type: "info" as const },
  { text: "[12:44:25 INFO]: [UltimateTimber] 4 tree species registered for tree felling", type: "info" as const },
  { text: "[12:44:25 INFO]: [VeinMiner] Registered 14 block types for vein mining", type: "info" as const },
  { text: "[12:44:26 INFO]: [ChestShop] Loaded 892 active shop signs", type: "info" as const },
  { text: "[12:44:26 INFO]: [ChestShop] 15,384 items for sale across all shops", type: "info" as const },
  { text: "[12:44:27 INFO]: [TradeSystem] Loaded 237 NPC traders with 1,842 trade offers", type: "info" as const },
  { text: "[12:44:27 INFO]: [EpicBosses] Loaded 8 boss configurations", type: "info" as const },
  { text: "[12:44:28 INFO]: [EpicBosses] Spawned world boss 'The Void Caller' at end island", type: "info" as const },
  { text: "[12:44:28 INFO]: [CustomCrafting] Loaded 156 custom recipes", type: "info" as const },
  { text: "[12:44:29 INFO]: [CustomCrafting] 34 recipes are discovery-based", type: "info" as const },
  { text: "[12:44:29 INFO]: [TradeSystem] Checking for expired listings...", type: "info" as const },
  { text: "[12:44:30 INFO]: [TradeSystem] 12 expired listings removed, 8 items returned to sellers", type: "info" as const },
  { text: "[12:44:30 INFO]: [InteractiveChat] Hover and click events enabled for all chat formats", type: "info" as const },
  { text: "[12:44:31 INFO]: [ChatReaction] Mini-game loaded: type the word before others!", type: "info" as const },
  { text: "[12:44:31 INFO]: [StaffMode] 6 staff members online: 3 admins, 2 mods, 1 helper", type: "info" as const },
  { text: "[12:44:32 INFO]: [CoreProtect] Lookup cache warmed with 50,000 recent entries", type: "info" as const },
  { text: "[12:44:32 INFO]: [Plan] Player analytics web interface started on port 8804", type: "info" as const },
  { text: "[12:44:33 INFO]: [PremiumVanish] 1 admin currently vanished", type: "info" as const },
  { text: "[12:44:33 INFO]: [ProtocolLib] Structure mapping loaded for Minecraft 1.21.4", type: "info" as const },
  { text: "[12:44:34 INFO]: Server fully loaded. Ready for players! (38.472s)", type: "info" as const },
  { text: "[12:44:34 INFO]: [dynmap] Full render complete for all worlds", type: "info" as const },
  { text: "[12:44:35 INFO]: [DiscordSRV] Bot status set to ONLINE", type: "info" as const },
  { text: "AQUER joined the game", type: "plain" as const },
  { text: "[12:45:12 INFO]: [LuckPerms] AQUER — permissions loaded (3 groups, 12 nodes)", type: "info" as const },
  { text: "[12:45:13 INFO]: AQUER issued command: /spawn", type: "info" as const },
  { text: "[12:45:18 INFO]: AQUER issued command: /balance", type: "info" as const },
  { text: "[12:45:18 INFO]: AQUER has 12,847.50 coins", type: "info" as const },
  { text: "[12:45:24 INFO]: AQUER issued command: /ah browse", type: "info" as const },
  { text: "[12:45:28 INFO]: [AuctionHouse] AQUER is browsing 47 pages of listings", type: "info" as const },
  { text: "[12:45:35 INFO]: AQUER issued command: /rtp", type: "info" as const },
  { text: "[12:45:35 INFO]: [BetterRTP] Teleporting AQUER to random location...", type: "info" as const },
  { text: "[12:45:36 INFO]: [BetterRTP] AQUER teleported 1,832 blocks away at (-423, 72, 1,847)", type: "info" as const },
  { text: "[12:46:01 INFO]: [GSit] AQUER sat on a stair at (-423, 72, 1,847)", type: "info" as const },
  { text: "[12:46:30 INFO]: [MythicMobs] Spawning 'Shadow Stalker' near AQUER", type: "info" as const },
  { text: "[12:46:31 WARN]: AQUER is fighting 'Shadow Stalker' (HP: 200/200)", type: "warn" as const },
  { text: "[12:46:33 WARN]: AQUER dealt 47 damage to 'Shadow Stalker'", type: "warn" as const },
  { text: "[12:46:35 WARN]: AQUER dealt 52 damage to 'Shadow Stalker'", type: "warn" as const },
  { text: "[12:46:37 INFO]: AQUER defeated 'Shadow Stalker'! Dropped: 3 diamonds, 12 bones", type: "info" as const },
  { text: "[12:46:38 INFO]: [mcMMO] AQUER — Swords skill increased to level 47!", type: "info" as const },
  { text: "[12:47:00 INFO]: [InteractiveChat] AQUER: Anyone want to do a dungeon run?", type: "info" as const },
  { text: "[12:47:12 INFO]: XxBossSlayerxX joined the game", type: "plain" as const },
  { text: "[12:47:14 INFO]: [LuckPerms] XxBossSlayerxX — permissions loaded (2 groups, 8 nodes)", type: "info" as const },
  { text: "[12:47:15 INFO]: XxBossSlayerxX issued command: /msg AQUER I'm down!", type: "info" as const },
  { text: "AQUER: /msg XxBossSlayerxX Let's go! Meet at warpgate", type: "plain" as const },
  { text: "[12:47:22 INFO]: [Jobs] XxBossSlayerxX earned 245 XP in 'Miner' job (+87 coins)", type: "info" as const },
  { text: "[12:47:28 INFO]: [ExcellentEnchants] AQUER enchanted 'Netherite Sword' with 'Life Steal III'", type: "info" as const },
  { text: "[12:47:28 INFO]: [ExcellentEnchants] Cost: 47 experience levels", type: "info" as const },
  { text: "[12:47:35 INFO]: AQUER issued command: /ec", type: "info" as const },
  { text: "[12:47:40 INFO]: AQUER issued command: /back", type: "info" as const },
  { text: "[12:47:42 INFO]: [GriefPrevention] AQUER is in wilderness — claim using /claim", type: "info" as const },
  { text: "[12:47:45 INFO]: AQUER issued command: /claim 50", type: "info" as const },
  { text: "[12:47:45 INFO]: [GriefPrevention] AQUER claimed 50 blocks at (-423, 72, 1,847)", type: "info" as const },
  { text: "[12:47:48 INFO]: [Slimefun] AQUER unlocked 'Basic Machines' research", type: "info" as const },
  { text: "[12:48:00 INFO]: Server TPS: 20.0 | MSPT: 18.4 | Memory: 2.4/4.0 GB", type: "info" as const },
  { text: "[12:48:15 INFO]: [ExecutableItems] AQUER crafted 'Auto-Smelter Pickaxe'", type: "info" as const },
  { text: "[12:48:30 INFO]: [VeinMiner] AQUER vein-mined 47 blocks of iron ore in 2.3s", type: "info" as const },
  { text: "[12:48:36 INFO]: [Jobs] AQUER earned 1,247 XP in 'Miner' job (+412 coins)", type: "info" as const },
  { text: "[12:48:36 INFO]: [Jobs] AQUER leveled up to Miner level 34!", type: "info" as const },
  { text: "[12:48:36 INFO]: XxBossSlayerxX issued command: /tpa AQUER", type: "info" as const },
  { text: "[12:48:37 INFO]: AQUER accepted teleport request from XxBossSlayerxX", type: "info" as const },
  { text: "[12:48:38 INFO]: XxBossSlayerxX teleported to AQUER", type: "info" as const },
  { text: "[12:48:40 INFO]: [EpicBosses] Warning: 'The Void Caller' boss respawning in 15 minutes", type: "warn" as const },
  { text: "[12:48:42 INFO]: AQUER: Ready for the boss?", type: "plain" as const },
  { text: "[12:48:43 INFO]: XxBossSlayerxX: Always ready bro", type: "plain" as const },
  { text: "[12:48:45 INFO]: AQUER issued command: /recipe Dragon_Breath_Sword", type: "info" as const },
  { text: "[12:48:46 INFO]: [CustomCrafting] Recipe 'Dragon_Breath_Sword' — requires: 1 Dragon Egg, 2 Nether Stars", type: "info" as const },
  { text: "[12:48:50 INFO]: XxBossSlayerxX issued command: /ah sell 5 Netherite_Scrap 12000", type: "info" as const },
  { text: "[12:48:51 INFO]: [AuctionHouse] XxBossSlayerxX listed 5x Netherite Scrap for 12,000 coins", type: "info" as const },
];

export default function Content() {
  const [command, setCommand] = useState("");
  const [logs, setLogs] = useState([...LOG_LINES]);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    files: false,
    server: true,
    networking: true,
    management: true,
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarTransitioning, setSidebarTransitioning] = useState(false);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleSend = () => {
    const trimmed = command.trim();
    if (!trimmed) return;
    setLogs((prev) => [...prev, { text: trimmed, type: "plain" }]);
    setCommand("");
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  return (
    <>
      <style>{`
        @font-face { font-family: 'Inter'; font-style: normal; font-weight: 100 900; src: url(/fonts/inter-400.woff2) format('woff2'); }
        @font-face { font-family: 'Poppins'; font-style: normal; font-weight: 400; src: url(/fonts/poppins-400.woff2) format('woff2'); }
        @font-face { font-family: 'Poppins'; font-style: normal; font-weight: 500; src: url(/fonts/poppins-500.woff2) format('woff2'); }
        @font-face { font-family: 'Poppins'; font-style: normal; font-weight: 600; src: url(/fonts/poppins-600.woff2) format('woff2'); }
        @font-face { font-family: 'Poppins'; font-style: normal; font-weight: 700; src: url(/fonts/poppins-700.woff2) format('woff2'); }
        @font-face { font-family: 'Sometype Mono'; font-style: normal; font-weight: 100 900; src: url(/fonts/sometype-mono-400.woff2) format('woff2'); }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #__next { height: 100%; }
        body { font-family: 'Inter', sans-serif; background: #111113; color: #fff; }
        .console-scroll::-webkit-scrollbar { width: 4px; }
        .console-scroll::-webkit-scrollbar-track { background: transparent; }
        .console-scroll::-webkit-scrollbar-thumb { background: #26282b; border-radius: 2px; }
        input::placeholder { color: #90949d; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; }
        input:focus { outline: none; }
        .topbar-btn { background: rgba(16,17,20,0.25); border: 1px solid #26282b; cursor: pointer; transition: background 0.15s ease, border 0.15s ease; }
        .topbar-btn:hover { background: rgba(67,70,76,0.25); border: 1px solid rgba(255,255,255,0.08); }
        .topbar-interactive { cursor: pointer; transition: background 0.15s ease, border 0.15s ease; }
        .topbar-interactive:hover { background: rgba(67,70,76,0.25); }
        .status-btn { border-radius: 8px; height: 44px; display: flex; align-items: center; gap: 12px; background: rgba(67,70,76,0.25); border: 1px solid transparent; transition: background 0.15s ease, border-color 0.15s ease; }
        .status-btn-start { border-radius: 8px; height: 44px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px; transition: box-shadow 0.15s ease; background: #1bd069; border: none; }
        .status-btn-start:hover { box-shadow: inset 0 0 0 999px rgba(67,70,76,0.25); }
      `}</style>

      <div style={{ display: "flex", gap: 16, padding: 16, width: "100%", height: "100vh", background: "#111113" }}>
        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          transitioning={sidebarTransitioning}
          setTransitioning={setSidebarTransitioning}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
        />

        <div style={{ flex: "1 0 0", minWidth: 0, display: "flex", flexDirection: "column", gap: 16, height: "100%" }}>
          <Topbar />

          <div style={{ display: "flex", gap: 16, flex: "1 0 0", minHeight: 0, alignItems: "flex-start" }}>
            <ConsoleWindow
              logs={logs}
              command={command}
              setCommand={setCommand}
              handleSend={handleSend}
              consoleEndRef={consoleEndRef}
            />
            <RightSidebar />
          </div>
        </div>
      </div>
    </>
  );
}
