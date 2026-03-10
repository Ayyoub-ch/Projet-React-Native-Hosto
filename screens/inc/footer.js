import { View, Text, StyleSheet, useWindowDimensions } from "react-native";

export function FooterContent() {
	const { width } = useWindowDimensions();
	const isSmallScreen = width < 900;

	return (
		<>
			<View style={[styles.footerContent, isSmallScreen && styles.footerContentSmall]}>
				<View style={styles.footerSection}>
					<Text style={styles.sectionTitle}>A propos de l'hopital</Text>
					<Text style={styles.sectionText}>
						Notre hopital s'engage a fournir des soins de sante de qualite avec compassion et
						professionnalisme. Nous sommes la pour vous 24h/24 et 7j/7.
					</Text>
				</View>

				<View style={styles.footerSection}>
					<Text style={styles.sectionTitle}>Horaires</Text>
					<Text style={styles.sectionText}>Urgences: 24h/24, 7j/7</Text>
					<Text style={styles.sectionText}>Consultations:</Text>
					<Text style={styles.sectionText}>Lundi - Vendredi: 8h00 - 18h00</Text>
					<Text style={styles.sectionText}>Samedi: 9h00 - 13h00</Text>
					<Text style={styles.sectionText}>Dimanche: Fermé (sauf urgences)</Text>
				</View>

				<View style={styles.footerSection}>
					<Text style={styles.sectionTitle}>Contact</Text>
					<Text style={styles.sectionText}>Tel: 01 23 45 67 89</Text>
					<Text style={styles.sectionText}>Email: contact@hopital.fr</Text>
					<Text style={styles.sectionText}>Adresse: 123 Rue de la Sante, 75000 Paris</Text>
				</View>
			</View>

			<View style={styles.footerBottom}>
				<Text style={styles.footerBottomText}>Hopital - Tous droits reserves.</Text>
			</View>
		</>
	);
}

export default function Footer() {
	return (
		<View style={styles.footer}>
			<FooterContent />
		</View>
	);
}

const styles = StyleSheet.create({
	footer: {
		backgroundColor: "#111827",
		paddingTop: 10,
		paddingHorizontal: 10,
		paddingBottom: 6,
	},
	footerContent: {
		maxWidth: 1200,
		width: "100%",
		alignSelf: "center",
		flexDirection: "row",
		flexWrap: "wrap",
		columnGap: 10,
		rowGap: 8,
		marginBottom: 6,
	},
	footerContentSmall: {
		flexDirection: "column",
	},
	footerSection: {
		flexGrow: 1,
		flexShrink: 1,
		minWidth: 170,
	},
	sectionTitle: {
		color: "#f9fafb",
		fontSize: 13,
		fontWeight: "600",
		marginBottom: 5,
	},
	sectionText: {
		color: "#f9fafb",
		opacity: 0.9,
		lineHeight: 14,
		fontSize: 10,
		marginBottom: 2,
	},
	linkItem: {
		color: "#f9fafb",
		opacity: 0.9,
		lineHeight: 20,
		fontSize: 14,
		marginBottom: 8,
	},
	footerBottom: {
		borderTopWidth: 1,
		borderTopColor: "rgba(255,255,255,0.15)",
		paddingTop: 6,
		alignItems: "center",
	},
	footerBottomText: {
		color: "#f9fafb",
		opacity: 0.8,
		fontSize: 10,
	},
});
