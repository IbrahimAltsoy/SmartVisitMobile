import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: "flex-start",
    width: "100%",
  },
  headerImage: {
    width: 360,
    height: 240,
    marginBottom: 10,
    borderTopLeftRadius: 50,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 10,

    paddingHorizontal: 20,
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    width: "100%",
    marginTop: 20,
  },
  slogan: {
    fontSize: 16,
    color: "#4A5568",
    marginBottom: 25,
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#F7FAFC",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 15,
    color: "#2D3748",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  eyeIcon: {
    padding: 5,
  },
  forgotPassword: {
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
  },
  button: {
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 10,
    height: 56,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2E8F0",
  },
  orText: {
    marginHorizontal: 10,
    color: "#718096",
    fontSize: 14,
  },

  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  registerText: {
    color: "#000",
    fontSize: 14,
  },
  registerLink: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  infoContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  infoText: {
    textAlign: "center",
    color: "#000",
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "400",
    opacity: 0.9,
    maxWidth: 320,
  },
});
