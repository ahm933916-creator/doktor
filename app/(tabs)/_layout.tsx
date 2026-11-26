import { Tabs } from "expo-router";
import { useColors } from "@/hooks/use-colors";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function TabLayout() {
  const colors = useColors();
  return <Tabs screenOptions={{ tabBarActiveTintColor: colors.tint, headerShown: false, tabBarButton: HapticTab, tabBarStyle: { display: "none", height: 0 } }}><Tabs.Screen name="index" options={{ title: "الرئيسية", tabBarIcon: ({ color }) => <IconSymbol size={22} name="house.fill" color={color} /> }} /><Tabs.Screen name="appointments" options={{ title: "المواعيد" }} /><Tabs.Screen name="patients" options={{ title: "المرضى" }} /><Tabs.Screen name="finance" options={{ title: "الحسابات" }} /><Tabs.Screen name="settings" options={{ title: "الإعدادات" }} /><Tabs.Screen name="patient-portal" options={{ title: "بوابة المريض" }} /></Tabs>;
}
