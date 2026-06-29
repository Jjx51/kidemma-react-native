import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { COLORS } from "@theme";
import { InfoGroupCard } from "./InfoGroupCard";

const SECTIONS = [
{
    title: 'Estatus de clases',
    icon: require('@assets/images/Home/ic_status.png'),
    items: [
    {
        title: 'Posibles cancelaciones',
        value: 10,
        color: COLORS.textDark,
        icon: require('@assets/images/Home/ic_danger.png'),
    },
    {
        title: 'Cancelaciones definitivas',
        value: 5,
        color: COLORS.textDark,
        icon: require('@assets/images/Home/ic_warning.png'),
    },
    ],
},
{
    title: 'Estatus de pagos',
    icon: require('@assets/images/Home/ic_payment_status.png'),
    items: [
    {
        title: 'Pagos pendientes',
        value: 10,
        color: '#0079c9',
    },
    {
        title: 'Pagos vencidos',
        value: 5,
        color: '#D62828',
    },
    {
        title: 'Pagos por aprobar',
        value: 2,
        color: '#D8B400',
    },
    ],
},
{
    title: 'Denuncias',
    icon: require('@assets/images/Home/ic_complaints.png'),
    items: [
    {
        title: 'Pendiente',
        value: 10,
        color: '#0079c9',
    },
    {
        title: 'Desactivados',
        value: 5,
        color: '#D62828',
    },
    ],
},
];

export function HomeMenu() {
return (
    <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
        {SECTIONS.map(section => (
            <InfoGroupCard
            key={section.title}
            title={section.title}
            icon={section.icon}
            items={section.items}
            />
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
    content: {
        padding: 16,
    },
});