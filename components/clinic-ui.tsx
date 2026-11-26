import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { PropsWithChildren, type ReactNode } from "react";
import { Platform, Pressable, StyleSheet, Text, TextInput, View, type TextInputProps } from "react-native";

export const palette = {
  ink: "#14323A",
  muted: "#71858B",
  line: "#E4ECEC",
  canvas: "#F5F8F7",
  card: "#FFFFFF",
  teal: "#0F766E",
  tealDark: "#115E59",
  mint: "#DDF4EE",
  apricot: "#FFF0DC",
  apricotText: "#B45309",
  lilac: "#EEEAFE",
  lilacText: "#635B9B",
  red: "#B42318",
};

export function SectionTitle({ title, action, onPress }: { title: string; action?: string; onPress?: () => void }) {
  return (
    <View style={styles.sectionRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? <Pressable onPress={onPress}><Text style={styles.link}>{action}</Text></Pressable> : null}
    </View>
  );
}

export function Pill({ label, tone = "teal" }: { label: string; tone?: "teal" | "orange" | "gray" | "red" }) {
  const colors = tone === "orange" ? { bg: palette.apricot, text: palette.apricotText } : tone === "gray" ? { bg: "#EEF2F3", text: palette.muted } : tone === "red" ? { bg: "#FDE8E7", text: palette.red } : { bg: palette.mint, text: palette.tealDark };
  return <View style={[styles.pill, { backgroundColor: colors.bg }]}><Text style={[styles.pillText, { color: colors.text }]}>{label}</Text></View>;
}

export function StatCard({ icon, label, value, hint, tone = "teal" }: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string; hint: string; tone?: "teal" | "orange" | "lilac" }) {
  const tint = tone === "orange" ? palette.apricotText : tone === "lilac" ? palette.lilacText : palette.teal;
  const bg = tone === "orange" ? palette.apricot : tone === "lilac" ? palette.lilac : palette.mint;
  return <View style={styles.statCard}><View style={[styles.statIcon, { backgroundColor: bg }]}><Ionicons name={icon} size={19} color={tint} /></View><Text style={styles.statLabel}>{label}</Text><Text style={styles.statValue}>{value}</Text><Text style={styles.statHint}>{hint}</Text></View>;
}

export function Card({ children, style }: PropsWithChildren<{ style?: object }>) { return <View style={[styles.card, style]}>{children}</View>; }

export function PrimaryButton({ label, icon, onPress, small = false }: { label: string; icon?: keyof typeof Ionicons.glyphMap; onPress?: () => void; small?: boolean }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.primaryButton, small && styles.smallButton, pressed && { opacity: 0.82 }]}>{icon ? <Ionicons name={icon} size={17} color="#fff" /> : null}<Text style={styles.primaryButtonText}>{label}</Text></Pressable>;
}

export function SearchBox({ placeholder, value, onChangeText }: Pick<TextInputProps, "value" | "onChangeText" | "placeholder">) {
  return <View style={styles.searchBox}><Ionicons name="search-outline" size={19} color={palette.muted} /><TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor="#9AA9AC" style={styles.searchInput} textAlign="right" /></View>;
}

export function PageShell({ children, title, subtitle, icon = "medical-outline", action, active }: PropsWithChildren<{ title: string; subtitle: string; icon?: keyof typeof Ionicons.glyphMap; action?: ReactNode; active?: string }>) {
  return <View style={styles.page}><View style={styles.topBar}><View style={styles.brandMark}><Ionicons name={icon} size={23} color="#fff" /></View><View style={styles.titleWrap}><Text style={styles.pageTitle}>{title}</Text><Text style={styles.pageSubtitle}>{subtitle}</Text></View><View style={{ flex: 1 }} />{action}</View>{children}{active ? <BottomNav active={active} /> : null}</View>;
}

export function BottomNav({ active }: { active: string }) {
  const router = useRouter();
  const items = [{ key: "index", label: "الرئيسية", icon: "grid-outline" }, { key: "appointments", label: "المواعيد", icon: "calendar-outline" }, { key: "patients", label: "المرضى", icon: "people-outline" }, { key: "finance", label: "الحسابات", icon: "wallet-outline" }, { key: "settings", label: "الإعدادات", icon: "settings-outline" }] as const;
  return <View style={styles.bottomNav}>{items.map((item) => <Pressable key={item.key} onPress={() => router.push(item.key === "index" ? "/" : `/${item.key}`)} style={styles.navItem}><Ionicons name={item.icon} size={20} color={active === item.key ? palette.teal : palette.muted} /><Text style={[styles.navText, active === item.key && { color: palette.teal, fontWeight: "700" }]}>{item.label}</Text></Pressable>)}</View>;
}

export const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: palette.canvas, paddingHorizontal: 22, paddingTop: Platform.OS === "web" ? 28 : 16, maxWidth: 1180, width: "100%", alignSelf: "center" },
  topBar: { flexDirection: "row-reverse", alignItems: "center", flexWrap: "wrap", marginBottom: 22, gap: 12 },
  brandMark: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center", backgroundColor: palette.teal },
  titleWrap: { alignItems: "flex-end", flexShrink: 1, minWidth: 0 }, pageTitle: { color: palette.ink, fontSize: 24, fontWeight: "800" }, pageSubtitle: { color: palette.muted, fontSize: 13, marginTop: 3 },
  card: { backgroundColor: palette.card, borderRadius: 18, padding: 17, borderWidth: 1, borderColor: palette.line, shadowColor: "#12443D", shadowOpacity: 0.035, shadowRadius: 12, shadowOffset: { width: 0, height: 5 }, elevation: 1 },
  sectionRow: { flexDirection: "row-reverse", justifyContent: "space-between", alignItems: "center", marginBottom: 11 }, sectionTitle: { color: palette.ink, fontSize: 17, fontWeight: "800" }, link: { color: palette.teal, fontSize: 13, fontWeight: "700" },
  statCard: { flex: 1, minWidth: 145, backgroundColor: palette.card, borderWidth: 1, borderColor: palette.line, borderRadius: 17, padding: 15, gap: 5 }, statIcon: { width: 33, height: 33, borderRadius: 11, alignItems: "center", justifyContent: "center", marginBottom: 5 }, statLabel: { color: palette.muted, fontSize: 12, textAlign: "right" }, statValue: { color: palette.ink, fontSize: 22, fontWeight: "800", textAlign: "right" }, statHint: { color: palette.teal, fontSize: 11, textAlign: "right" },
  pill: { alignSelf: "flex-start", paddingHorizontal: 9, paddingVertical: 5, borderRadius: 20 }, pillText: { fontSize: 11, fontWeight: "700" },
  primaryButton: { flexDirection: "row-reverse", alignItems: "center", justifyContent: "center", gap: 7, backgroundColor: palette.teal, paddingHorizontal: 14, paddingVertical: 11, borderRadius: 12 }, smallButton: { paddingVertical: 8, paddingHorizontal: 11 }, primaryButtonText: { color: "#fff", fontSize: 13, fontWeight: "800" },
  searchBox: { flexDirection: "row-reverse", alignItems: "center", gap: 8, backgroundColor: "#fff", borderColor: palette.line, borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, height: 46 }, searchInput: { flex: 1, color: palette.ink, fontSize: 14 },
  bottomNav: { flexDirection: "row-reverse", justifyContent: "space-around", paddingTop: 10, paddingBottom: 12, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: palette.line }, navItem: { alignItems: "center", gap: 4, minWidth: 62 }, navText: { color: palette.muted, fontSize: 10 },
});
