import { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, ScrollView, Modal } from "react-native";
import { FooterContent } from "./footer";

const ADMIN_ROUTES = [
	"administratif",
	"gestion_patients",
	"ajouter_patient",
	"modifier_patient",
	"gestion_sejours",
	"ajouter_sejour",
	"modifier_sejour",
];

const INFIRMIER_ROUTES = [
	"infirmier",
	"gestion_arrivées_patients",
	"gestion_sorties_patients",
	"consultation_sejours_date",
	"consultation_sejours_date_debut",
	"consultation_sejours_date_a_venir",
];

function HeaderLink({ label, onPress }) {
	return (
		<Pressable onPress={onPress} style={({ pressed }) => [styles.navItem, pressed && styles.navItemPressed]}>
			<Text style={styles.navText}>{label}</Text>
		</Pressable>
	);
}

export default function Header({ navigation, currentRouteName }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const isAdminSection = ADMIN_ROUTES.includes(currentRouteName);
	const isInfirmierSection = INFIRMIER_ROUTES.includes(currentRouteName);

	const links = [];

	if (isAdminSection) {
		links.push({ label: "Administratif", route: "administratif" });
		links.push({ label: "Patients", route: "gestion_patients" });
		links.push({ label: "Sejours", route: "gestion_sejours" });
	}

	if (isInfirmierSection) {
		links.push({ label: "Infirmier", route: "infirmier" });
		links.push({ label: "Gestion", route: "gestion_arrivées_patients" });
		links.push({ label: "Consultation", route: "consultation_sejours_date" });
	}

	const goTo = (route) => {
		navigation.navigate(route);
		setIsSidebarOpen(false);
	};

	return (
		<>
			<View style={styles.header}>
				<View style={styles.nav}>
					<Pressable style={styles.menuButton} onPress={() => setIsSidebarOpen(true)}>
						<View style={styles.menuBar} />
						<View style={styles.menuBar} />
						<View style={styles.menuBar} />
					</Pressable>

					<Pressable
						style={styles.logoContainer}
						onPress={() => navigation.navigate(isInfirmierSection ? "infirmier" : "administratif")}
					>
						<Image source={require("../../assets/icon.png")} style={styles.logoImage} resizeMode="contain" />
						<Text style={styles.logoText}>Hopital</Text>
					</Pressable>
				</View>
			</View>

			<Modal visible={isSidebarOpen} transparent animationType="slide" onRequestClose={() => setIsSidebarOpen(false)}>
				<View style={styles.overlay}>
					<View style={styles.sidebar}>
						<View style={styles.sidebarTop}>
							<Text style={styles.sidebarTitle}>Menu</Text>
							<Pressable style={styles.closeButton} onPress={() => setIsSidebarOpen(false)}>
								<Text style={styles.closeButtonText}>X</Text>
							</Pressable>
						</View>

						<ScrollView contentContainerStyle={styles.sidebarContent}>
							{links.map((link) => (
								<HeaderLink key={link.route} label={link.label} onPress={() => goTo(link.route)} />
							))}

							<HeaderLink
								label="Se deconnecter"
								onPress={() => {
									navigation.reset({
										index: 0,
										routes: [{ name: "login" }],
									});
									setIsSidebarOpen(false);
								}}
							/>

							<View style={styles.footerBlock}>
								<Text style={styles.footerBlockTitle}>Informations</Text>
								<FooterContent />
							</View>
						</ScrollView>
					</View>

					<Pressable style={styles.backdrop} onPress={() => setIsSidebarOpen(false)} />
				</View>
			</Modal>
		</>
	);
}

const styles = StyleSheet.create({
	header: {
		width: "100%",
		minHeight: 96,
		backgroundColor: "#111827",
		justifyContent: "center",
		marginTop: 6,
	},
	nav: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 14,
		gap: 12,
	},
	menuButton: {
		width: 44,
		height: 44,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.3)",
		justifyContent: "center",
		alignItems: "center",
		gap: 4,
	},
	menuBar: {
		width: 20,
		height: 2,
		borderRadius: 4,
		backgroundColor: "#f9fafb",
	},
	logoContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	logoImage: {
		width: 48,
		height: 48,
	},
	logoText: {
		color: "#f9fafb",
		fontSize: 20,
		fontWeight: "700",
	},
	overlay: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "rgba(0,0,0,0.35)",
	},
	backdrop: {
		flex: 1,
	},
	sidebar: {
		width: "82%",
		maxWidth: 360,
		backgroundColor: "#111827",
		paddingTop: 26,
		paddingHorizontal: 14,
		paddingBottom: 16,
	},
	sidebarTop: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},
	sidebarTitle: {
		color: "#f9fafb",
		fontSize: 22,
		fontWeight: "700",
	},
	closeButton: {
		width: 36,
		height: 36,
		borderRadius: 18,
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.3)",
		justifyContent: "center",
		alignItems: "center",
	},
	closeButtonText: {
		color: "#f9fafb",
		fontSize: 14,
		fontWeight: "700",
	},
	sidebarContent: {
		paddingBottom: 24,
	},
	navItem: {
		paddingVertical: 10,
		paddingHorizontal: 12,
		borderRadius: 8,
		marginBottom: 4,
	},
	navItemPressed: {
		backgroundColor: "rgba(255, 255, 255, 0.12)",
	},
	navText: {
		color: "#f9fafb",
		fontSize: 15,
		fontWeight: "600",
	},
	footerBlock: {
		marginTop: 10,
		paddingTop: 10,
		borderTopWidth: 1,
		borderTopColor: "rgba(255,255,255,0.2)",
	},
	footerBlockTitle: {
		color: "#f9fafb",
		fontSize: 16,
		fontWeight: "700",
		marginBottom: 8,
	},
});
