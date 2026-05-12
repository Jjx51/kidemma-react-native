import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import { Card } from "../Card";
import { CardContent } from "./CardContent";
import { COLORS, TYPOGRAPHY } from "@theme";

type MenuOption = {
    title: string;
    icon: any;
    isAdmin?: boolean;
};

const MENU_OPTIONS: MenuOption[] = [
    {
        title: 'Panel Administrativo',
        icon: require('@assets/images/ic_admin_dashboard.png'),
        isAdmin: true,
    },
    {
        title: '¿Quiénes Somos?',
        icon: require('@assets/images/ic_who_we_are.png'),
    },
    {
        title: 'Personal de Trabajo',
        icon: require('@assets/images/ic_staff.png'),
    },
    {
        title: 'Contacto y Ubicación',
        icon: require('@assets/images/ic_contact.png'),
    },
    {
        title: 'Alianzas',
        icon: require('@assets/images/ic_alliances.png'),
    },
    {
        title: 'Quejas y Sugerencias',
        icon: require('@assets/images/ice_feedback.png'),
    },
];

export function OthersMenu({ showAdmin }: { showAdmin?: boolean }) {
    const adminOption = MENU_OPTIONS.find(option => option.isAdmin);
    const publicOptions = MENU_OPTIONS.filter(option => !option.isAdmin);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                {showAdmin && adminOption && (
                    <Card style={styles.othersCard} onPress={() => {}}>
                        <CardContent title={adminOption.title} icon={adminOption.icon} />
                    </Card>
                )}

                <View style={styles.titleContainer}>
                <Text style={styles.title}>Enlaces Públicos</Text>
                </View>

                {publicOptions.map((item) => (
                <Card key={item.title} style={styles.othersCard} onPress={() => {}}>
                    <CardContent title={item.title} icon={item.icon} />
                </Card>
            ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
    },
    content: {
        alignItems: 'center',
        paddingVertical: 15,
    },
    title: {
        ...TYPOGRAPHY.bodyLarge,
        fontWeight: '900',
    },
    titleContainer: {
        width: '90%',
        marginVertical: 10,
    },
    othersCard: {
        width: '90%',
        paddingVertical: 25,
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15
    },
});